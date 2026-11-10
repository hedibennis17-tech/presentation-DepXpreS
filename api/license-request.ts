// POST /api/license-request — Demande de licence DepXpreS.
//
// Reçoit le formulaire de /purchase, le valide avec zod, puis transmet la
// demande à l'administrateur par courriel via Resend.
//
// Honnêteté : si l'envoi de courriels n'est pas configuré (RESEND_API_KEY,
// ADMIN_EMAIL, FROM_EMAIL), la fonction répond 503 avec un message explicite.
// Aucun succès n'est simulé : 200 signifie que Resend a accepté le courriel.
//
// En local, le serveur Express (server/index.ts) ne sert pas /api —
// c'est normal : ces fonctions ne s'exécutent que sur le déploiement
// Vercel (en local, utiliser `vercel dev`).

import { licenseRequestSchema, PLAN_LABELS } from "../shared/form-schemas.js";
import {
  buildEmailHtml,
  buildEmailText,
  firstZodError,
  missingEnv,
  readJsonBody,
  requireMethod,
  sendEmailViaResend,
  sendError,
  sendJson,
  sendNotConfigured,
  type ApiHandler,
} from "../shared/api-helpers.js";

const handler: ApiHandler = async (req, res) => {
  if (!requireMethod(req, res, "POST")) return;

  const parsed = licenseRequestSchema.safeParse(readJsonBody(req));
  if (!parsed.success) {
    sendError(res, 400, firstZodError(parsed.error), parsed.error.issues, "INVALID_INPUT");
    return;
  }
  const data = parsed.data;

  const missing = missingEnv(["RESEND_API_KEY", "ADMIN_EMAIL", "FROM_EMAIL"]);
  if (missing.length > 0) {
    sendNotConfigured(res, "Le service d'envoi d'e-mails");
    return;
  }

  const planLabel = PLAN_LABELS[data.plan];
  const fields: Array<[string, string | undefined]> = [
    ["Nom complet", data.fullName],
    ["Entreprise", data.company || undefined],
    ["Type de client", data.clientType],
    ["Pays", data.country],
    ["Ville", data.city],
    ["Adresse de facturation", data.billingAddress],
    ["Courriel", data.email],
    ["Téléphone", data.phone],
    ["Site web", data.website || undefined],
    ["Domaine destiné à recevoir DepXpreS", data.targetDomain],
    ["Nombre de domaines souhaités", String(data.domainCount)],
    ["Licence demandée", `${planLabel}`],
    ["Secteur d'activité", data.sector],
    ["Commentaires", data.comments || undefined],
    ["Conditions de licence acceptées", data.acceptLicenseTerms ? "Oui" : "Non"],
    ["Politique de confidentialité acceptée", data.acceptPrivacyPolicy ? "Oui" : "Non"],
  ];

  const sent = await sendEmailViaResend({
    apiKey: process.env.RESEND_API_KEY as string,
    from: process.env.FROM_EMAIL as string,
    to: process.env.ADMIN_EMAIL as string,
    replyTo: data.email,
    subject: `[DepXpreS] Demande de licence — ${planLabel} — ${data.fullName}${data.company ? ` (${data.company})` : ""}`,
    text: buildEmailText("Nouvelle demande de licence DepXpreS", fields, data.projectDescription),
    html: buildEmailHtml("Nouvelle demande de licence DepXpreS", fields, data.projectDescription),
  });

  if (!sent.ok) {
    sendError(res, 502, `La demande n'a pas pu être transmise : ${sent.error ?? "erreur du service d'envoi."}`, undefined, "EMAIL_SEND_FAILED");
    return;
  }

  sendJson(res, 200, {
    ok: true,
    message: "Demande de licence transmise. Vous recevrez une réponse à l'adresse indiquée.",
  });
};

export default handler;
