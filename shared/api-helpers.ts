// Helpers partagés par les fonctions serverless Vercel (api/*).
//
// Côté serveur uniquement : ce fichier n'est jamais importé par le client.
// Aucun secret n'est écrit en dur ici — tout vient de process.env.

import type { z } from "zod";

// ─── Types minimaux (compatibles avec les req/res Node de Vercel) ───────────

/** Sous-ensemble de la requête Node reçue par une fonction Vercel. */
export interface ApiRequest {
  method?: string;
  headers: Record<string, string | string[] | undefined>;
  body?: unknown;
  query?: Record<string, string | string[] | undefined>;
  [key: string]: unknown;
}

/** Sous-ensemble de la réponse Node d'une fonction Vercel. */
export interface ApiResponse {
  status(code: number): ApiResponse;
  json(body: unknown): ApiResponse | void;
  setHeader(name: string, value: string | number | string[]): void;
  end(body?: unknown): void;
}

export type ApiHandler = (req: ApiRequest, res: ApiResponse) => Promise<void>;

// ─── Codes d'erreur stables (Lot 4) ──────────────────────────────────────────

/**
 * Codes d'erreur stables renvoyés avec chaque réponse d'erreur, pour que
 * le front-end puisse afficher un message traduit (client/src/lib/form-i18n.ts).
 * Le message brut (`error`) reste l'appoint quand le code est inconnu.
 */
export const API_ERROR_CODES = [
  "SERVICE_NOT_CONFIGURED",
  "INVALID_INPUT",
  "METHOD_NOT_ALLOWED",
  "EMAIL_SEND_FAILED",
  "PAYMENT_CONFIG_INVALID",
  "PAYMENT_UPSTREAM_ERROR",
  "PAYMENT_URL_MISSING",
  "PAYMENT_SESSION_FAILED",
  "INVALID_SIGNATURE",
  "MISSING_SIGNATURE",
] as const;

export type ApiErrorCode = (typeof API_ERROR_CODES)[number];

// ─── Réponses JSON ───────────────────────────────────────────────────────────

export function sendJson(res: ApiResponse, status: number, body: unknown): void {
  res.status(status).json(body);
}

export function sendError(res: ApiResponse, status: number, error: string, details?: unknown, code?: ApiErrorCode): void {
  const body: Record<string, unknown> =
    details === undefined ? { ok: false, error } : { ok: false, error, details };
  if (code !== undefined) body.code = code;
  sendJson(res, status, body);
}

/** 503 honnête : le service n'est pas configuré, rien n'est simulé. */
export function sendNotConfigured(res: ApiResponse, serviceLabel: string, code: ApiErrorCode = "SERVICE_NOT_CONFIGURED"): void {
  sendError(
    res,
    503,
    `${serviceLabel} non configuré. Aucune demande n'a été traitée : configurez les variables d'environnement du projet (voir README.md) puis réessayez.`,
    undefined,
    code,
  );
}

// ─── Méthode HTTP et corps JSON ───────────────────────────────────────────────

export function requireMethod(req: ApiRequest, res: ApiResponse, method: "POST"): boolean {
  if (req.method !== method) {
    res.setHeader("Allow", method);
    sendError(res, 405, `Méthode non autorisée : utilisez ${method}.`, undefined, "METHOD_NOT_ALLOWED");
    return false;
  }
  return true;
}

/**
 * Vercel parse automatiquement les corps JSON des fonctions Node.
 * Gère les trois formes possibles : objet déjà parsé, chaîne JSON, absent.
 */
export function readJsonBody(req: ApiRequest): unknown {
  const body = req.body;
  if (body === undefined || body === null || body === "") return undefined;
  if (typeof body === "object") return body;
  if (typeof body === "string") {
    try {
      return JSON.parse(body);
    } catch {
      return undefined;
    }
  }
  return undefined;
}

