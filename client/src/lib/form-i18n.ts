// Traductions côté front-end des messages d'erreur (Lot 4).
//
// La validation (zod, shared/form-schemas.ts) n'est PAS modifiée : ses
// messages restent en français, langue source. Ici, chaque message connu
// est traduit en anglais et en arabe au moment de l'affichage, par
// correspondance exacte. Un message inconnu est renvoyé tel quel (appoint
// du serveur) — jamais inventé.
//
// Idem pour les codes d'erreur stables renvoyés par les API
// (shared/api-helpers.ts : SERVICE_NOT_CONFIGURED, INVALID_INPUT, …) :
// le code décide du texte affiché, le message brut du serveur reste
// l'appoint quand le code est inconnu.

import type { Language } from "@/lib/i18n";

// ─── Messages de validation zod (shared/form-schemas.ts) ────────────────────

type MsgMap = Record<string, { en: string; ar: string }>;

const VALIDATION_MESSAGES: MsgMap = {
  "Valeur trop longue.": { en: "Value too long.", ar: "القيمة طويلة جدا." },
  "Le courriel est obligatoire.": { en: "Email is required.", ar: "البريد الإلكتروني مطلوب." },
  "Courriel invalide.": { en: "Invalid email address.", ar: "البريد الإلكتروني غير صالح." },
  "Courriel trop long.": { en: "Email address too long.", ar: "البريد الإلكتروني طويل جدا." },
  "Adresse web trop longue.": { en: "Web address too long.", ar: "عنوان الويب طويل جدا." },
  "Adresse web invalide (ex. https://www.exemple.com).": {
    en: "Invalid web address (e.g. https://www.example.com).",
    ar: "عنوان الويب غير صالح (مثال: https://www.example.com).",
  },
  "Le domaine est obligatoire.": { en: "Domain is required.", ar: "النطاق مطلوب." },
  "Domaine trop long.": { en: "Domain too long.", ar: "النطاق طويل جدا." },
  "Domaine invalide (ex. exemple.com).": {
    en: "Invalid domain (e.g. example.com).",
    ar: "النطاق غير صالح (مثال: example.com).",
  },
  "Le nom complet est obligatoire.": { en: "Full name is required.", ar: "الاسم الكامل مطلوب." },
  "Nom d'entreprise trop long.": { en: "Company name too long.", ar: "اسم الشركة طويل جدا." },
  "Choisissez un type de client.": { en: "Choose a client type.", ar: "اختر نوع العميل." },
  "Le pays est obligatoire.": { en: "Country is required.", ar: "البلد مطلوب." },
  "La ville est obligatoire.": { en: "City is required.", ar: "المدينة مطلوبة." },
  "L'adresse de facturation est obligatoire.": {
    en: "Billing address is required.",
    ar: "عنوان الفوترة مطلوب.",
  },
  "Adresse de facturation trop longue.": { en: "Billing address too long.", ar: "عنوان الفوترة طويل جدا." },
  "Le téléphone est obligatoire.": { en: "Phone number is required.", ar: "رقم الهاتف مطلوب." },
  "Téléphone trop long.": { en: "Phone number too long.", ar: "رقم الهاتف طويل جدا." },
  "Le nombre de domaines est obligatoire.": { en: "Number of domains is required.", ar: "عدد النطاقات مطلوب." },
  "Le nombre de domaines doit être un nombre entier.": {
    en: "Number of domains must be a whole number.",
    ar: "يجب أن يكون عدد النطاقات عددا صحيحا.",
  },
  "Au moins 1 domaine.": { en: "At least 1 domain.", ar: "نطاق واحد على الأقل." },
  "100 domaines maximum par demande.": { en: "100 domains maximum per request.", ar: "100 نطاق كحد أقصى لكل طلب." },
  "Décrivez votre projet en 10 caractères minimum.": {
    en: "Describe your project in at least 10 characters.",
    ar: "صف مشروعك في 10 أحرف على الأقل.",
  },
  "Description trop longue (2 000 caractères maximum).": {
    en: "Description too long (2,000 characters maximum).",
    ar: "الوصف طويل جدا (2000 حرف كحد أقصى).",
  },
  "Le secteur d'activité est obligatoire.": { en: "Business sector is required.", ar: "قطاع النشاط مطلوب." },
  "Vous devez accepter les conditions de licence.": {
    en: "You must accept the license terms.",
    ar: "يجب أن تقبل شروط الترخيص.",
  },
  "Vous devez accepter la politique de confidentialité.": {
    en: "You must accept the privacy policy.",
    ar: "يجب أن تقبل سياسة الخصوصية.",
  },
  "Le nom de l'entreprise est obligatoire pour ce type de client.": {
    en: "Company name is required for this client type.",
    ar: "اسم الشركة مطلوب لنوع العميل هذا.",
  },
  "Cette formule autorise 1 domaine. Choisissez « Multi-domain » pour plusieurs domaines.": {
    en: "This plan allows 1 domain. Choose “Multi-domain” for multiple domains.",
    ar: "تسمح هذه الخطة بنطاق واحد. اختر «Multi-domain» لعدة نطاقات.",
  },
  "Le nom est obligatoire.": { en: "Name is required.", ar: "الاسم مطلوب." },
  "Référence trop longue.": { en: "Reference too long.", ar: "المرجع طويل جدا." },
  "Décrivez le problème en 10 caractères minimum.": {
    en: "Describe the problem in at least 10 characters.",
    ar: "صف المشكلة في 10 أحرف على الأقل.",
  },
  "Description trop longue (5 000 caractères maximum).": {
    en: "Description too long (5,000 characters maximum).",
    ar: "الوصف طويل جدا (5000 حرف كحد أقصى).",
  },
  "Pièce jointe trop lourde (5 Mo maximum). Envoyez-la par courriel.": {
    en: "Attachment too large (5 MB maximum). Please send it by email.",
    ar: "المرفق كبير جدا (5 ميغابايت كحد أقصى). أرسله عبر البريد الإلكتروني.",
  },
  "Le sujet est obligatoire.": { en: "Subject is required.", ar: "الموضوع مطلوب." },
  "Votre message doit contenir au moins 10 caractères.": {
    en: "Your message must contain at least 10 characters.",
    ar: "يجب أن تحتوي رسالتك على 10 أحرف على الأقل.",
  },
  "Message trop long (5 000 caractères maximum).": {
    en: "Message too long (5,000 characters maximum).",
    ar: "الرسالة طويلة جدا (5000 حرف كحد أقصى).",
  },
  "Le montant est obligatoire.": { en: "Amount is required.", ar: "المبلغ مطلوب." },
  "Le montant doit être un nombre entier (USD).": {
    en: "Amount must be a whole number (USD).",
    ar: "يجب أن يكون المبلغ عددا صحيحا (بالدولار الأمريكي).",
  },
  "Le montant doit être positif.": { en: "Amount must be positive.", ar: "يجب أن يكون المبلغ موجبا." },
  "Le montant ne correspond pas au tarif de la formule choisie.": {
    en: "Amount does not match the price of the chosen plan.",
    ar: "المبلغ لا يطابق سعر الخطة المختارة.",
  },
  "Identifiant de commande PayPal invalide.": { en: "Invalid PayPal order ID.", ar: "معرف طلب PayPal غير صالح." },
};

