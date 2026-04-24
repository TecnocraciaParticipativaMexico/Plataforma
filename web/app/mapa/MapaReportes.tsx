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
};

type Props = {
  reportes: Reporte[];
  selected: Reporte | null;
  onSelect: (reporte: Reporte) => void;
};

delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

function colorEstado(estado: string) {
  if (estado === "Published") return "#16a34a";
  if (estado === "Review") return "#2563eb";
  return "#eab308";
}

function colorRiesgo(texto: string) {
  const riesgo = clasificarRiesgo(texto);

  if (riesgo === "ALTO") return "#dc2626";   // rojo
  if (riesgo === "MEDIO") return "#f59e0b"; // naranja
  return "#16a34a"; // verde
}

function crearIcono(color: string) {
  return L.divIcon({
    className: "",
    html: `<div style="
      width: 22px;
      height: 22px;
      background: ${color};
      border: 3px solid white;
      border-radius: 999px;
      box-shadow: 0 2px 8px rgba(0,0,0,.35);
    "></div>`,
    iconSize: [22, 22],
    iconAnchor: [11, 11],
  });
}

export default function MapaReportes({ reportes, selected, onSelect }: Props) {
  const centro =
    selected || reportes[0] || { lat: 23.6345, lng: -102.5528 };

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

        {reportes.map((reporte) => (
          <Marker
            key={reporte.process_id}
            position={[reporte.lat, reporte.lng]}
            icon={crearIcono(colorRiesgo(reporte.descripcion))}
            eventHandlers={{
              click: () => onSelect(reporte),
            }}
          >
            <Popup>
              <div>
                <div style={{ fontWeight: 700 }}>{reporte.titulo}</div>
                <div>Estado: {reporte.estado_label}</div>
                <div style={{ marginTop: 8 }}>
                  <a href={`/seguimiento?processId=${reporte.process_id}`}>
                    Ver seguimiento
                  </a>
                  <div style={{ marginTop: 6 }}>
  Riesgo IA:{" "}
  <b>{clasificarRiesgo(reporte.descripcion)}</b>
</div>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
