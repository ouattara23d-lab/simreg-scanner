import { Globe, ScanSearch } from "lucide-react";

export type MobileTab = "scanner" | "simreg";

interface MobileTabsProps {
  activeTab: MobileTab;
  onTabChange: (tab: MobileTab) => void;
}

const tabs: { id: MobileTab; label: string; icon: typeof ScanSearch }[] = [
  { id: "scanner", label: "Scanner", icon: ScanSearch },
  { id: "simreg", label: "Portail SimReg", icon: Globe },
];

export function MobileTabs({ activeTab, onTabChange }: MobileTabsProps) {
  return (
    <div
      className="flex md:hidden border-b border-border bg-card shrink-0"
      role="tablist"
      aria-label="Navigation mobile"
    >
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            data-ocid={`mobile_tabs.${tab.id}.tab`}
            onClick={() => onTabChange(tab.id)}
            className="flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium transition-smooth relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            style={{
              color: isActive
                ? "oklch(0.45 0.12 75)"
                : "var(--muted-foreground)",
            }}
          >
            <Icon className="w-4 h-4" />
            <span>{tab.label}</span>
            {/* Active indicator */}
            {isActive && (
              <span
                className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
                style={{ backgroundColor: "oklch(0.84 0.23 80)" }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
