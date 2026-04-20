import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { useScanSession } from "@/hooks/useScanSession";
import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  Camera,
  CheckCircle2,
  ClipboardList,
  FileText,
  HelpCircle,
  ScanSearch,
} from "lucide-react";

const steps = [
  {
    icon: FileText,
    title: "Sélectionnez le type de document",
    description:
      "Choisissez le type de document à scanner : CNI, passeport, permis de conduire ou carte de séjour via le menu déroulant en haut de l'écran.",
  },
  {
    icon: Camera,
    title: "Capturez le document",
    description:
      "Positionnez votre document dans le cadre de la caméra et appuyez sur « Capturer l'image ». Assurez-vous que le document est bien éclairé et lisible.",
  },
  {
    icon: ScanSearch,
    title: "Vérifiez les données extraites",
    description:
      "Les informations extraites automatiquement s'affichent dans le panneau de gauche. Corrigez les éventuelles erreurs avant de valider.",
  },
  {
    icon: ClipboardList,
    title: "Transférez vers SimReg",
    description:
      "Une fois les données validées, reportez manuellement les informations dans le formulaire SimReg affiché à droite (onglet « Portail SimReg » sur mobile).",
  },
];

const documents = [
  { label: "Carte Nationale d'Identité (CNI)", priority: true },
  { label: "Passeport", priority: true },
  { label: "Permis de conduire", priority: false },
  { label: "Carte de séjour", priority: false },
  { label: "Autre document officiel", priority: false },
];

const tips = [
  "Assurez-vous que votre document est propre et sans reflets.",
  "Utilisez un fond sombre pour un meilleur contraste.",
  "Tenez votre appareil stable lors de la capture.",
  "Vérifiez toujours les données extraites avant de les utiliser.",
];

export default function AidePage() {
  const session = useScanSession();

  return (
    <Layout
      documentType={session.documentType}
      onDocumentTypeChange={session.setDocumentType}
    >
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Back */}
        <Link to="/" data-ocid="aide.back_link">
          <Button
            variant="ghost"
            size="sm"
            className="mb-6 gap-2 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour à l'application
          </Button>
        </Link>

        {/* Page header */}
        <div className="flex items-center gap-3 mb-8">
          <div
            className="flex items-center justify-center w-10 h-10 rounded-xl shrink-0"
            style={{ backgroundColor: "oklch(0.84 0.23 80 / 0.15)" }}
          >
            <HelpCircle
              className="w-5 h-5"
              style={{ color: "oklch(0.45 0.12 75)" }}
            />
          </div>
          <div>
            <h1 className="font-display font-semibold text-xl text-foreground leading-tight">
              Guide d'utilisation
            </h1>
            <p className="text-sm text-muted-foreground">
              Comment utiliser SimReg Scanner en 4 étapes
            </p>
          </div>
        </div>

        {/* Steps */}
        <section aria-labelledby="steps-heading" className="mb-8">
          <h2
            id="steps-heading"
            className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4"
          >
            Étapes
          </h2>
          <div className="space-y-3">
            {steps.map((step, index) => (
              <div
                key={step.title}
                data-ocid={`aide.step.${index + 1}`}
                className="flex gap-4 p-4 bg-card rounded-xl border border-border animate-slide-in-up"
                style={{ animationDelay: `${index * 0.08}s` }}
              >
                {/* Step number + icon */}
                <div className="flex flex-col items-center gap-1.5 shrink-0">
                  <div
                    className="flex items-center justify-center w-9 h-9 rounded-lg"
                    style={{ backgroundColor: "oklch(0.84 0.23 80 / 0.12)" }}
                  >
                    <step.icon
                      className="w-4 h-4"
                      style={{ color: "oklch(0.45 0.12 75)" }}
                    />
                  </div>
                  <span
                    className="text-[10px] font-bold tabular-nums"
                    style={{ color: "oklch(0.84 0.23 80)" }}
                  >
                    {index + 1}
                  </span>
                </div>

                <div className="min-w-0">
                  <h3 className="font-semibold text-sm text-foreground mb-1">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Documents supported */}
        <section
          aria-labelledby="docs-heading"
          className="bg-card rounded-xl border border-border p-5 mb-6"
        >
          <h2
            id="docs-heading"
            className="font-semibold text-sm text-foreground mb-3 flex items-center gap-2"
          >
            <FileText
              className="w-4 h-4"
              style={{ color: "oklch(0.45 0.12 75)" }}
            />
            Documents supportés
          </h2>
          <ul className="space-y-2">
            {documents.map((doc) => (
              <li key={doc.label} className="flex items-center gap-2 text-sm">
                <CheckCircle2
                  className="w-4 h-4 shrink-0"
                  style={{ color: "oklch(0.55 0.14 145)" }}
                />
                <span className="text-foreground">{doc.label}</span>
                {doc.priority && (
                  <span
                    className="text-[10px] font-semibold px-1.5 py-0.5 rounded ml-1"
                    style={{
                      backgroundColor: "oklch(0.84 0.23 80)",
                      color: "oklch(0.14 0.02 50)",
                    }}
                  >
                    Prioritaire
                  </span>
                )}
              </li>
            ))}
          </ul>
        </section>

        {/* Tips */}
        <section
          aria-labelledby="tips-heading"
          className="bg-muted/40 rounded-xl border border-border p-5"
        >
          <h2
            id="tips-heading"
            className="font-semibold text-sm text-foreground mb-3"
          >
            Conseils pour un scan réussi
          </h2>
          <ul className="space-y-2">
            {tips.map((tip) => (
              <li
                key={tip}
                className="flex items-start gap-2 text-sm text-muted-foreground"
              >
                <span
                  className="mt-0.5 w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ backgroundColor: "oklch(0.84 0.23 80)" }}
                  aria-hidden="true"
                />
                {tip}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </Layout>
  );
}
