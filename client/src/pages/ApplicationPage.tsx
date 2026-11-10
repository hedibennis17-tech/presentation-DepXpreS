// Fiches par application — 4 pages, trilingues FR / EN / AR (Lot 4).
// Modèle i18n : celui de Home.tsx — objet de traductions par langue,
// `documentElement.dir` + attribut `dir` (RTL pour l'arabe), sélecteur
// de langue. Workflows complets repris de InfoPage (versions trilingues).

import { Link } from "wouter";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Check,
  Gauge,
  Menu,
  Radar,
  Store,
  Truck,
  UsersRound,
  X,
} from "lucide-react";
import { useState } from "react";
import {
  workflowAdminI18n,
  workflowChauffeurI18n,
  workflowClientI18n,
  workflowEntrepriseI18n,
  workflowRideshareI18n,
} from "./InfoPage";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { COMMON, FOOTER_LABELS, NAV_LABELS, NAV_ROUTES, useSiteLanguage, type Language } from "@/lib/i18n";

export type AppKey = "client" | "chauffeur" | "commerce" | "admin";

type AppData = {
  eyebrow: string;
  title: string;
  intro: string;
  icon: typeof ArrowRight;
  accent: string;
  demoUrl: string;
  demoLabel: string;
  users: string;
  functions: string[];
  advantages: string[];
  workflow: string[];
  workflowTitle: string;
  workflowNote: string;
};

function LogoMark() {
  return <span className="logo-mark" aria-hidden="true"><span /><span /><span /></span>;
}

