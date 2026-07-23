import { PDFDocument, StandardFonts, rgb, type PDFFont, type PDFPage, type RGB } from "pdf-lib";

export type InstitutionalPdfField = {
  label: string;
  value: string;
};

export type InstitutionalPdfSection = {
  title: string;
  body?: string[];
  fields?: InstitutionalPdfField[];
  items?: string[];
};

export type InstitutionalPdfOptions = {
  fileName: string;
  title: string;
  subtitle: string;
  moduleLabel: string;
  moduleName: string;
  folio: string;
  date: string;
  version: string;
  classification: string;
  generatedAt: string;
  integrityHash: string;
  integrityDescription: string;
  sections: InstitutionalPdfSection[];
  logoUrl?: string;
};

type PdfContext = {
  doc: PDFDocument;
  page: PDFPage;
  regular: PDFFont;
  bold: PDFFont;
  pageWidth: number;
  pageHeight: number;
  margin: number;
  y: number;
};

const brand = {
  blue: rgb(0.039, 0.306, 0.518),
  magenta: rgb(0.894, 0, 0.486),
  gold: rgb(1, 0.761, 0.055),
  green: rgb(0.224, 0.71, 0.29),
  slate: rgb(0.12, 0.16, 0.22),
  muted: rgb(0.36, 0.42, 0.5),
  pale: rgb(0.956, 0.973, 0.99),
};

const pageSize: [number, number] = [612, 792];

function sanitizePdfText(value: string) {
  return value
    .replace(/[“”]/g, "\"")
    .replace(/[‘’]/g, "'")
    .replace(/[•·]/g, "-")
    .replace(/[–—]/g, "-")
    .replace(/\u00a0/g, " ")
    .replace(/[^\n\r\t\x20-\x7e\u00a1-\u00ff]/g, "");
}

function textWidth(font: PDFFont, text: string, size: number) {
  return font.widthOfTextAtSize(sanitizePdfText(text), size);
}

function wrapText(font: PDFFont, text: string, size: number, maxWidth: number) {
  const normalized = sanitizePdfText(text).replace(/\s+/g, " ").trim();
  if (!normalized) return [""];

  const lines: string[] = [];
  let line = "";

  for (const word of normalized.split(" ")) {
    if (textWidth(font, word, size) > maxWidth) {
      if (line) {
        lines.push(line);
        line = "";
      }
      let chunk = "";
      for (const char of word) {
        const candidate = `${chunk}${char}`;
        if (textWidth(font, candidate, size) <= maxWidth) {
          chunk = candidate;
          continue;
        }
        if (chunk) lines.push(chunk);
        chunk = char;
      }
      if (chunk) line = chunk;
      continue;
    }

    const candidate = line ? `${line} ${word}` : word;
    if (textWidth(font, candidate, size) <= maxWidth) {
      line = candidate;
      continue;
    }

    if (line) lines.push(line);
    line = word;
  }

  if (line) lines.push(line);
  return lines;
}

function ensureSpace(ctx: PdfContext, needed: number) {
  if (ctx.y - needed > 72) return;
  ctx.page = ctx.doc.addPage(pageSize);
  ctx.y = ctx.pageHeight - 72;
}

function drawText(
  ctx: PdfContext,
  text: string,
  x: number,
  y: number,
  options: { size: number; font?: PDFFont; color?: RGB; maxWidth?: number },
) {
  ctx.page.drawText(sanitizePdfText(text), {
    x,
    y,
    size: options.size,
    font: options.font ?? ctx.regular,
    color: options.color ?? brand.slate,
    maxWidth: options.maxWidth,
  });
}

function drawWrapped(ctx: PdfContext, text: string, options: { x?: number; size?: number; font?: PDFFont; color?: RGB; width?: number; lineGap?: number }) {
  const x = options.x ?? ctx.margin;
  const size = options.size ?? 10;
  const font = options.font ?? ctx.regular;
  const width = options.width ?? ctx.pageWidth - ctx.margin * 2;
  const lineGap = options.lineGap ?? 4;
  const lineHeight = size + lineGap;
  const lines = wrapText(font, text, size, width);

  ensureSpace(ctx, lineHeight * lines.length + 8);
  for (const line of lines) {
    drawText(ctx, line, x, ctx.y, { size, font, color: options.color, maxWidth: width });
    ctx.y -= lineHeight;
  }
}

function drawRule(ctx: PdfContext, color = brand.magenta) {
  ctx.page.drawLine({
    start: { x: ctx.margin, y: ctx.y },
    end: { x: ctx.pageWidth - ctx.margin, y: ctx.y },
    thickness: 1.2,
    color,
  });
  ctx.y -= 16;
}

