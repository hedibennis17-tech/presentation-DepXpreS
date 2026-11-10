// POST /api/contact — Demande de contact commercial DepXpreS.
//
// Reçoit le formulaire de /contact, le valide avec zod, puis transmet la
// demande à l'administrateur par courriel via Resend.
//
// Honnêteté : si l'envoi de courriels n'est pas configuré (RESEND_API_KEY,
// ADMIN_EMAIL, FROM_EMAIL), la fonction répond 503 avec un message explicite.
// Aucun succès n'est simulé : 200 signifie que Resend a accepté le courriel.
//
// En local, le serveur Express (server/index.ts) ne sert pas /api —
// c'est normal : ces fonctions ne s'exécutent que sur le déploiement
// Vercel (en local, utiliser `vercel dev`).

import { contactRequestSchema } from "../shared/form-schemas.js";
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

  const parsed = contactRequestSchema.safeParse(readJsonBody(req));
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

  const fields: Array<[string, string | undefined]> = [
    ["Nom", data.name],
    ["Entreprise", data.company || undefined],
    ["Pays", data.country],
    ["Courriel", data.email],
    ["Téléphone", data.phone || undefined],
    ["Sujet", data.subject],
    ["Politique de confidentialité acceptée", data.acceptPrivacyPolicy ? "Oui" : "Non"],
  ];

  const sent = await sendEmailViaResend({
    apiKey: process.env.RESEND_API_KEY as string,
    from: process.env.FROM_EMAIL as string,
    to: process.env.ADMIN_EMAIL as string,
    replyTo: data.email,
    subject: `[DepXpreS] Contact commercial — ${data.subject} — ${data.name}`,
    text: buildEmailText("Nouvelle demande de contact commercial DepXpreS", fields, data.message),
    html: buildEmailHtml("Nouvelle demande de contact commercial DepXpreS", fields, data.message),
  });

  if (!sent.ok) {
    sendError(res, 502, `La demande n'a pas pu être transmise : ${sent.error ?? "erreur du service d'envoi."}`, undefined, "EMAIL_SEND_FAILED");
    return;
  }

  sendJson(res, 200, {
    ok: true,
    message: "Demande transmise. Vous recevrez une réponse à l'adresse indiquée.",
  });
};

export default handler;
