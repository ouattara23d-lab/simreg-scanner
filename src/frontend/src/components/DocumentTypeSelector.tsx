import type { DocumentType } from "@/types";
import { DOCUMENT_TYPE_LABELS } from "@/types";
import { Car, CreditCard, File, FileText, Home } from "lucide-react";

interface DocumentTypeSelectorProps {
  value: DocumentType;
  onChange: (type: DocumentType) => void;
}

const DOC_ICONS: Record<DocumentType, React.ReactNode> = {
  cni: <CreditCard className="w-3.5 h-3.5" />,
  passport: <FileText className="w-3.5 h-3.5" />,
  driver_license: <Car className="w-3.5 h-3.5" />,
  residence_permit: <Home className="w-3.5 h-3.5" />,
  other: <File className="w-3.5 h-3.5" />,
};

const DOC_SHORT: Record<DocumentType, string> = {
  cni: "CNI",
  passport: "Passeport",
  driver_license: "Permis",
  residence_permit: "Séjour",
  other: "Autre",
};

export function DocumentTypeSelector({
  value,
  onChange,
}: DocumentTypeSelectorProps) {
  const types = Object.keys(DOCUMENT_TYPE_LABELS) as DocumentType[];

  return (
    <div className="flex flex-col gap-1.5">
      <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wide font-body">
        Type de document
      </p>
      <div
        className="flex flex-wrap gap-1.5"
        role="tablist"
        aria-label="Type de document"
      >
        {types.map((type) => {
          const isActive = value === type;
          return (
            <button
              key={type}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-label={DOCUMENT_TYPE_LABELS[type]}
              data-ocid={`doc_type.${type}.tab`}
              onClick={() => onChange(type)}
              className={[
                "flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium font-body border transition-smooth focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                isActive
                  ? "border-transparent text-accent-foreground"
                  : "bg-background border-border text-muted-foreground hover:bg-muted hover:text-foreground",
              ].join(" ")}
              style={
                isActive
                  ? {
                      backgroundColor: "oklch(0.84 0.23 80)",
                      color: "oklch(0.14 0.02 50)",
                    }
                  : undefined
              }
            >
              {DOC_ICONS[type]}
              <span>{DOC_SHORT[type]}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
