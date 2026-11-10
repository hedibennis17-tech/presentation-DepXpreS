// POST /api/paypal-create-order — Création d'une commande PayPal (REST).
//
// Valide la formule et le montant (le montant doit correspondre exactement
// au tarif public de la formule : 1 000 / 2 000 / 10 000 USD), puis crée
// une vraie commande PayPal (intent CAPTURE) et renvoie son URL
// d'approbation, vers laquelle l'acheteur est redirigé.
//
// Honnêteté : si PAYPAL_CLIENT_ID / PAYPAL_CLIENT_SECRET ne sont pas
// configurés, la fonction répond 503 (« paiement en ligne non configuré »).
// Aucune commande ni capture n'est simulée.
//
// PAYPAL_MODE=sandbox|live (défaut : sandbox). La capture se fait ensuite
// via /api/paypal-capture. La licence et la facture ne sont émises qu'après
// confirmation réelle de la capture côté serveur (étape ultérieure).
//
// En local, le serveur Express (server/index.ts) ne sert pas /api —
// c'est normal : ces fonctions ne s'exécutent que sur le déploiement
// Vercel (en local, utiliser `vercel dev`).

import { PLAN_LABELS, purchaseSchema } from "../shared/form-schemas.js";
import {
  firstZodError,
  getPaypalAccessToken,
  missingEnv,
  paypalBaseUrl,
  readJsonBody,
  requestOrigin,
  requireMethod,
  sendError,
  sendJson,
  sendNotConfigured,
  type ApiHandler,
} from "../shared/api-helpers.js";

const handler: ApiHandler = async (req, res) => {
  if (!requireMethod(req, res, "POST")) return;

  const parsed = purchaseSchema.safeParse(readJsonBody(req));
  if (!parsed.success) {
    sendError(res, 400, firstZodError(parsed.error), parsed.error.issues, "INVALID_INPUT");
    return;
  }
  const { plan, amount } = parsed.data;

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

  const origin = requestOrigin(req);

  try {
    const response = await fetch(`${baseUrl}/v2/checkout/orders`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        intent: "CAPTURE",
        purchase_units: [
          {
            description: `Licence DepXpreS — ${PLAN_LABELS[plan]}`,
            amount: { currency_code: "USD", value: amount.toFixed(2) },
          },
        ],
        application_context: {
          brand_name: "DepXpreS",
          return_url: `${origin}/purchase?payment=paypal-return&plan=${plan}`,
          cancel_url: `${origin}/purchase?payment=cancelled&plan=${plan}`,
        },
      }),
    });

    if (!response.ok) {
      const raw = await response.text().catch(() => "");
      sendError(res, 502, `PayPal a répondu ${response.status}${raw ? ` : ${raw.slice(0, 300)}` : ""}.`, undefined, "PAYMENT_UPSTREAM_ERROR");
      return;
    }

    const order = (await response.json()) as {
      id?: string;
      links?: Array<{ rel?: string; href?: string }>;
    };
    const approvalUrl = order.links?.find((link) => link.rel === "approve")?.href;
    if (!order.id || !approvalUrl) {
      sendError(res, 502, "PayPal n'a pas renvoyé d'URL d'approbation pour cette commande.", undefined, "PAYMENT_URL_MISSING");
      return;
    }

    sendJson(res, 200, { ok: true, orderId: order.id, approvalUrl });
  } catch (error) {
    sendError(res, 502, `La création de la commande PayPal a échoué : ${error instanceof Error ? error.message : "erreur réseau."}`, undefined, "PAYMENT_UPSTREAM_ERROR");
  }
};

export default handler;
