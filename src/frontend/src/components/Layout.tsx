import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { DocumentType } from "@/types";
import { DOCUMENT_TYPE_LABELS } from "@/types";
import { Link } from "@tanstack/react-router";
import { HelpCircle, ScanSearch } from "lucide-react";
import type { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
  documentType: DocumentType;
  onDocumentTypeChange: (type: DocumentType) => void;
}

export function Layout({
  children,
  documentType,
  onDocumentTypeChange,
}: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border shadow-xs sticky top-0 z-30">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
          {/* Brand */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex items-center justify-center w-8 h-8 rounded-md shrink-0 bg-accent">
              <ScanSearch className="w-4 h-4 text-accent-foreground" />
            </div>
            <div className="flex items-center gap-2 min-w-0">
              <span className="font-display font-semibold text-foreground text-sm sm:text-base leading-tight truncate">
                SimReg Scanner
              </span>
              <Badge
                variant="outline"
                className="hidden sm:flex text-[10px] font-medium border-accent/40 text-accent-foreground bg-accent/10"
              >
                MTN CI
              </Badge>
            </div>
          </div>

          {/* Document type selector + aide link */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Aide link */}
            <Link
              to="/aide"
              data-ocid="header.aide_link"
              className="hidden sm:flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors duration-200 whitespace-nowrap"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              Aide
            </Link>

            <span className="hidden sm:block text-xs text-muted-foreground font-body whitespace-nowrap">
              Type de document
            </span>
            <Select
              value={documentType}
              onValueChange={(v) => onDocumentTypeChange(v as DocumentType)}
            >
              <SelectTrigger
                data-ocid="header.document_type.select"
                className="w-[180px] sm:w-[220px] h-8 text-xs border-border bg-background"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {(
                  Object.entries(DOCUMENT_TYPE_LABELS) as [
                    DocumentType,
                    string,
                  ][]
                ).map(([value, label]) => (
                  <SelectItem key={value} value={value} className="text-xs">
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 overflow-hidden">{children}</main>

      {/* Footer */}
      <footer className="bg-muted/40 border-t border-border py-2 px-4 sm:px-6">
        <p className="text-center text-[11px] text-muted-foreground font-body">
          © {new Date().getFullYear()}. Construit avec amour via{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
              typeof window !== "undefined" ? window.location.hostname : "",
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-foreground transition-colors duration-200"
          >
            caffeine.ai
          </a>
        </p>
      </footer>
    </div>
  );
}
