import { Globe } from "lucide-react";

export function SimRegFrame() {
  return (
    <div className="flex flex-col h-full bg-card">
      {/* Frame header bar */}
      <div className="flex items-center gap-2 px-3 py-2 border-b border-border bg-muted/40 shrink-0">
        <Globe className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
        <span className="text-[11px] text-muted-foreground font-mono truncate select-none">
          simreg.mtn.ci/public/login
        </span>
      </div>

      {/* iframe */}
      <iframe
        data-ocid="simreg.frame"
        src="https://simreg.mtn.ci/public/login"
        title="Portail SimReg MTN Côte d'Ivoire"
        allow="camera"
        className="flex-1 w-full border-none"
        style={{ minHeight: 0 }}
      />
    </div>
  );
}
