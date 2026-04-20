import { X as jsxRuntimeExports, a7 as Link } from "./index-CWxTXakn.js";
import { c as createLucideIcon, u as useScanSession, L as Layout, B as Button, j as CircleHelp, F as FileText, C as Camera, S as ScanSearch, d as CircleCheck } from "./button-BM-cwsme.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
  ["path", { d: "M19 12H5", key: "x3x0zl" }]
];
const ArrowLeft = createLucideIcon("arrow-left", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["rect", { width: "8", height: "4", x: "8", y: "2", rx: "1", ry: "1", key: "tgr4d6" }],
  [
    "path",
    {
      d: "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2",
      key: "116196"
    }
  ],
  ["path", { d: "M12 11h4", key: "1jrz19" }],
  ["path", { d: "M12 16h4", key: "n85exb" }],
  ["path", { d: "M8 11h.01", key: "1dfujw" }],
  ["path", { d: "M8 16h.01", key: "18s6g9" }]
];
const ClipboardList = createLucideIcon("clipboard-list", __iconNode);
const steps = [
  {
    icon: FileText,
    title: "Sélectionnez le type de document",
    description: "Choisissez le type de document à scanner : CNI, passeport, permis de conduire ou carte de séjour via le menu déroulant en haut de l'écran."
  },
  {
    icon: Camera,
    title: "Capturez le document",
    description: "Positionnez votre document dans le cadre de la caméra et appuyez sur « Capturer l'image ». Assurez-vous que le document est bien éclairé et lisible."
  },
  {
    icon: ScanSearch,
    title: "Vérifiez les données extraites",
    description: "Les informations extraites automatiquement s'affichent dans le panneau de gauche. Corrigez les éventuelles erreurs avant de valider."
  },
  {
    icon: ClipboardList,
    title: "Transférez vers SimReg",
    description: "Une fois les données validées, reportez manuellement les informations dans le formulaire SimReg affiché à droite (onglet « Portail SimReg » sur mobile)."
  }
];
const documents = [
  { label: "Carte Nationale d'Identité (CNI)", priority: true },
  { label: "Passeport", priority: true },
  { label: "Permis de conduire", priority: false },
  { label: "Carte de séjour", priority: false },
  { label: "Autre document officiel", priority: false }
];
const tips = [
  "Assurez-vous que votre document est propre et sans reflets.",
  "Utilisez un fond sombre pour un meilleur contraste.",
  "Tenez votre appareil stable lors de la capture.",
  "Vérifiez toujours les données extraites avant de les utiliser."
];
function AidePage() {
  const session = useScanSession();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Layout,
    {
      documentType: session.documentType,
      onDocumentTypeChange: session.setDocumentType,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto px-4 py-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", "data-ocid": "aide.back_link", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "ghost",
            size: "sm",
            className: "mb-6 gap-2 text-muted-foreground hover:text-foreground",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
              "Retour à l'application"
            ]
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "flex items-center justify-center w-10 h-10 rounded-xl shrink-0",
              style: { backgroundColor: "oklch(0.84 0.23 80 / 0.15)" },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                CircleHelp,
                {
                  className: "w-5 h-5",
                  style: { color: "oklch(0.45 0.12 75)" }
                }
              )
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-semibold text-xl text-foreground leading-tight", children: "Guide d'utilisation" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Comment utiliser SimReg Scanner en 4 étapes" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "aria-labelledby": "steps-heading", className: "mb-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "h2",
            {
              id: "steps-heading",
              className: "text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4",
              children: "Étapes"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: steps.map((step, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              "data-ocid": `aide.step.${index + 1}`,
              className: "flex gap-4 p-4 bg-card rounded-xl border border-border animate-slide-in-up",
              style: { animationDelay: `${index * 0.08}s` },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-1.5 shrink-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "flex items-center justify-center w-9 h-9 rounded-lg",
                      style: { backgroundColor: "oklch(0.84 0.23 80 / 0.12)" },
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        step.icon,
                        {
                          className: "w-4 h-4",
                          style: { color: "oklch(0.45 0.12 75)" }
                        }
                      )
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "text-[10px] font-bold tabular-nums",
                      style: { color: "oklch(0.84 0.23 80)" },
                      children: index + 1
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-sm text-foreground mb-1", children: step.title }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: step.description })
                ] })
              ]
            },
            step.title
          )) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "section",
          {
            "aria-labelledby": "docs-heading",
            className: "bg-card rounded-xl border border-border p-5 mb-6",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "h2",
                {
                  id: "docs-heading",
                  className: "font-semibold text-sm text-foreground mb-3 flex items-center gap-2",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      FileText,
                      {
                        className: "w-4 h-4",
                        style: { color: "oklch(0.45 0.12 75)" }
                      }
                    ),
                    "Documents supportés"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2", children: documents.map((doc) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-2 text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  CircleCheck,
                  {
                    className: "w-4 h-4 shrink-0",
                    style: { color: "oklch(0.55 0.14 145)" }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: doc.label }),
                doc.priority && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "text-[10px] font-semibold px-1.5 py-0.5 rounded ml-1",
                    style: {
                      backgroundColor: "oklch(0.84 0.23 80)",
                      color: "oklch(0.14 0.02 50)"
                    },
                    children: "Prioritaire"
                  }
                )
              ] }, doc.label)) })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "section",
          {
            "aria-labelledby": "tips-heading",
            className: "bg-muted/40 rounded-xl border border-border p-5",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "h2",
                {
                  id: "tips-heading",
                  className: "font-semibold text-sm text-foreground mb-3",
                  children: "Conseils pour un scan réussi"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2", children: tips.map((tip) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "li",
                {
                  className: "flex items-start gap-2 text-sm text-muted-foreground",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: "mt-0.5 w-1.5 h-1.5 rounded-full shrink-0",
                        style: { backgroundColor: "oklch(0.84 0.23 80)" },
                        "aria-hidden": "true"
                      }
                    ),
                    tip
                  ]
                },
                tip
              )) })
            ]
          }
        )
      ] })
    }
  );
}
export {
  AidePage as default
};