async function embedLogo(ctx: PdfContext, logoUrl?: string) {
  if (!logoUrl || typeof fetch === "undefined") return;
  try {
    const response = await fetch(logoUrl);
    const bytes = await response.arrayBuffer();
    const image = await ctx.doc.embedPng(bytes);
    const scaled = image.scale(0.15);
    ctx.page.drawImage(image, {
      x: ctx.margin,
      y: ctx.pageHeight - ctx.margin - scaled.height,
      width: scaled.width,
      height: scaled.height,
    });
  } catch {
    drawText(ctx, "Tecnocracia Participativa", ctx.margin, ctx.pageHeight - 74, {
      size: 14,
      font: ctx.bold,
      color: brand.blue,
    });
  }
}

async function drawCover(ctx: PdfContext, options: InstitutionalPdfOptions) {
  ctx.page.drawRectangle({ x: 0, y: ctx.pageHeight - 132, width: ctx.pageWidth, height: 132, color: brand.pale });
  ctx.page.drawRectangle({ x: 0, y: ctx.pageHeight - 136, width: ctx.pageWidth, height: 4, color: brand.magenta });
  await embedLogo(ctx, options.logoUrl);

  drawText(ctx, "México 2030", ctx.pageWidth - 190, ctx.pageHeight - 70, { size: 12, font: ctx.bold, color: brand.blue });
  drawText(ctx, options.moduleLabel, ctx.pageWidth - 190, ctx.pageHeight - 90, { size: 10, font: ctx.bold, color: brand.magenta });
  drawText(ctx, options.moduleName, ctx.pageWidth - 190, ctx.pageHeight - 108, { size: 9, font: ctx.regular, color: brand.slate, maxWidth: 140 });

  ctx.y = ctx.pageHeight - 210;
  drawText(ctx, options.title.toUpperCase(), ctx.margin, ctx.y, { size: 24, font: ctx.bold, color: brand.blue });
  ctx.y -= 28;
  drawWrapped(ctx, options.subtitle, { size: 13, font: ctx.bold, color: brand.slate, width: 420, lineGap: 5 });
  ctx.y -= 24;

  const fields: InstitutionalPdfField[] = [
    { label: "Folio", value: options.folio },
    { label: "Fecha", value: options.date },
    { label: "Versión", value: options.version },
    { label: "Clasificación", value: options.classification },
  ];

  const boxWidth = (ctx.pageWidth - ctx.margin * 2 - 18) / 2;
  fields.forEach((field, index) => {
    const col = index % 2;
    const row = Math.floor(index / 2);
    const x = ctx.margin + col * (boxWidth + 18);
    const y = ctx.y - row * 72;
    ctx.page.drawRectangle({ x, y: y - 46, width: boxWidth, height: 54, borderColor: brand.blue, borderWidth: 0.7, color: rgb(1, 1, 1) });
    drawText(ctx, field.label.toUpperCase(), x + 12, y - 10, { size: 8, font: ctx.bold, color: brand.magenta });
    drawText(ctx, field.value, x + 12, y - 30, { size: 11, font: ctx.bold, color: brand.slate, maxWidth: boxWidth - 24 });
  });
  ctx.y -= 164;

  drawRule(ctx, brand.gold);
  drawWrapped(ctx, "Documento ciudadano generado localmente para preservar información técnica, contexto y trazabilidad. No sustituye procedimientos ni determinaciones de autoridad.", {
    size: 10,
    color: brand.muted,
    width: 430,
  });
}

function drawFields(ctx: PdfContext, fields: InstitutionalPdfField[]) {
  const labelWidth = 140;
  for (const field of fields) {
    const lines = wrapText(ctx.regular, field.value, 9.5, ctx.pageWidth - ctx.margin * 2 - labelWidth - 18);
    const rowHeight = Math.max(28, lines.length * 13 + 12);
    ensureSpace(ctx, rowHeight + 8);
    ctx.page.drawRectangle({
      x: ctx.margin,
      y: ctx.y - rowHeight + 8,
      width: ctx.pageWidth - ctx.margin * 2,
      height: rowHeight,
      borderColor: rgb(0.84, 0.88, 0.93),
      borderWidth: 0.5,
      color: rgb(1, 1, 1),
    });
    drawText(ctx, field.label, ctx.margin + 10, ctx.y - 10, { size: 8, font: ctx.bold, color: brand.blue, maxWidth: labelWidth });
    let y = ctx.y - 10;
    for (const line of lines) {
      drawText(ctx, line, ctx.margin + labelWidth + 12, y, { size: 9.5, color: brand.slate });
      y -= 13;
    }
    ctx.y -= rowHeight + 4;
  }
}

