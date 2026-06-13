import type { ReactNode } from "react";

import { CongresoCivicoNavigation } from "./components/CongresoCivicoNavigation";

export default function CongresoCivicoLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <CongresoCivicoNavigation />
      {children}
    </>
  );
}