// ─── Données — français (langue source) ──────────────────────────────────────
const appDataFr: Record<AppKey, AppData> = {
  client: {
    eyebrow: "DEPXPRES / APPLICATION CLIENT",
    title: "L'application que vos utilisateurs téléchargent.",
    intro:
      "L'application Client est le point d'entrée de vos utilisateurs finaux : elle couvre la commande de livraison et la réservation de course, le paiement, le suivi en temps réel et l'historique — depuis une seule interface.",
    icon: UsersRound,
    accent: "cyan",
    demoUrl: "https://depxpres.vercel.app/client",
    demoLabel: "Ouvrir la démo Client",
    users: "Utilisateurs : toute personne qui commande une livraison ou réserve une course dans votre zone de service.",
    functions: [
      "Création de compte et authentification",
      "Recherche de services, commerces et produits par nom ou catégorie",
      "Consultation des prix, détails, variantes et disponibilités",
      "Panier, quantités, adresse et mode de livraison",
      "Paiement (Stripe ou PayPal, selon la configuration de l'opérateur)",
      "Réservation de course : départ, destination, estimation si le module est disponible",
      "Suivi GPS du chauffeur et de la livraison en temps réel",
      "Réception, reçu, historique des commandes et des courses",
    ],
    advantages: [
      "Une seule application pour la livraison et le transport",
      "Suivi visible à chaque étape, sans appel téléphonique",
      "Historique complet des commandes et des courses",
      "Déployée sous votre marque, sur votre domaine",
    ],
    workflow: [...workflowClientI18n.fr, ...workflowRideshareI18n.fr],
    workflowTitle: "Workflow complet — livraison et course",
    workflowNote:
      "Les quatorze premières étapes décrivent la commande de livraison ; les dix suivantes décrivent la réservation de course. Les deux parcours partagent le même compte, la même adresse et le même historique.",
  },
  chauffeur: {
    eyebrow: "DEPXPRES / APPLICATION CHAUFFEUR",
    title: "Chaque mission, au bon moment.",
    intro:
      "L'application Chauffeur gère l'intégralité du cycle opérationnel : inscription et vérification des documents, disponibilité, réception des missions, navigation GPS, preuve de service et tableau des revenus.",
    icon: Truck,
    accent: "cyan",
    demoUrl: "https://depxpres.vercel.app/driver/login",
    demoLabel: "Ouvrir la démo Chauffeur",
    users: "Utilisateurs : chauffeurs et livreurs qui exécutent les missions de votre réseau, après validation de leur profil par l'administration.",
    functions: [
      "Inscription, profil et informations du véhicule",
      "Téléversement des documents requis (permis, assurance, immatriculation)",
      "Passage en mode disponible et transmission de la position GPS selon les autorisations",
      "Réception des missions compatibles avec la zone et la disponibilité",
      "Consultation des détails : distance, type, destination",
      "Acceptation ou refus selon les règles de la plateforme",
      "Navigation GPS vers le point de collecte ou de départ",
      "Confirmation de prise en charge et de fin de mission, preuve de service",
      "Gestion des incidents et tableau des revenus",
    ],
    advantages: [
      "Missions compatibles avec la zone et la disponibilité du chauffeur",
      "Preuve de service horodatée à chaque mission",
      "Revenus et historique mis à jour automatiquement",
      "Incidents signalés directement dans l'application",
    ],
    workflow: workflowChauffeurI18n.fr,
    workflowTitle: "Workflow complet — de l'inscription à la clôture",
    workflowNote:
      "Le chauffeur n'est activé qu'après vérification de ses documents par l'administration. Chaque mission suit ensuite le même circuit : réception, acceptation, navigation, prise en charge, transport, confirmation.",
  },
  commerce: {
    eyebrow: "DEPXPRES / APPLICATION ENTREPRISE",
    title: "Votre commerce, en mouvement.",
    intro:
      "L'interface Entreprise (Partenaire) est dédiée aux commerces et restaurants : catalogue, stocks, réception des commandes en temps réel, statuts de préparation et coordination avec le chauffeur.",
    icon: Store,
    accent: "cyan",
    demoUrl: "https://depxpres.vercel.app/store",
    demoLabel: "Ouvrir la démo Commerce",
    users: "Utilisateurs : commerces, restaurants et entreprises partenaires, avec une ou plusieurs succursales, validés par l'administration.",
    functions: [
      "Création du compte professionnel et enregistrement des succursales",
      "Transmission des documents requis pour validation",
      "Configuration des horaires d'ouverture et des zones de livraison",
      "Création des catégories et des produits : images, prix, descriptions, variantes",
      "Configuration des options, disponibilités et stocks",
      "Réception des commandes en temps réel",
      "Acceptation ou refus selon les capacités",
      "Préparation, changements de statut et remise au chauffeur",
      "Consultation des ventes, historiques et rapports",
    ],
    advantages: [
      "Catalogue complet, gérable sans compétence technique",
      "Commandes reçues en temps réel, avec acceptation ou refus",
      "Coordination directe avec le chauffeur pour la livraison",
      "Ventes et rapports consultables à tout moment",
    ],
    workflow: workflowEntrepriseI18n.fr,
    workflowTitle: "Workflow complet — de l'inscription à la vente",
    workflowNote:
      "Le compte partenaire n'est activé qu'après validation par l'administration. Le catalogue peut ensuite être publié, puis chaque commande suit le circuit : réception, acceptation, préparation, remise au chauffeur, livraison.",
  },
  admin: {
    eyebrow: "DEPXPRES / APPLICATION ADMINISTRATION",
    title: "Le centre de contrôle de votre réseau.",
    intro:
      "L'interface Administration supervise l'ensemble des opérations : comptes, dispatching, zones, commandes, courses, paiements, notifications, licences et configuration système — depuis un seul centre de contrôle.",
    icon: Radar,
    accent: "cyan",
    demoUrl: "https://depxpres.vercel.app/admin",
    demoLabel: "Ouvrir la démo Admin",
    users: "Utilisateurs : administrateurs et opérateurs du réseau, avec des permissions définies par rôle.",
    functions: [
      "Supervision du tableau de bord et des opérations en cours",
      "Gestion des utilisateurs : clients, chauffeurs, entreprises et administrateurs",
      "Vérification des profils et des documents d'inscription",
      "Configuration des zones géographiques et des règles de service",
      "Dispatching : affectation des missions et suivi des chauffeurs en temps réel",
      "Suivi des commandes et des courses : statuts, retards, incidents",
      "Suivi des transactions et des paiements",
      "Gestion des licences, des codes d'activation et des domaines autorisés",
      "Rapports, indicateurs et configuration système",
    ],
    advantages: [
      "Vision commune des comptes, zones, commandes et missions",
      "Dispatching et supervision en temps réel",
      "Permissions par rôle et journal des actions sensibles",
      "Licences et domaines gérés depuis le même écran",
    ],
    workflow: workflowAdminI18n.fr,
    workflowTitle: "Workflow complet — supervision de bout en bout",
    workflowNote:
      "L'administration n'exécute pas les missions : elle les supervise, les affecte et les contrôle. Chaque action sensible est journalisée et chaque rôle reste isolé de celui des autres.",
  },
};