function drawSection(ctx: PdfContext, section: InstitutionalPdfSection, index: number) {
  ensureSpace(ctx, 72);
  drawText(ctx, `SECCIÓN ${index}`, ctx.margin, ctx.y, { size: 8, font: ctx.bold, color: brand.magenta });
  ctx.y -= 17;
  drawText(ctx, section.title, ctx.margin, ctx.y, { size: 15, font: ctx.bold, color: brand.blue });
  ctx.y -= 14;
  drawRule(ctx, rgb(0.82, 0.86, 0.91));

  for (const paragraph of section.body ?? []) {
    drawWrapped(ctx, paragraph, { size: 10, lineGap: 4 });
    ctx.y -= 6;
  }

  if (section.fields?.length) {
    drawFields(ctx, section.fields);
    ctx.y -= 4;
  }

  for (const item of section.items ?? []) {
    ensureSpace(ctx, 24);
    drawText(ctx, "-", ctx.margin + 4, ctx.y, { size: 10, font: ctx.bold, color: brand.magenta });
    drawWrapped(ctx, item, { x: ctx.margin + 20, size: 10, width: ctx.pageWidth - ctx.margin * 2 - 20, lineGap: 4 });
    ctx.y -= 2;
  }

  ctx.y -= 14;
}

function drawIntegrityPage(ctx: PdfContext, options: InstitutionalPdfOptions) {
  ctx.page = ctx.doc.addPage(pageSize);
  ctx.y = ctx.pageHeight - 88;
  drawText(ctx, "INTEGRIDAD DEL DOCUMENTO", ctx.margin, ctx.y, { size: 20, font: ctx.bold, color: brand.blue });
  ctx.y -= 30;
  drawRule(ctx, brand.magenta);
  drawFields(ctx, [
    { label: "Folio", value: options.folio },
    { label: "Fecha de generación", value: options.generatedAt },
    { label: "Versión", value: options.version },
    { label: "SHA-256 de datos base", value: options.integrityHash },
    { label: "Generado por", value: `Tecnocracia Participativa México 2030 - ${options.moduleLabel} - ${options.moduleName}` },
  ]);
  ctx.y -= 18;
  drawWrapped(ctx, options.integrityDescription, { size: 10, font: ctx.bold, color: brand.slate });
}

function drawFooters(ctx: PdfContext, date: string) {
  const pages = ctx.doc.getPages();
  pages.forEach((page, index) => {
    page.drawLine({
      start: { x: ctx.margin, y: 48 },
      end: { x: ctx.pageWidth - ctx.margin, y: 48 },
      thickness: 0.6,
      color: rgb(0.82, 0.86, 0.91),
    });
    page.drawText("Tecnocracia Participativa México 2030", {
      x: ctx.margin,
      y: 31,
      size: 8,
      font: ctx.regular,
      color: brand.muted,
    });
    page.drawText(`${date} | Página ${index + 1} de ${pages.length}`, {
      x: ctx.pageWidth - ctx.margin - 132,
      y: 31,
      size: 8,
      font: ctx.regular,
      color: brand.muted,
    });
  });
}

export async function createInstitutionalPdf(options: InstitutionalPdfOptions) {
  const doc = await PDFDocument.create();
  doc.setTitle(options.title);
  doc.setSubject(`${options.moduleLabel} - ${options.moduleName}`);
  doc.setCreator("Tecnocracia Participativa México 2030");
  doc.setProducer("Tecnocracia Participativa México 2030");
  doc.setCreationDate(new Date(options.generatedAt));
  doc.setModificationDate(new Date(options.generatedAt));
  const regular = await doc.embedFont(StandardFonts.Helvetica);
  const bold = await doc.embedFont(StandardFonts.HelveticaBold);
  const page = doc.addPage(pageSize);
  const ctx: PdfContext = {
    doc,
    page,
    regular,
    bold,
    pageWidth: pageSize[0],
    pageHeight: pageSize[1],
    margin: 54,
    y: pageSize[1] - 72,
  };

  await drawCover(ctx, options);
  options.sections.forEach((section, index) => drawSection(ctx, section, index + 1));
  drawIntegrityPage(ctx, options);
  drawFooters(ctx, options.date);

  return doc.save();
}

export function downloadPdf(bytes: Uint8Array, fileName: string) {
  const buffer = new ArrayBuffer(bytes.byteLength);
  new Uint8Array(buffer).set(bytes);
  const blob = new Blob([buffer], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}
