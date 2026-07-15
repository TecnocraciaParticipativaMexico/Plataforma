import type { ReactNode } from "react";

import { PlatformBottomNav } from "@/components/branding/PlatformBottomNav";
import { PlatformFooterBanner } from "@/components/branding/PlatformFooterBanner";
import { CongresoCivicoNavigation } from "./components/CongresoCivicoNavigation";

export default function CongresoCivicoLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <CongresoCivicoNavigation />
      <div className="pb-32 print:pb-0">{children}</div>
      <PlatformFooterBanner className="mx-auto max-w-7xl" />
      <PlatformBottomNav />
    </>
  );
}
