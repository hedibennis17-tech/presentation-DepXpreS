// POST /api/checkout — Création d'une session Stripe Checkout.
//
// Valide la formule et le montant (le montant doit correspondre exactement
// au tarif public de la formule : 1 000 / 2 000 / 10 000 USD), puis crée
// une vraie session Stripe Checkout et renvoie son URL de redirection.
//
// Honnêteté : si STRIPE_SECRET_KEY n'est pas configurée, la fonction répond
// 503 (« paiement en ligne non configuré »). Aucun paiement n'est simulé :
// sans clé Stripe, aucun paiement n'a lieu et aucune licence n'est émise.
//
// La licence et la facture ne sont PAS émises ici : elles relèvent d'une
// étape ultérieure, branchée sur le webhook /api/stripe-webhook (confirmation
// réelle du paiement côté serveur).
//
// En local, le serveur Express (server/index.ts) ne sert pas /api —
// c'est normal : ces fonctions ne s'exécutent que sur le déploiement
// Vercel (en local, utiliser `vercel dev`).

import Stripe from "stripe";
import { PLAN_LABELS, purchaseSchema } from "../shared/form-schemas.js";
import {
  firstZodError,
  missingEnv,
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

  if (missingEnv(["STRIPE_SECRET_KEY"]).length > 0) {
    sendNotConfigured(res, "Le paiement en ligne");
    return;
  }

  const origin = requestOrigin(req);
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      currency: "usd",
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "usd",
            unit_amount: amount * 100,
            product_data: {
              name: `Licence DepXpreS — ${PLAN_LABELS[plan]}`,
              description: "Licence logicielle DepXpreS (code source des 4 applications).",
            },
          },
        },
      ],
      metadata: { plan, product: "depxpres-license" },
      success_url: `${origin}/purchase?payment=success&plan=${plan}`,
      cancel_url: `${origin}/purchase?payment=cancelled&plan=${plan}`,
    });

    if (!session.url) {
      sendError(res, 502, "Stripe n'a pas renvoyé d'URL de paiement.", undefined, "PAYMENT_URL_MISSING");
      return;
    }

    sendJson(res, 200, { ok: true, url: session.url, sessionId: session.id });
  } catch (error) {
    sendError(
      res,
      502,
      `La création de la session de paiement a échoué : ${error instanceof Error ? error.message : "erreur Stripe."}`,
      undefined,
      "PAYMENT_SESSION_FAILED",
    );
  }
};

export default handler;
