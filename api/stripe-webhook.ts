// POST /api/stripe-webhook — Réception des événements Stripe.
//
// Vérifie la signature Stripe avec STRIPE_WEBHOOK_SECRET, puis journalise
// l'événement. C'est ici que la confirmation réelle du paiement arrive.
//
// ÉTAPE ULTÉRIEURE (non implémentée ici, à brancher) : sur
// `checkout.session.completed`, émettre la licence (code d'activation lié
// au domaine) et générer la facture. Pour l'instant, la fonction journalise
// uniquement l'événement et répond 200 — aucune licence n'est émise, aucune
// facture n'est générée, et rien n'est simulé.
//
// Honnêteté : si STRIPE_WEBHOOK_SECRET n'est pas configurée, la fonction
// répond 503 : sans secret, la signature ne peut pas être vérifiée et
// aucun événement n'est accepté.
//
// Note technique : `bodyParser: false` est requis — Stripe doit vérifier la
// signature sur le corps brut, avant tout parsing JSON.

import Stripe from "stripe";
import { missingEnv, readRawBody, sendError, sendJson, sendNotConfigured, type ApiHandler } from "../shared/api-helpers.js";

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler: ApiHandler = async (req, res) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    sendError(res, 405, "Méthode non autorisée : utilisez POST.", undefined, "METHOD_NOT_ALLOWED");
    return;
  }

  if (missingEnv(["STRIPE_SECRET_KEY", "STRIPE_WEBHOOK_SECRET"]).length > 0) {
    sendNotConfigured(res, "La vérification des webhooks Stripe");
    return;
  }

  const signature = req.headers["stripe-signature"];
  if (typeof signature !== "string" || signature === "") {
    sendError(res, 400, "Signature Stripe manquante (en-tête stripe-signature).", undefined, "MISSING_SIGNATURE");
    return;
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
  const rawBody = await readRawBody(req);

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, process.env.STRIPE_WEBHOOK_SECRET as string);
  } catch (error) {
    sendError(
      res,
      400,
      `Signature Stripe invalide : ${error instanceof Error ? error.message : "vérification impossible."}`,
      undefined,
      "INVALID_SIGNATURE",
    );
    return;
  }

  // Journalisation uniquement — voir l'en-tête du fichier.
  console.log(`[stripe-webhook] ${event.type} — id=${event.id} — livemode=${event.livemode}`);
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    console.log(
      `[stripe-webhook] Paiement confirmé — session=${session.id} — plan=${session.metadata?.plan ?? "inconnu"} — montant=${session.amount_total ?? "inconnu"} ${session.currency ?? ""}. Émission de la licence et facture : étape ultérieure à brancher ici.`,
    );
    // TODO (étape ultérieure) : émettre la licence (code d'activation lié au
    // domaine déclaré) et générer la facture, puis notifier l'acheteur.
  }

  sendJson(res, 200, { ok: true, received: true, type: event.type });
};

export default handler;
