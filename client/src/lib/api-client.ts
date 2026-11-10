import type { Language } from "@/lib/i18n";

// Appels aux fonctions serverless /api/* (Vercel).
//
// Les réponses sont toujours lues prudemment : en développement local
// (`pnpm dev` ou serveur Express), /api n'existe pas et le serveur renvoie
// du HTML (page SPA) au lieu de JSON — cela ne doit jamais être interprété
// comme un succès. En local, utilisez `vercel dev` pour tester les API.
//
// Les erreurs API portent un code stable (`code`, cf.
// shared/api-helpers.ts) : le front-end affiche sa traduction
// (client/src/lib/form-i18n.ts), le message brut du serveur restant
// l'appoint quand le code est inconnu.

export interface ApiResult<T = unknown> {
  ok: boolean;
  status: number;
  data?: T;
  /** Message d'erreur lisible, issu du serveur quand il est disponible. */
  error?: string;
  /** Code d'erreur stable (ex. SERVICE_NOT_CONFIGURED, INVALID_INPUT). */
  code?: string;
}

interface ApiErrorBody {
  error?: string;
  message?: string;
  code?: string;
}

const LOCAL_DEV_HINT: Record<Language, string> = {
  fr: "En développement local, les API /api ne sont servies que par `vercel dev` (le serveur Express local ne les sert pas).",
  en: "In local development, the /api endpoints are only served by `vercel dev` (the local Express server does not serve them).",
  ar: "في التطوير المحلي، لا تُقدم واجهات /api إلا عبر `vercel dev` (خادم Express المحلي لا يقدمها).",
};

export async function postJson<T = unknown>(url: string, body: unknown, lang: Language = "fr"): Promise<ApiResult<T>> {
  const hint = LOCAL_DEV_HINT[lang];
  let response: Response;
  try {
    response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch {
    return {
      ok: false,
      status: 0,
      error:
        lang === "en"
          ? `Could not reach the server (${url}). ${hint}`
          : lang === "ar"
            ? `تعذر الاتصال بالخادم (${url}). ${hint}`
            : `Impossible de joindre le serveur (${url}). ${hint}`,
    };
  }

  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    return {
      ok: false,
      status: response.status,
      error:
        response.status === 404
          ? lang === "en"
            ? `Service ${url} not found (404). ${hint}`
            : lang === "ar"
              ? `الخدمة ${url} غير موجودة (404). ${hint}`
              : `Service ${url} introuvable (404). ${hint}`
          : lang === "en"
            ? `Unexpected server response (${response.status}). ${hint}`
            : lang === "ar"
              ? `استجابة غير متوقعة من الخادم (${response.status}). ${hint}`
              : `Réponse inattendue du serveur (${response.status}). ${hint}`,
    };
  }

  let data: unknown = undefined;
  try {
    data = await response.json();
  } catch {
    return {
      ok: false,
      status: response.status,
      error:
        lang === "en"
          ? "Unreadable server response."
          : lang === "ar"
            ? "استجابة الخادم غير قابلة للقراءة."
            : "Réponse du serveur illisible.",
    };
  }

  if (!response.ok) {
    const body = data as ApiErrorBody;
    const message = body?.error ?? body?.message;
    return {
      ok: false,
      status: response.status,
      data: data as T,
      error: typeof message === "string" && message !== "" ? message : lang === "en" ? `Error ${response.status}.` : lang === "ar" ? `خطأ ${response.status}.` : `Erreur ${response.status}.`,
      code: typeof body?.code === "string" ? body.code : undefined,
    };
  }

  return { ok: true, status: response.status, data: data as T };
}