/** Traduit un message de validation zod connu ; sinon, le renvoie tel quel. */
export function translateValidationMessage(message: string | undefined, lang: Language): string | undefined {
  if (message === undefined) return undefined;
  if (lang === "fr") return message;
  return VALIDATION_MESSAGES[message]?.[lang] ?? message;
}

type FieldErrorLike = { message?: string } | undefined;

/** Même traduction, appliquée à l'objet erreur de react-hook-form. */
export function fieldError(error: FieldErrorLike, lang: Language): FieldErrorLike {
  if (!error || error.message === undefined) return error;
  return { message: translateValidationMessage(error.message, lang) };
}

// ─── Codes d'erreur stables des API (shared/api-helpers.ts) ─────────────────

const API_ERROR_MESSAGES: MsgMap = {
  SERVICE_NOT_CONFIGURED: {
    en: "Service not configured. No request was processed: configure the project environment variables and try again.",
    ar: "الخدمة غير مهيأة. لم تتم معالجة أي طلب: قم بتهيئة متغيرات بيئة المشروع ثم حاول مجددا.",
  },
  INVALID_INPUT: {
    en: "Some fields are invalid. Please check the form and try again.",
    ar: "بعض الحقول غير صالحة. يرجى التحقق من النموذج والمحاولة مجددا.",
  },
  METHOD_NOT_ALLOWED: {
    en: "Method not allowed: use POST.",
    ar: "الطريقة غير مسموح بها: استخدم POST.",
  },
  EMAIL_SEND_FAILED: {
    en: "Your request could not be sent. Please try again or email contact@benniscom.com.",
    ar: "تعذر إرسال طلبك. حاول مجددا أو راسلنا عبر contact@benniscom.com.",
  },
  PAYMENT_CONFIG_INVALID: {
    en: "Payment configuration is invalid. Please contact us.",
    ar: "تهيئة الدفع غير صالحة. يرجى الاتصال بنا.",
  },
  PAYMENT_UPSTREAM_ERROR: {
    en: "The payment service did not respond. Please try again later.",
    ar: "لم تستجب خدمة الدفع. حاول لاحقا.",
  },
  PAYMENT_URL_MISSING: {
    en: "The payment service did not return a redirect URL.",
    ar: "لم ترجع خدمة الدفع رابط تحويل.",
  },
  PAYMENT_SESSION_FAILED: {
    en: "Payment could not be started. Please try again later.",
    ar: "تعذر بدء الدفع. حاول لاحقا.",
  },
  INVALID_SIGNATURE: {
    en: "Invalid signature.",
    ar: "التوقيع غير صالح.",
  },
  MISSING_SIGNATURE: {
    en: "Missing signature.",
    ar: "التوقيع مفقود.",
  },
};