// ─── Données — English ───────────────────────────────────────────────────────
const appDataEn: Record<AppKey, AppData> = {
  client: {
    eyebrow: "DEPXPRES / CUSTOMER APP",
    title: "The app your users download.",
    intro:
      "The Customer app is the entry point for your end users: it covers delivery ordering and ride booking, payment, real-time tracking, and history — from a single interface.",
    icon: UsersRound,
    accent: "cyan",
    demoUrl: "https://depxpres.vercel.app/client",
    demoLabel: "Open the Customer demo",
    users: "Users: anyone who orders a delivery or books a ride in your service area.",
    functions: [
      "Account creation and sign-in",
      "Search for services, businesses, and products by name or category",
      "View prices, details, variants, and availability",
      "Cart, quantities, address, and delivery method",
      "Payment (Stripe or PayPal, depending on the operator's configuration)",
      "Ride booking: pickup, destination, estimate if the module is available",
      "GPS tracking of the driver and delivery in real time",
      "Receipt, confirmation, order and ride history",
    ],
    advantages: [
      "One app for delivery and transport",
      "Tracking visible at every step, with no phone call",
      "Complete order and ride history",
      "Deployed under your brand, on your domain",
    ],
    workflow: [...workflowClientI18n.en, ...workflowRideshareI18n.en],
    workflowTitle: "Full workflow — delivery and ride",
    workflowNote:
      "The first fourteen steps describe the delivery order; the next ten describe the ride booking. Both journeys share the same account, address, and history.",
  },
  chauffeur: {
    eyebrow: "DEPXPRES / DRIVER APP",
    title: "Every mission, right on time.",
    intro:
      "The Driver app manages the entire operational cycle: sign-up and document verification, availability, mission reception, GPS navigation, proof of service, and the earnings dashboard.",
    icon: Truck,
    accent: "cyan",
    demoUrl: "https://depxpres.vercel.app/driver/login",
    demoLabel: "Open the Driver demo",
    users: "Users: drivers and couriers who carry out your network's missions, after their profile is validated by the administration.",
    functions: [
      "Sign-up, profile, and vehicle information",
      "Upload of required documents (license, insurance, registration)",
      "Go online and share GPS position according to permissions",
      "Receive missions matching the zone and availability",
      "View details: distance, type, destination",
      "Accept or decline according to platform rules",
      "GPS navigation to the pickup or departure point",
      "Confirm pickup and mission end, proof of service",
      "Incident management and earnings dashboard",
    ],
    advantages: [
      "Missions matched to the driver's zone and availability",
      "Timestamped proof of service for every mission",
      "Earnings and history updated automatically",
      "Incidents reported directly in the app",
    ],
    workflow: workflowChauffeurI18n.en,
    workflowTitle: "Full workflow — from sign-up to closing",
    workflowNote:
      "A driver is activated only after the administration verifies their documents. Each mission then follows the same circuit: reception, acceptance, navigation, pickup, transport, confirmation.",
  },
  commerce: {
    eyebrow: "DEPXPRES / BUSINESS APP",
    title: "Your business, in motion.",
    intro:
      "The Business (Partner) interface is for merchants and restaurants: catalog, inventory, real-time order reception, preparation statuses, and coordination with the driver.",
    icon: Store,
    accent: "cyan",
    demoUrl: "https://depxpres.vercel.app/store",
    demoLabel: "Open the Business demo",
    users: "Users: partner merchants, restaurants, and businesses, with one or more branches, validated by the administration.",
    functions: [
      "Business account creation and branch registration",
      "Submission of required documents for validation",
      "Opening hours and delivery zone configuration",
      "Category and product creation: images, prices, descriptions, variants",
      "Options, availability, and inventory configuration",
      "Real-time order reception",
      "Accept or decline according to capacity",
      "Preparation, status changes, and handover to the driver",
      "Sales, history, and report review",
    ],
    advantages: [
      "Complete catalog, manageable with no technical skill",
      "Orders received in real time, with accept or decline",
      "Direct coordination with the driver for delivery",
      "Sales and reports available at any time",
    ],
    workflow: workflowEntrepriseI18n.en,
    workflowTitle: "Full workflow — from sign-up to sale",
    workflowNote:
      "The partner account is activated only after validation by the administration. The catalog can then be published, and each order follows the circuit: reception, acceptance, preparation, handover to the driver, delivery.",
  },
  admin: {
    eyebrow: "DEPXPRES / ADMINISTRATION APP",
    title: "Your network's control center.",
    intro:
      "The Administration interface supervises all operations: accounts, dispatching, zones, orders, rides, payments, notifications, licenses, and system configuration — from a single control center.",
    icon: Radar,
    accent: "cyan",
    demoUrl: "https://depxpres.vercel.app/admin",
    demoLabel: "Open the Admin demo",
    users: "Users: network administrators and operators, with role-based permissions.",
    functions: [
      "Dashboard and ongoing operations supervision",
      "User management: customers, drivers, businesses, and administrators",
      "Verification of registration profiles and documents",
      "Geographic zone and service rule configuration",
      "Dispatching: mission assignment and real-time driver tracking",
      "Order and ride tracking: statuses, delays, incidents",
      "Transaction and payment tracking",
      "License, activation code, and authorized domain management",
      "Reports, indicators, and system configuration",
    ],
    advantages: [
      "Shared view of accounts, zones, orders, and missions",
      "Real-time dispatching and supervision",
      "Role-based permissions and audit log of sensitive actions",
      "Licenses and domains managed from the same screen",
    ],
    workflow: workflowAdminI18n.en,
    workflowTitle: "Full workflow — end-to-end supervision",
    workflowNote:
      "The administration does not execute missions: it supervises, assigns, and controls them. Every sensitive action is logged and each role stays isolated from the others.",
  },
};

