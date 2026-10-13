import type { Metadata } from "next";
import { TribunalesWorkspace } from "@/components/tribunales/TribunalesWorkspace";

export const metadata: Metadata = {
  title: "Módulo 07 · Tribunales de Alta Integridad",
  description:
    "Contraste jurídico ciudadano documentado, técnico y no vinculante.",
};
export default function TribunalesPage() {
  return <TribunalesWorkspace />;
}
