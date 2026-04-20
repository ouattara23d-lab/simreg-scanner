import { Layout } from "@/components/Layout";
import { type MobileTab, MobileTabs } from "@/components/MobileTabs";
import { SimRegFrame } from "@/components/SimRegFrame";
import { useScanSession } from "@/hooks/useScanSession";
import { ScanPage } from "@/pages/ScanPage";
import { useState } from "react";

export default function MainPage() {
  const session = useScanSession();
  const [mobileTab, setMobileTab] = useState<MobileTab>("scanner");

  return (
    <Layout
      documentType={session.documentType}
      onDocumentTypeChange={session.setDocumentType}
    >
      {/* Mobile tab bar */}
      <MobileTabs activeTab={mobileTab} onTabChange={setMobileTab} />

      {/* Two-column layout — desktop always visible, mobile tab-driven */}
      <div
        className="flex overflow-hidden"
        style={{ height: "calc(100vh - 7.5rem)" }}
      >
        {/* Left column — Scanner (40% desktop, full on mobile when tab=scanner) */}
        <div
          data-ocid="main.scan_panel"
          className={[
            "flex flex-col overflow-y-auto border-r border-border bg-background",
            // Desktop: always show at 40%
            "md:flex md:w-2/5",
            // Mobile: show/hide based on tab
            mobileTab === "scanner" ? "flex w-full" : "hidden",
          ].join(" ")}
        >
          <ScanPage session={session} />
        </div>

        {/* Right column — SimReg iframe (60% desktop, full on mobile when tab=simreg) */}
        <div
          data-ocid="main.simreg_panel"
          className={[
            "flex flex-col bg-card",
            // Desktop: always show at 60%
            "md:flex md:w-3/5",
            // Mobile: show/hide based on tab
            mobileTab === "simreg" ? "flex w-full" : "hidden",
          ].join(" ")}
        >
          <SimRegFrame />
        </div>
      </div>
    </Layout>
  );
}