// ─── Données — العربية ───────────────────────────────────────────────────────
const appDataAr: Record<AppKey, AppData> = {
  client: {
    eyebrow: "DEPXPRES / تطبيق العميل",
    title: "التطبيق الذي ينزله مستخدموك.",
    intro:
      "تطبيق العميل هو نقطة دخول مستخدميك النهائيين: يغطي طلب التوصيل وحجز الرحلات والدفع والتتبع في الوقت الحقيقي والسجل — من واجهة واحدة.",
    icon: UsersRound,
    accent: "cyan",
    demoUrl: "https://depxpres.vercel.app/client",
    demoLabel: "فتح النسخة التجريبية للعميل",
    users: "المستخدمون: كل من يطلب توصيلا أو يحجز رحلة في منطقة خدمتك.",
    functions: [
      "إنشاء حساب وتسجيل الدخول",
      "البحث عن الخدمات والمتاجر والمنتجات بالاسم أو الفئة",
      "عرض الأسعار والتفاصيل والخيارات والتوفر",
      "السلة والكميات والعنوان وطريقة التوصيل",
      "الدفع (Stripe أو PayPal حسب تهيئة المشغل)",
      "حجز الرحلات: الانطلاق والوجهة والتقدير إذا كانت الوحدة متاحة",
      "تتبع السائق والتوصيل عبر GPS في الوقت الحقيقي",
      "الاستلام والإيصال وسجل الطلبات والرحلات",
    ],
    advantages: [
      "تطبيق واحد للتوصيل والنقل",
      "تتبع مرئي في كل خطوة دون مكالمة هاتفية",
      "سجل كامل للطلبات والرحلات",
      "منشور تحت علامتك وعلى نطاقك",
    ],
    workflow: [...workflowClientI18n.ar, ...workflowRideshareI18n.ar],
    workflowTitle: "سير العمل الكامل — التوصيل والرحلة",
    workflowNote:
      "الخطوات الأربع عشرة الأولى تصف طلب التوصيل؛ والخطوات العشر التالية تصف حجز الرحلة. المساران يشتركان في الحساب والعنوان والسجل نفسه.",
  },
  chauffeur: {
    eyebrow: "DEPXPRES / تطبيق السائق",
    title: "كل مهمة في وقتها.",
    intro:
      "يدير تطبيق السائق الدورة التشغيلية كاملة: التسجيل والتحقق من المستندات والتوفر واستلام المهام والملاحة عبر GPS وإثبات الخدمة ولوحة الأرباح.",
    icon: Truck,
    accent: "cyan",
    demoUrl: "https://depxpres.vercel.app/driver/login",
    demoLabel: "فتح النسخة التجريبية للسائق",
    users: "المستخدمون: السائقون وسعاة التوصيل الذين ينفذون مهام شبكتك، بعد اعتماد ملفهم من طرف الإدارة.",
    functions: [
      "التسجيل والملف الشخصي ومعلومات المركبة",
      "رفع المستندات المطلوبة (الرخصة والتأمين والتسجيل)",
      "التحول إلى وضع متاح وإرسال موقع GPS حسب الأذونات",
      "استلام مهام مطابقة للمنطقة والتوفر",
      "عرض التفاصيل: المسافة والنوع والوجهة",
      "القبول أو الرفض حسب قواعد المنصة",
      "الملاحة عبر GPS إلى نقطة الاستلام أو الانطلاق",
      "تأكيد الاستلام وانتهاء المهمة وإثبات الخدمة",
      "إدارة الحوادث ولوحة الأرباح",
    ],
    advantages: [
      "مهام مطابقة لمنطقة السائق وتوفره",
      "إثبات خدمة مختوم بالوقت لكل مهمة",
      "الأرباح والسجل يحدثان تلقائيا",
      "الحوادث تبلغ مباشرة في التطبيق",
    ],
    workflow: workflowChauffeurI18n.ar,
    workflowTitle: "سير العمل الكامل — من التسجيل إلى الإغلاق",
    workflowNote:
      "لا يفعل السائق إلا بعد تحقق الإدارة من مستنداته. ثم تتبع كل مهمة المسار نفسه: الاستلام والقبول والملاحة والاستلام لدى العميل والنقل والتأكيد.",
  },
  commerce: {
    eyebrow: "DEPXPRES / تطبيق الشركة",
    title: "تجارتك تتحرك.",
    intro:
      "واجهة الشركة (الشريك) مخصصة للمتاجر والمطاعم: الكتالوج والمخزون واستلام الطلبات في الوقت الحقيقي وحالات التحضير والتنسيق مع السائق.",
    icon: Store,
    accent: "cyan",
    demoUrl: "https://depxpres.vercel.app/store",
    demoLabel: "فتح النسخة التجريبية للمتجر",
    users: "المستخدمون: المتاجر والمطاعم والشركات الشريكة، بفرع أو أكثر، والمعتمدة من طرف الإدارة.",
    functions: [
      "إنشاء الحساب المهني وتسجيل الفروع",
      "تقديم المستندات المطلوبة للتحقق",
      "ضبط ساعات العمل ومناطق التوصيل",
      "إنشاء الفئات والمنتجات: الصور والأسعار والأوصاف والخيارات",
      "ضبط الخيارات والتوفر والمخزون",
      "استلام الطلبات في الوقت الحقيقي",
      "القبول أو الرفض حسب القدرة",
      "التحضير وتغيير الحالات والتسليم للسائق",
      "مراجعة المبيعات والسجل والتقارير",
    ],
    advantages: [
      "كتالوج كامل يمكن إدارته دون مهارة تقنية",
      "طلبات تصل في الوقت الحقيقي مع القبول أو الرفض",
      "تنسيق مباشر مع السائق للتوصيل",
      "المبيعات والتقارير متاحة في أي وقت",
    ],
    workflow: workflowEntrepriseI18n.ar,
    workflowTitle: "سير العمل الكامل — من التسجيل إلى البيع",
    workflowNote:
      "لا يفعل حساب الشريك إلا بعد اعتماد الإدارة. ثم يمكن نشر الكتالوج، ويتبع كل طلب المسار: الاستلام والقبول والتحضير والتسليم للسائق والتوصيل.",
  },
  admin: {
    eyebrow: "DEPXPRES / تطبيق الإدارة",
    title: "مركز التحكم في شبكتك.",
    intro:
      "تشرف واجهة الإدارة على كل العمليات: الحسابات والتوزيع والمناطق والطلبات والرحلات والمدفوعات والتنبيهات والتراخيص وإعدادات النظام — من مركز تحكم واحد.",
    icon: Radar,
    accent: "cyan",
    demoUrl: "https://depxpres.vercel.app/admin",
    demoLabel: "فتح النسخة التجريبية للإدارة",
    users: "المستخدمون: مديرو الشبكة ومشغلوها، بصلاحيات محددة حسب الدور.",
    functions: [
      "الإشراف على لوحة التحكم والعمليات الجارية",
      "إدارة المستخدمين: العملاء والسائقون والشركات والإداريون",
      "التحقق من الملفات ومستندات التسجيل",
      "ضبط المناطق الجغرافية وقواعد الخدمة",
      "التوزيع: تعيين المهام وتتبع السائقين في الوقت الحقيقي",
      "تتبع الطلبات والرحلات: الحالات والتأخيرات والحوادث",
      "تتبع المعاملات والمدفوعات",
      "إدارة التراخيص ورموز التفعيل والنطاقات المصرح بها",
      "التقارير والمؤشرات وإعدادات النظام",
    ],
    advantages: [
      "رؤية مشتركة للحسابات والمناطق والطلبات والمهام",
      "توزيع وإشراف في الوقت الحقيقي",
      "صلاحيات حسب الدور وسجل الإجراءات الحساسة",
      "التراخيص والنطاقات تدار من الشاشة نفسها",
    ],
    workflow: workflowAdminI18n.ar,
    workflowTitle: "سير العمل الكامل — إشراف شامل",
    workflowNote:
      "الإدارة لا تنفذ المهام: تشرف عليها وتعينها وتراقبها. كل إجراء حساس يسجل، ويبقى كل دور معزولا عن غيره.",
  },
};

