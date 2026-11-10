// I18n partagé du site (Lot 4 — Traductions FR + EN + AR).
//
// Modèle suivi : celui de Home.tsx — objet de traductions par langue
// ("fr" | "en" | "ar"), `documentElement.lang` + `documentElement.dir`
// (RTL pour l'arabe) et attribut `dir` sur le conteneur de la page.
// Les noms propres (DepXpreS, Benniscom, Stripe, PayPal, Independent /
// Assisted / Multi-domain) et les URL ne sont jamais traduits.

import { useEffect, useState } from "react";

export type Language = "fr" | "en" | "ar";

export const LANGUAGES: Language[] = ["fr", "en", "ar"];

/**
 * Langue de la page, avec gestion du `dir` RTL (arabe).
 * Même comportement que Home.tsx : français par défaut, sans persistance.
 */
export function useSiteLanguage(initial: Language = "fr"): [Language, (lang: Language) => void] {
  const [lang, setLang] = useState<Language>(initial);
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);
  return [lang, setLang];
}

/** Les 13 rubriques de navigation, dans l'ordre du menu (cf. Home.tsx). */
export const NAV_ROUTES = [
  "/",
  "/platform",
  "/applications",
  "/fonctionnement",
  "/modules",
  "/technology-security",
  "/licenses",
  "/purchase",
  "/installation",
  "/faq",
  "/support",
  "/contact",
  "/about",
] as const;

export const NAV_LABELS: Record<Language, string[]> = {
  fr: [
    "Accueil",
    "Plateforme",
    "Applications",
    "Fonctionnement",
    "Modules",
    "Architecture",
    "Tarification",
    "Acheter",
    "Installation",
    "FAQ",
    "Assistance",
    "Contact",
    "À propos",
  ],
  en: [
    "Home",
    "Platform",
    "Applications",
    "How it works",
    "Modules",
    "Architecture",
    "Pricing",
    "Buy",
    "Installation",
    "FAQ",
    "Support",
    "Contact",
    "About",
  ],
  ar: [
    "الرئيسية",
    "المنصة",
    "التطبيقات",
    "كيف يعمل",
    "الوحدات",
    "البنية",
    "الأسعار",
    "شراء",
    "التثبيت",
    "الأسئلة الشائعة",
    "الدعم",
    "اتصل بنا",
    "من نحن",
  ],
};

export type FooterLabels = {
  contact: string;
  support: string;
  privacy: string;
  terms: string;
  license: string;
  refund: string;
  cookies: string;
  security: string;
  ip: string;
  supportTerms: string;
  adminCommercial: string;
  licenseNote: string;
  explore: string;
  connect: string;
  legal: string;
  systemConcept: string;
  termsOfSale: string;
  licenseContract: string;
};

/** Libellés du pied de page (liens juridiques + note de licence). */
export const FOOTER_LABELS: Record<Language, FooterLabels> = {
  fr: {
    contact: "Contact",
    support: "Support",
    privacy: "Privacy",
    terms: "Terms",
    license: "License agreement",
    refund: "Remboursement",
    cookies: "Cookies",
    security: "Sécurité",
    ip: "Propriété intellectuelle",
    supportTerms: "Conditions du support",
    adminCommercial: "Admin commercial",
    licenseNote: "Licence indépendante · Code source inclus",
    explore: "Explore",
    connect: "Connect",
    legal: "Légal",
    systemConcept: "System concept / v1.0",
    termsOfSale: "Conditions de vente",
    licenseContract: "Contrat de licence",
  },
  en: {
    contact: "Contact",
    support: "Support",
    privacy: "Privacy",
    terms: "Terms",
    license: "License agreement",
    refund: "Refund",
    cookies: "Cookies",
    security: "Security",
    ip: "Intellectual property",
    supportTerms: "Support terms",
    adminCommercial: "Commercial admin",
    licenseNote: "Independent license · Source code included",
    explore: "Explore",
    connect: "Connect",
    legal: "Legal",
    systemConcept: "System concept / v1.0",
    termsOfSale: "Terms of sale",
    licenseContract: "License agreement",
  },
  ar: {
    contact: "اتصل بنا",
    support: "الدعم",
    privacy: "الخصوصية",
    terms: "الشروط",
    license: "اتفاقية الترخيص",
    refund: "الاسترداد",
    cookies: "ملفات تعريف الارتباط",
    security: "الأمان",
    ip: "الملكية الفكرية",
    supportTerms: "شروط الدعم",
    adminCommercial: "الإدارة التجارية",
    licenseNote: "ترخيص مستقل · الكود المصدري مشمول",
    explore: "استكشاف",
    connect: "تواصل",
    legal: "قانوني",
    systemConcept: "مفهوم النظام / الإصدار 1.0",
    termsOfSale: "شروط البيع",
    licenseContract: "عقد الترخيص",
  },
};

export type CommonLabels = {
  language: string;
  contactSpecialist: string;
  backHome: string;
  backToApps: string;
  readyTitle: string;
  seeDemo: string;
  detailLink: string;
  seeWorkflow: string;
  seeHowItWorks: string;
  mostChosen: string;
  chooseLicense: string;
  selected: string;
  demoBadge: string;
};

/** Libellés communs aux pages d'information, juridiques et par application. */
export const COMMON: Record<Language, CommonLabels> = {
  fr: {
    language: "Langue",
    contactSpecialist: "Parler à un spécialiste",
    backHome: "Retour à l'accueil",
    backToApps: "Retour aux applications",
    readyTitle: "Prêt à définir votre déploiement ?",
    seeDemo: "Voir la démo",
    detailLink: "Fiche détaillée",
    seeWorkflow: "Voir le workflow",
    seeHowItWorks: "Voir le fonctionnement",
    mostChosen: "La plus choisie",
    chooseLicense: "Choisir cette licence",
    selected: "Sélectionnée",
    demoBadge: "DÉMO",
  },
  en: {
    language: "Language",
    contactSpecialist: "Talk to a specialist",
    backHome: "Back to home",
    backToApps: "Back to applications",
    readyTitle: "Ready to define your deployment?",
    seeDemo: "View the demo",
    detailLink: "Detailed overview",
    seeWorkflow: "View the workflow",
    seeHowItWorks: "How it works",
    mostChosen: "Most popular",
    chooseLicense: "Choose this license",
    selected: "Selected",
    demoBadge: "DEMO",
  },
  ar: {
    language: "اللغة",
    contactSpecialist: "تحدث مع متخصص",
    backHome: "العودة إلى الصفحة الرئيسية",
    backToApps: "العودة إلى التطبيقات",
    readyTitle: "هل أنت مستعد لتحديد نشرك؟",
    seeDemo: "عرض النسخة التجريبية",
    detailLink: "نظرة مفصلة",
    seeWorkflow: "عرض سير العمل",
    seeHowItWorks: "عرض كيفية العمل",
    mostChosen: "الأكثر اختيارا",
    chooseLicense: "اختر هذا الترخيص",
    selected: "مختارة",
    demoBadge: "عرض",
  },
};
