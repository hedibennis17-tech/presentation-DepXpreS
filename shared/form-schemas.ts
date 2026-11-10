// Schémas de validation partagés entre le client (formulaires) et les
// fonctions serverless Vercel (api/*).
//
// Source unique de vérité : toute règle modifiée ici s'applique des deux
// côtés. Les messages sont en français, langue du site.
//
// Aucun secret ici : uniquement des règles de validation et des tarifs
// publics (déjà affichés sur /licenses).

import { z } from "zod";

/** Formules de licence et tarifs publics en USD (cf. /licenses). */
export const PLAN_PRICES = {
  independent: 1000,
  assisted: 2000,
  "multi-domain": 10000,
} as const;

export type PlanId = keyof typeof PLAN_PRICES;

export const PLAN_LABELS: Record<PlanId, string> = {
  independent: "Independent",
  assisted: "Assisted",
  "multi-domain": "Multi-domain",
};

export const PLAN_IDS = ["independent", "assisted", "multi-domain"] as const;

export const planSchema = z.enum(PLAN_IDS);

/** Limite de pièce jointe pour les tickets de support (5 Mo). */
export const MAX_ATTACHMENT_BYTES = 5 * 1024 * 1024;

const requiredString = (message: string, max = 200) =>
  z.string().trim().min(1, { error: message }).max(max, { error: "Valeur trop longue." });

const optionalText = (max = 2000) =>
  z.string().trim().max(max, { error: "Valeur trop longue." }).optional().or(z.literal(""));

const emailSchema = z
  .string()
  .trim()
  .min(1, { error: "Le courriel est obligatoire." })
  .email({ error: "Courriel invalide." })
  .max(254, { error: "Courriel trop long." });

const websiteSchema = z
  .string()
  .trim()
  .max(254, { error: "Adresse web trop longue." })
  .refine(
    (value) => {
      if (value === "") return true;
      try {
        const url = new URL(value);
        return url.protocol === "http:" || url.protocol === "https:";
      } catch {
        return false;
      }
    },
    { error: "Adresse web invalide (ex. https://www.exemple.com)." },
  );

const domainSchema = z
  .string()
  .trim()
  .toLowerCase()
  .min(1, { error: "Le domaine est obligatoire." })
  .max(253, { error: "Domaine trop long." })
  .refine((value) => /^[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)+$/.test(value), {
    error: "Domaine invalide (ex. exemple.com).",
  });

// ─── Demande de licence (/purchase → /api/license-request) ───────────────────

export const licenseRequestSchema = z
  .object({
    fullName: requiredString("Le nom complet est obligatoire.", 120),
    company: z.string().trim().max(120, { error: "Nom d'entreprise trop long." }).optional().or(z.literal("")),
    clientType: z.enum(["particulier", "entreprise", "startup", "agence", "autre"], {
      error: "Choisissez un type de client.",
    }),
    country: requiredString("Le pays est obligatoire.", 120),
    city: requiredString("La ville est obligatoire.", 120),
    billingAddress: z
      .string()
      .trim()
      .min(5, { error: "L'adresse de facturation est obligatoire." })
      .max(500, { error: "Adresse de facturation trop longue." }),
    email: emailSchema,
    phone: z
      .string()
      .trim()
      .min(6, { error: "Le téléphone est obligatoire." })
      .max(30, { error: "Téléphone trop long." }),
    website: websiteSchema,
    targetDomain: domainSchema,
    domainCount: z.coerce
      .number({ error: "Le nombre de domaines est obligatoire." })
      .int({ error: "Le nombre de domaines doit être un nombre entier." })
      .min(1, { error: "Au moins 1 domaine." })
      .max(100, { error: "100 domaines maximum par demande." }),
    plan: planSchema,
    projectDescription: z
      .string()
      .trim()
      .min(10, { error: "Décrivez votre projet en 10 caractères minimum." })
      .max(2000, { error: "Description trop longue (2 000 caractères maximum)." }),
    sector: requiredString("Le secteur d'activité est obligatoire.", 120),
    comments: optionalText(2000),
    acceptLicenseTerms: z.boolean().refine((value) => value === true, {
      error: "Vous devez accepter les conditions de licence.",
    }),
    acceptPrivacyPolicy: z.boolean().refine((value) => value === true, {
      error: "Vous devez accepter la politique de confidentialité.",
    }),
  })
  .superRefine((data, ctx) => {
    if (data.clientType !== "particulier" && (data.company ?? "").trim() === "") {
      ctx.addIssue({
        code: "custom",
        path: ["company"],
        message: "Le nom de l'entreprise est obligatoire pour ce type de client.",
      });
    }
    if (data.plan !== "multi-domain" && data.domainCount > 1) {
      ctx.addIssue({
        code: "custom",
        path: ["domainCount"],
        message: "Cette formule autorise 1 domaine. Choisissez « Multi-domain » pour plusieurs domaines.",
      });
    }
  });