const appData: Record<Language, Record<AppKey, AppData>> = {
  fr: appDataFr,
  en: appDataEn,
  ar: appDataAr,
};

const appSectionLabelsI18n: Record<Language, { forWhom: string; functions: string; advantages: string; heroLabel: string }> = {
  fr: { forWhom: "Pour qui ?", functions: "Fonctions principales", advantages: "Avantages", heroLabel: "APPLICATION" },
  en: { forWhom: "For whom?", functions: "Main features", advantages: "Benefits", heroLabel: "APPLICATION" },
  ar: { forWhom: "لمن؟", functions: "الوظائف الرئيسية", advantages: "المزايا", heroLabel: "التطبيق" },
};

export default function ApplicationPage({ app }: { app: AppKey }) {
  const [lang, setLang] = useSiteLanguage("fr");
  const data = appData[lang][app];
  const Icon = data.icon;
  const t = COMMON[lang];
  const footer = FOOTER_LABELS[lang];
  const nav = NAV_LABELS[lang];
  const labels = appSectionLabelsI18n[lang];
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="info-page" dir={lang === "ar" ? "rtl" : "ltr"}>
      <header className="info-header">
        <Link href="/" className="brand"><LogoMark /><span className="brand-word">DepXpreS<span>.</span></span></Link>
        <nav className={menuOpen ? "info-nav-open" : ""}>
          {NAV_ROUTES.map((href, index) => (
            <Link key={href} href={href} onClick={() => setMenuOpen(false)}>{nav[index]}</Link>
          ))}
        </nav>
        <div className="nav-actions">
          <LanguageSwitcher lang={lang} setLang={setLang} label={t.language} />
          <Link href="/contact" className="info-header-cta">{t.contactSpecialist} <ArrowRight size={14} /></Link>
          <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      <main>
        <section className={`info-hero info-accent-${data.accent}`}>
          <div className="page-width info-hero-grid">
            <div>
              <Link href="/applications" className="back-link"><ArrowLeft size={14} /> {t.backToApps}</Link>
              <div className="eyebrow"><span className="eyebrow-dot" />{data.eyebrow}</div>
              <h1>{data.title}</h1>
              <p>{data.intro}</p>
              <div className="info-app-links">
                <a href={data.demoUrl} target="_blank" rel="noopener">{data.demoLabel} <ArrowRight size={14} /></a>
                <Link href="/fonctionnement">{t.seeHowItWorks} <ArrowRight size={14} /></Link>
              </div>
            </div>
            <div className="info-hero-icon"><Icon size={58} strokeWidth={1.2} /><span>DEPXPRES<br />{labels.heroLabel}</span></div>
          </div>
        </section>

        <section className="page-width info-sections">
          <article className="info-section-card">
            <div className="info-section-trigger">
              <span className="info-section-title">
                <span className="info-section-icon"><UsersRound size={18} /></span>
                <strong>{labels.forWhom}</strong>
              </span>
              <span className="info-section-number">01</span>
            </div>
            <div className="info-section-body"><p>{data.users}</p></div>
          </article>
          <article className="info-section-card">
            <div className="info-section-trigger">
              <span className="info-section-title">
                <span className="info-section-icon"><BadgeCheck size={18} /></span>
                <strong>{labels.functions}</strong>
              </span>
              <span className="info-section-number">02</span>
            </div>
            <div className="info-section-body">
              <ul>{data.functions.map((fn) => <li key={fn}><Check size={15} />{fn}</li>)}</ul>
            </div>
          </article>
          <article className="info-section-card">
            <div className="info-section-trigger">
              <span className="info-section-title">
                <span className="info-section-icon"><Gauge size={18} /></span>
                <strong>{labels.advantages}</strong>
              </span>
              <span className="info-section-number">03</span>
            </div>
            <div className="info-section-body">
              <ul>{data.advantages.map((adv) => <li key={adv}><Check size={15} />{adv}</li>)}</ul>
            </div>
          </article>
          <article className="info-section-card">
            <div className="info-section-trigger">
              <span className="info-section-title">
                <span className="info-section-icon"><Radar size={18} /></span>
                <strong>{data.workflowTitle}</strong>
              </span>
              <span className="info-section-number">04</span>
            </div>
            <div className="info-section-body">
              <p>{data.workflowNote}</p>
              <ul>
                {data.workflow.map((step, index) => (
                  <li key={step}><Check size={15} /><span><strong>{String(index + 1).padStart(2, "0")} — </strong>{step}</span></li>
                ))}
              </ul>
            </div>
          </article>
        </section>

        <section className="page-width info-bottom-cta">
          <div>
            <span className="eyebrow"><span className="eyebrow-dot" />DEPXPRES / NEXT STEP</span>
            <h2>{t.readyTitle}</h2>
          </div>
          <Link href="/contact" className="button-primary">{t.contactSpecialist} <ArrowRight size={16} /></Link>
        </section>
      </main>

      <footer className="site-footer info-footer">
        <div className="page-width footer-bottom">
          <span>© 2026 Benniscom / DepXpreS</span>
          <span>{footer.licenseNote}</span>
          <span className="info-footer-links">
            <Link href="/contact">{footer.contact}</Link>
            {" · "}
            <Link href="/support">{footer.support}</Link>
            {" · "}
            <Link href="/privacy">{footer.privacy}</Link>
            {" · "}
            <Link href="/terms">{footer.terms}</Link>
            {" · "}
            <Link href="/license">{footer.license}</Link>
            {" · "}
            <Link href="/refund">{footer.refund}</Link>
            {" · "}
            <Link href="/cookies">{footer.cookies}</Link>
            {" · "}
            <Link href="/security">{footer.security}</Link>
            {" · "}
            <Link href="/ip">{footer.ip}</Link>
            {" · "}
            <Link href="/support-terms">{footer.supportTerms}</Link>
            {" · "}
            <Link href="/admin-portal">{footer.adminCommercial}</Link>
          </span>
        </div>
      </footer>
    </div>
  );
}
