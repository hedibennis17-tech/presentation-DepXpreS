// POST /api/paypal-capture — Capture d'une commande PayPal approuvée.
//
// Après approbation par l'acheteur sur paypal.com, le client appelle cette
// fonction avec l'identifiant de commande. Elle exécute la vraie capture
// PayPal (REST) et renvoie le statut réel renvoyé par PayPal.
//
// Honnêteté : si PAYPAL_CLIENT_ID / PAYPAL_CLIENT_SECRET ne sont pas
// configurés, la fonction répond 503 (« paiement en ligne non configuré »).
// Aucune capture réussie n'est simulée : le succès n'est affirmé que si
// PayPal renvoie le statut COMPLETED.
//
// La licence et la facture ne sont PAS émises ici : elles relèvent d'une
// étape ultérieure, après confirmation réelle de la capture côté serveur
// (même principe que le webhook Stripe).
//
// PAYPAL_MODE=sandbox|live (défaut : sandbox).
//
// En local, le serveur Express (server/index.ts) ne sert pas /api —
// c'est normal : ces fonctions ne s'exécutent que sur le déploiement
// Vercel (en local, utiliser `vercel dev`).

import { paypalCaptureSchema } from "../shared/form-schemas.js";
import {
  firstZodError,
  getPaypalAccessToken,
  missingEnv,
  paypalBaseUrl,
  readJsonBody,
  requireMethod,
  sendError,
  sendJson,
  sendNotConfigured,
  type ApiHandler,
} from "../shared/api-helpers.js";

const handler: ApiHandler = async (req, res) => {
  if (!requireMethod(req, res, "POST")) return;

  const parsed = paypalCaptureSchema.safeParse(readJsonBody(req));
  if (!parsed.success) {
    sendError(res, 400, firstZodError(parsed.error), parsed.error.issues, "INVALID_INPUT");
    return;
  }
  const { orderId } = parsed.data;

  if (missingEnv(["PAYPAL_CLIENT_ID", "PAYPAL_CLIENT_SECRET"]).length > 0) {
    sendNotConfigured(res, "Le paiement en ligne");
    return;
  }

  const mode = (process.env.PAYPAL_MODE ?? "sandbox").trim().toLowerCase();
  if (mode !== "sandbox" && mode !== "live") {
    sendError(res, 500, "Configuration PayPal invalide : PAYPAL_MODE doit être « sandbox » ou « live ».", undefined, "PAYMENT_CONFIG_INVALID");
    return;
  }

  const baseUrl = paypalBaseUrl(mode);
  const token = await getPaypalAccessToken(
    baseUrl,
    process.env.PAYPAL_CLIENT_ID as string,
    process.env.PAYPAL_CLIENT_SECRET as string,
  );
  if (!token.ok) {
    sendError(res, 502, token.error, undefined, "PAYMENT_UPSTREAM_ERROR");
    return;
  }

  try {
    const response = await fetch(`${baseUrl}/v2/checkout/orders/${encodeURIComponent(orderId)}/capture`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token.token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const raw = await response.text().catch(() => "");
      sendError(res, 502, `PayPal a répondu ${response.status}${raw ? ` : ${raw.slice(0, 300)}` : ""}.`, undefined, "PAYMENT_UPSTREAM_ERROR");
      return;
    }

    const capture = (await response.json()) as {
      id?: string;
      status?: string;
      payer?: { email_address?: string };
      purchase_units?: Array<{
        payments?: { captures?: Array<{ id?: string; status?: string }> };
      }>;
    };
    const captureId = capture.purchase_units?.[0]?.payments?.captures?.[0]?.id;

    // Le statut renvoyé est celui de PayPal, sans embellissement.
    sendJson(res, 200, {
      ok: capture.status === "COMPLETED",
      status: capture.status ?? "UNKNOWN",
      orderId: capture.id ?? orderId,
      captureId: captureId ?? null,
      payerEmail: capture.payer?.email_address ?? null,
      message:
        capture.status === "COMPLETED"
          ? "Paiement PayPal capturé. La licence sera émise après confirmation côté serveur."
          : `La capture PayPal n'est pas terminée (statut : ${capture.status ?? "inconnu"}). Aucun paiement n'a été confirmé.`,
    });
  } catch (error) {
    sendError(res, 502, `La capture PayPal a échoué : ${error instanceof Error ? error.message : "erreur réseau."}`, undefined, "PAYMENT_UPSTREAM_ERROR");
  }
};

export default handler;
