// POST /api/support — Ticket de support technique DepXpreS.
//
// Reçoit le formulaire de /support, le valide avec zod, puis transmet le
// ticket à l'administrateur par courriel via Resend.
//
// Pièce jointe : le client envoie le fichier en base64 dans le JSON. Elle
// n'est transmise à Resend que si elle fait moins de 5 Mo (limite validée
// côté client ET côté serveur, voir MAX_ATTACHMENT_BYTES dans
// shared/form-schemas.ts). Au-delà, la demande est refusée avec un message
// invitant à envoyer le fichier par courriel.
//
// Honnêteté : si l'envoi de courriels n'est pas configuré (RESEND_API_KEY,
// ADMIN_EMAIL, FROM_EMAIL), la fonction répond 503 avec un message explicite.
// Aucun succès n'est simulé : 200 signifie que Resend a accepté le courriel.
//
// En local, le serveur Express (server/index.ts) ne sert pas /api —
// c'est normal : ces fonctions ne s'exécutent que sur le déploiement
// Vercel (en local, utiliser `vercel dev`).

import { supportTicketSchema } from "../shared/form-schemas.js";
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

  const parsed = supportTicketSchema.safeParse(readJsonBody(req));
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
    ["Courriel", data.email],
    ["Entreprise", data.company || undefined],
    ["Numéro de commande ou licence", data.orderOrLicense || undefined],
    ["Domaine concerné", data.domain || undefined],
    ["Application concernée", data.app],
    ["Type de problème", data.issueType],
    ["Niveau de priorité", data.priority],
    ["Pièce jointe", data.attachment ? `${data.attachment.filename} (${data.attachment.size} octets)` : undefined],
  ];

  const sent = await sendEmailViaResend({
    apiKey: process.env.RESEND_API_KEY as string,
    from: process.env.FROM_EMAIL as string,
    to: process.env.ADMIN_EMAIL as string,
    replyTo: data.email,
    subject: `[DepXpreS] Support — ${data.issueType} — ${data.app} — Priorité ${data.priority} — ${data.name}`,
    text: buildEmailText("Nouveau ticket de support DepXpreS", fields, data.stepsToReproduce ? `${data.description}\n\nÉtapes pour reproduire :\n${data.stepsToReproduce}` : data.description),
    html: buildEmailHtml("Nouveau ticket de support DepXpreS", fields, data.stepsToReproduce ? `${data.description}\n\nÉtapes pour reproduire :\n${data.stepsToReproduce}` : data.description),
    attachments: data.attachment
      ? [{ filename: data.attachment.filename, content: data.attachment.contentBase64 }]
      : undefined,
  });

  if (!sent.ok) {
    sendError(res, 502, `Le ticket n'a pas pu être transmis : ${sent.error ?? "erreur du service d'envoi."}`, undefined, "EMAIL_SEND_FAILED");
    return;
  }

  sendJson(res, 200, {
    ok: true,
    message: "Ticket de support transmis. Vous recevrez une réponse à l'adresse indiquée.",
  });
};

export default handler;