/**
 * Message affiché pour une erreur API : la traduction du code stable quand
 * il est connu, sinon le message brut du serveur (appoint).
 */
export function translateApiError(code: string | undefined, serverMessage: string | undefined, lang: Language): string {
  if (code && lang !== "fr") {
    const known = API_ERROR_MESSAGES[code]?.[lang];
    if (known) return known;
  }
  if (serverMessage) return serverMessage;
  if (code && lang === "fr") return serverMessage ?? code;
  return lang === "en" ? "An error occurred." : lang === "ar" ? "حدث خطأ." : "Une erreur est survenue.";
}

// ─── Messages de succès des API (réponses 200, en français côté serveur) ────

const SUCCESS_MESSAGES: MsgMap = {
  "Demande de licence transmise. Vous recevrez une réponse à l'adresse indiquée.": {
    en: "License request sent. You will receive a reply at the address provided.",
    ar: "تم إرسال طلب الترخيص. ستصلك الإجابة على العنوان المقدم.",
  },
  "Ticket de support transmis. Vous recevrez une réponse à l'adresse indiquée.": {
    en: "Support ticket sent. You will receive a reply at the address provided.",
    ar: "تم إرسال طلب الدعم. ستصلك الإجابة على العنوان المقدم.",
  },
  "Demande transmise. Vous recevrez une réponse à l'adresse indiquée.": {
    en: "Request sent. You will receive a reply at the address provided.",
    ar: "تم إرسال الطلب. ستصلك الإجابة على العنوان المقدم.",
  },
};

/** Traduit un message de succès serveur connu ; sinon, le renvoie tel quel. */
export function translateSuccessMessage(message: string | undefined, lang: Language): string | undefined {
  if (message === undefined) return undefined;
  if (lang === "fr") return message;
  return SUCCESS_MESSAGES[message]?.[lang] ?? message;
}

// ─── Messages dynamiques du formulaire de support (pièce jointe) ────────────

export function fileTooLargeMessage(sizeMb: string, maxMb: number, lang: Language): string {
  if (lang === "en")
    return `This file is ${sizeMb} MB — the limit is ${maxMb} MB. Please send it by email to contact@benniscom.com, mentioning your name.`;
  if (lang === "ar")
    return `حجم هذا الملف ${sizeMb} ميغابايت — والحد الأقصى هو ${maxMb} ميغابايت. أرسله عبر البريد الإلكتروني إلى contact@benniscom.com مع ذكر اسمك.`;
  return `Ce fichier fait ${sizeMb} Mo — la limite est de ${maxMb} Mo. Envoyez-le par courriel à contact@benniscom.com en indiquant votre nom.`;
}

export function attachmentTooLargeMessage(maxMb: number, lang: Language): string {
  if (lang === "en")
    return `The attachment exceeds ${maxMb} MB. Please send it by email to contact@benniscom.com, mentioning your name.`;
  if (lang === "ar")
    return `المرفق يتجاوز ${maxMb} ميغابايت. أرسله عبر البريد الإلكتروني إلى contact@benniscom.com مع ذكر اسمك.`;
  return `La pièce jointe dépasse ${maxMb} Mo. Envoyez-la par courriel à contact@benniscom.com en indiquant votre nom.`;
}

export function fileReadErrorMessage(lang: Language): string {
  if (lang === "en") return "Could not read the attachment. Please try again or send it by email.";
  if (lang === "ar") return "تعذر قراءة المرفق. حاول مجددا أو أرسله عبر البريد الإلكتروني.";
  return "Lecture de la pièce jointe impossible. Réessayez ou envoyez-la par courriel.";
}