/** Lit le corps brut (utilisé par le webhook Stripe, signature à vérifier). */
export async function readRawBody(req: unknown): Promise<Buffer> {
  const chunks: Uint8Array[] = [];
  for await (const chunk of req as AsyncIterable<Uint8Array>) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

// ─── Variables d'environnement ───────────────────────────────────────────────

export function missingEnv(names: string[]): string[] {
  return names.filter((name) => {
    const value = process.env[name];
    return value === undefined || value.trim() === "";
  });
}

/** Premier message d'erreur lisible d'une validation zod. */
export function firstZodError(error: z.ZodError): string {
  const issue = error.issues[0];
  return issue ? issue.message : "Données invalides.";
}

// ─── Échappement HTML (contenu utilisateur dans les courriels) ───────────────

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function fieldRow(label: string, value: string | undefined): string {
  if (value === undefined || value.trim() === "") return "";
  return `${label} : ${value}\n`;
}

function fieldRowHtml(label: string, value: string | undefined): string {
  if (value === undefined || value.trim() === "") return "";
  return `<tr><td style="padding:6px 12px 6px 0;color:#5b7a82;font-weight:700;">${escapeHtml(label)}</td><td style="padding:6px 0;">${escapeHtml(value)}</td></tr>`;
}

export function buildEmailText(title: string, fields: Array<[string, string | undefined]>, message?: string): string {
  const lines = fields.map(([label, value]) => fieldRow(label, value)).join("");
  return `${title}\n\n${lines}${message ? `\n${message}\n` : ""}---\nEnvoyé depuis le formulaire du site DepXpreS (depxpres-presentation).`;
}

export function buildEmailHtml(title: string, fields: Array<[string, string | undefined]>, message?: string): string {
  const rows = fields.map(([label, value]) => fieldRowHtml(label, value)).join("");
  return `<div style="font-family:sans-serif;color:#0d202c;"><h2>${escapeHtml(title)}</h2><table>${rows}</table>${message ? `<p style="white-space:pre-wrap;">${escapeHtml(message)}</p>` : ""}<p style="color:#5b7a82;font-size:12px;">Envoyé depuis le formulaire du site DepXpreS (depxpres-presentation).</p></div>`;
}

// ─── Envoi de courriel via Resend (fetch natif, aucune dépendance) ───────────

export interface ResendAttachment {
  filename: string;
  content: string; // base64
}

export interface SendEmailOptions {
  apiKey: string;
  from: string;
  to: string;
  replyTo?: string;
  subject: string;
  text: string;
  html: string;
  attachments?: ResendAttachment[];
}

export async function sendEmailViaResend(options: SendEmailOptions): Promise<{ ok: boolean; error?: string }> {
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${options.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: options.from,
        to: [options.to],
        reply_to: options.replyTo,
        subject: options.subject,
        text: options.text,
        html: options.html,
        attachments: options.attachments,
      }),
    });
    if (!response.ok) {
      const raw = await response.text().catch(() => "");
      return { ok: false, error: `Resend a répondu ${response.status}${raw ? ` : ${raw.slice(0, 300)}` : ""}.` };
    }
    return { ok: true };
  } catch (error) {
    return { ok: false, error: `Impossible de joindre Resend : ${error instanceof Error ? error.message : "erreur réseau"}.` };
  }
}

// ─── PayPal REST (fetch natif) ────────────────────────────────────────────────

export function paypalBaseUrl(mode: string): string {
  return mode === "live" ? "https://api-m.paypal.com" : "https://api-m.sandbox.paypal.com";
}

export async function getPaypalAccessToken(
  baseUrl: string,
  clientId: string,
  clientSecret: string,
): Promise<{ ok: true; token: string } | { ok: false; error: string }> {
  try {
    const response = await fetch(`${baseUrl}/v1/oauth2/token`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "grant_type=client_credentials",
    });
    if (!response.ok) {
      const raw = await response.text().catch(() => "");
      return { ok: false, error: `PayPal (jeton d'accès) a répondu ${response.status}${raw ? ` : ${raw.slice(0, 300)}` : ""}.` };
    }
    const data = (await response.json()) as { access_token?: string };
    if (!data.access_token) return { ok: false, error: "PayPal n'a pas renvoyé de jeton d'accès." };
    return { ok: true, token: data.access_token };
  } catch (error) {
    return { ok: false, error: `Impossible de joindre PayPal : ${error instanceof Error ? error.message : "erreur réseau"}.` };
  }
}

/** URL de base du site pour les redirections de paiement (origine de la requête). */
export function requestOrigin(req: ApiRequest): string {
  const origin = req.headers.origin;
  if (typeof origin === "string" && origin.startsWith("http")) return origin;
  const host = req.headers.host;
  if (typeof host === "string" && host !== "") return `https://${host}`;
  return "https://depxpres-presentation.vercel.app";
}
