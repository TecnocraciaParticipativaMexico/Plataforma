"use client";

import L from "leaflet";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

type Reporte = {
  process_id: string;
  titulo: string;
  descripcion: string;
  estado_raw: string;
  estado_label: string;
  lat: number;
  lng: number;
  created_at: string | null;
  riesgo?: string;
};

  process_id: string;
  titulo: string;
  descripcion: string;
  estado_raw: string;
  estado_label: string;
  lat: number;
  lng: number;
  created_at: string | null;
};

type Props = {
  reportes: Reporte[];
  selected: Reporte | null;
  onSelect: (reporte: Reporte) => void;
};

function clasificarRiesgoMapa(texto: string) {
  const t = (texto || "").toLowerCase();

  if (
    t.includes("cuerpo") ||
    t.includes("muerto") ||
    t.includes("narco") ||
    t.includes("asesinato")
  ) {
    return "ALTO";
  }

  if (t.includes("robo") || t.includes("corrupcion")) {
    return "MEDIO";
  }

  return "BAJO";
}

function crearIcono(riesgo: string) {
  let html = "";

  if (riesgo === "ALTO") {
    html = `<div style="
      width: 0;
      height: 0;
      border-left: 13px solid transparent;
      border-right: 13px solid transparent;
      border-bottom: 24px solid #ef0000;
      filter: drop-shadow(0 2px 6px rgba(0,0,0,.35));
    "></div>`;
  } else if (riesgo === "MEDIO") {
    html = `<div style="
      width: 24px;
      height: 24px;
      background: #ff7a00;
      border: 3px solid white;
      box-shadow: 0 2px 8px rgba(0,0,0,.35);
    "></div>`;
  } else {
    html = `<div style="
      width: 24px;
      height: 24px;
      background: #facc15;
      border: 3px solid white;
      border-radius: 999px;
      box-shadow: 0 2px 8px rgba(0,0,0,.35);
    "></div>`;
  }

  return L.divIcon({
    className: "",
    html,
    iconSize: [26, 26],
    iconAnchor: [13, 13],
  });
}

delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

export default function MapaReportes({ reportes, selected, onSelect }: Props) {
  const centro = selected || reportes[0] || { lat: 23.6345, lng: -102.5528 };

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200">
      <MapContainer
        center={[centro.lat, centro.lng]}
        zoom={reportes.length ? 13 : 5}
        style={{ height: "520px", width: "100%" }}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {reportes.map((reporte) => {
          const riesgo = reporte.riesgo || clasificarRiesgoMapa(reporte.descripcion || "");

          return (
            <Marker
              key={reporte.process_id}
              position={[reporte.lat, reporte.lng]}
              icon={crearIcono(riesgo)}
              eventHandlers={{
                click: () => onSelect(reporte),
              }}
            >
              <Popup>
                <div>
                  <div style={{ fontWeight: 700 }}>{reporte.titulo}</div>
                  <div>Estado: {reporte.estado_label}</div>
                  <div style={{ marginTop: 6 }}>
                    Riesgo IA: <b>{riesgo}</b>
                  </div>
                  <div style={{ marginTop: 8 }}>
                    <a href={`/seguimiento?processId=${reporte.process_id}`}>
                      Ver seguimiento
                    </a>
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