export type LicenseRequestInput = z.input<typeof licenseRequestSchema>;
export type LicenseRequestOutput = z.output<typeof licenseRequestSchema>;

// ─── Ticket de support (/support → /api/support) ─────────────────────────────

export const supportAppSchema = z.enum(["Client", "Chauffeur", "Commerce", "Admin"]);
export const supportIssueTypeSchema = z.enum([
  "Installation",
  "Configuration",
  "Activation",
  "API / connecteurs",
  "Bug",
  "Incident critique",
  "Paiement",
  "Autre",
]);
export const supportPrioritySchema = z.enum(["Normale", "Haute", "Critique"]);

export const supportAttachmentSchema = z.object({
  filename: z.string().trim().min(1).max(255),
  contentType: z.string().trim().min(1).max(127),
  size: z
    .number()
    .int()
    .positive()
    .max(MAX_ATTACHMENT_BYTES, {
      error: "Pièce jointe trop lourde (5 Mo maximum). Envoyez-la par courriel.",
    }),
  contentBase64: z.string().min(1),
});

export const supportTicketSchema = z.object({
  name: requiredString("Le nom est obligatoire.", 120),
  email: emailSchema,
  company: z.string().trim().max(120, { error: "Nom d'entreprise trop long." }).optional().or(z.literal("")),
  orderOrLicense: z.string().trim().max(120, { error: "Référence trop longue." }).optional().or(z.literal("")),
  domain: z.string().trim().max(253, { error: "Domaine trop long." }).optional().or(z.literal("")),
  app: supportAppSchema,
  issueType: supportIssueTypeSchema,
  priority: supportPrioritySchema,
  description: z
    .string()
    .trim()
    .min(10, { error: "Décrivez le problème en 10 caractères minimum." })
    .max(5000, { error: "Description trop longue (5 000 caractères maximum)." }),
  stepsToReproduce: optionalText(5000),
  attachment: supportAttachmentSchema.optional(),
});

export type SupportTicketInput = z.infer<typeof supportTicketSchema>;

// ─── Demande de contact commercial (/contact → /api/contact) ─────────────────

export const contactRequestSchema = z.object({
  name: requiredString("Le nom est obligatoire.", 120),
  company: z.string().trim().max(120, { error: "Nom d'entreprise trop long." }).optional().or(z.literal("")),
  country: requiredString("Le pays est obligatoire.", 120),
  email: emailSchema,
  phone: z.string().trim().max(30, { error: "Téléphone trop long." }).optional().or(z.literal("")),
  subject: requiredString("Le sujet est obligatoire.", 200),
  message: z
    .string()
    .trim()
    .min(10, { error: "Votre message doit contenir au moins 10 caractères." })
    .max(5000, { error: "Message trop long (5 000 caractères maximum)." }),
  acceptPrivacyPolicy: z.boolean().refine((value) => value === true, {
    error: "Vous devez accepter la politique de confidentialité.",
  }),
});

export type ContactRequestInput = z.infer<typeof contactRequestSchema>;

// ─── Achat : Stripe Checkout (/api/checkout) et PayPal (/api/paypal-*) ────────

/**
 * Le montant est validé côté serveur : il doit correspondre exactement au
 * tarif public de la formule. Le client ne peut pas fixer son propre prix.
 */
export const purchaseSchema = z
  .object({
    plan: planSchema,
    amount: z
      .number({ error: "Le montant est obligatoire." })
      .int({ error: "Le montant doit être un nombre entier (USD)." })
      .positive({ error: "Le montant doit être positif." }),
  })
  .refine((data) => PLAN_PRICES[data.plan] === data.amount, {
    path: ["amount"],
    message: "Le montant ne correspond pas au tarif de la formule choisie.",
  });

export type PurchaseInput = z.infer<typeof purchaseSchema>;

export const paypalCaptureSchema = z.object({
  orderId: z
    .string()
    .trim()
    .min(5, { error: "Identifiant de commande PayPal invalide." })
    .max(64, { error: "Identifiant de commande PayPal invalide." })
    .regex(/^[A-Za-z0-9_-]+$/, { error: "Identifiant de commande PayPal invalide." }),
});

export type PaypalCaptureInput = z.infer<typeof paypalCaptureSchema>;
