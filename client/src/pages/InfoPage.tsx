// Page d'information — 12 rubriques, trilingue FR / EN / AR (Lot 4).
// Modèle i18n : celui de Home.tsx — objet de traductions par langue,
// `documentElement.dir` + attribut `dir` (RTL pour l'arabe), sélecteur
// de langue. Noms propres (DepXpreS, Benniscom, Stripe, PayPal,
// Independent / Assisted / Multi-domain) et URL jamais traduits.

import { Link } from "wouter";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Boxes,
  Check,
  ChevronDown,
  CircleHelp,
  Code2,
  CreditCard,
  FileText,
  Globe2,
  Headphones,
  Layers3,
  LifeBuoy,
  Menu,
  LockKeyhole,
  MapPinned,
  PackageCheck,
  Radar,
  ScanLine,
  Send,
  Settings2,
  ShieldCheck,
  Store,
  Truck,
  UsersRound,
  Wrench,
  X,
  Bike,
  Gauge,
  Compass,
  Sparkles,
  Building2,
  ClipboardList,
  Navigation,
  Camera,
  Star,
  RefreshCw,
  Tag,
  UserCheck,
  FileCheck,
  Download,
  Key,
  Zap,
} from "lucide-react";
import { useState } from "react";
import ContactForm from "@/components/forms/ContactForm";
import LicenseRequestForm from "@/components/forms/LicenseRequestForm";
import SupportForm from "@/components/forms/SupportForm";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { COMMON, FOOTER_LABELS, NAV_LABELS, NAV_ROUTES, useSiteLanguage, type Language } from "@/lib/i18n";

export type PageKind =
  | "about"
  | "platform"
  | "applications"
  | "fonctionnement"
  | "modules"
  | "technology"
  | "installation"
  | "licenses"
  | "purchase"
  | "support"
  | "faq"
  | "contact";

type PageData = {
  eyebrow: string;
  title: string;
  intro: string;
  icon: typeof ArrowRight;
  accent: string;
  sections: Array<{ title: string; body: string; bullets?: string[]; icon?: typeof ArrowRight }>;
};

function LogoMark() {
  return <span className="logo-mark" aria-hidden="true"><span /><span /><span /></span>;
}

// ─── Workflows détaillés (trilingues) ────────────────────────────────────────

export const workflowClientI18n: Record<Language, string[]> = {
  fr: [
    "Création du compte et authentification",
    "Autorisation de géolocalisation ou saisie d'adresse",
    "Identification des commerces et services disponibles dans la zone",
    "Recherche par nom, catégorie ou produit",
    "Consultation des prix, détails, variantes et disponibilités",
    "Ajout au panier et modification des quantités",
    "Vérification du panier et confirmation de l'adresse",
    "Sélection du mode de livraison et du paiement",
    "Création et confirmation de la commande",
    "Transmission à l'entreprise partenaire",
    "Préparation et validation côté partenaire",
    "Recherche et affectation d'un chauffeur disponible",
    "Suivi GPS du chauffeur et de la livraison",
    "Confirmation de réception, reçu et mise à jour de l'historique",
  ],
  en: [
    "Create an account and sign in",
    "Allow geolocation or enter an address",
    "Find the businesses and services available in the area",
    "Search by name, category, or product",
    "View prices, details, variants, and availability",
    "Add to cart and adjust quantities",
    "Review the cart and confirm the address",
    "Choose the delivery method and payment",
    "Create and confirm the order",
    "Order sent to the partner business",
    "Preparation and validation by the partner",
    "Find and assign an available driver",
    "GPS tracking of the driver and delivery",
    "Delivery confirmation, receipt, and history update",
  ],
  ar: [
    "إنشاء حساب وتسجيل الدخول",
    "السماح بتحديد الموقع الجغرافي أو إدخال العنوان",
    "تحديد المتاجر والخدمات المتاحة في المنطقة",
    "البحث بالاسم أو الفئة أو المنتج",
    "عرض الأسعار والتفاصيل والخيارات والتوفر",
    "الإضافة إلى السلة وتعديل الكميات",
    "مراجعة السلة وتأكيد العنوان",
    "اختيار طريقة التوصيل والدفع",
    "إنشاء الطلب وتأكيده",
    "إرسال الطلب إلى الشركة الشريكة",
    "التحضير والتحقق من طرف الشريك",
    "البحث عن سائق متاح وتعيينه",
    "تتبع السائق والتوصيل عبر GPS",
    "تأكيد الاستلام والإيصال وتحديث السجل",
  ],
};

export const workflowRideshareI18n: Record<Language, string[]> = {
  fr: [
    "Saisie du point de départ et de la destination",
    "Estimation du trajet si le module est disponible",
    "Envoi de la demande de course",
    "Recherche et affectation automatique d'un chauffeur",
    "Acceptation de la mission par le chauffeur",
    "Affichage des informations du chauffeur et du véhicule",
    "Suivi GPS du déplacement vers le client",
    "Confirmation de prise en charge et départ",
    "Navigation vers la destination",
    "Confirmation d'arrivée, clôture, paiement et historique",
  ],
  en: [
    "Enter pickup point and destination",
    "Trip estimate, if the module is available",
    "Send the ride request",
    "Automatic search and assignment of a driver",
    "Driver accepts the mission",
    "Driver and vehicle details shown",
    "GPS tracking of the driver on the way to the customer",
    "Pickup confirmed and trip starts",
    "Navigation to the destination",
    "Arrival confirmed, trip closed, payment and history",
  ],
  ar: [
    "إدخال نقطة الانطلاق والوجهة",
    "تقدير الرحلة إذا كانت الوحدة متاحة",
    "إرسال طلب الرحلة",
    "البحث التلقائي عن سائق وتعيينه",
    "قبول السائق للمهمة",
    "عرض معلومات السائق والمركبة",
    "تتبع السائق عبر GPS في الطريق إلى العميل",
    "تأكيد الاستلام وبدء الرحلة",
    "الملاحة إلى الوجهة",
    "تأكيد الوصول وإغلاق الرحلة والدفع والسجل",
  ],
};

export const workflowChauffeurI18n: Record<Language, string[]> = {
  fr: [
    "Inscription et création du profil chauffeur",
    "Saisie des informations personnelles et du véhicule",
    "Téléversement des documents requis (permis, assurance, immatriculation)",
    "Vérification et validation par l'administration",
    "Activation du compte chauffeur",
    "Passage en mode disponible sur l'application",
    "Transmission de la position GPS selon les autorisations",
    "Réception des missions compatibles avec la zone et la disponibilité",
    "Consultation des détails de la mission : distance, type, destination",
    "Acceptation ou refus selon les règles de la plateforme",
    "Navigation GPS vers le point de collecte ou de départ",
    "Confirmation de prise en charge côté client",
    "Transport ou livraison vers la destination",
    "Confirmation de fin de mission et preuve de service",
    "Mise à jour automatique de l'historique et des revenus",
  ],
  en: [
    "Sign up and create a driver profile",
    "Enter personal and vehicle information",
    "Upload required documents (license, insurance, registration)",
    "Verification and validation by the administration",
    "Driver account activated",
    "Go online in the app",
    "GPS position shared according to permissions",
    "Receive missions matching the zone and availability",
    "View mission details: distance, type, destination",
    "Accept or decline according to platform rules",
    "GPS navigation to the pickup or departure point",
    "Confirm pickup with the customer",
    "Transport or delivery to the destination",
    "Confirm mission completion and proof of service",
    "History and earnings updated automatically",
  ],
  ar: [
    "التسجيل وإنشاء ملف السائق",
    "إدخال المعلومات الشخصية ومعلومات المركبة",
    "رفع المستندات المطلوبة (الرخصة والتأمين والتسجيل)",
    "التحقق والاعتماد من طرف الإدارة",
    "تفعيل حساب السائق",
    "التحول إلى وضع متاح في التطبيق",
    "إرسال موقع GPS حسب الأذونات",
    "استلام مهام مطابقة للمنطقة والتوفر",
    "عرض تفاصيل المهمة: المسافة والنوع والوجهة",
    "القبول أو الرفض حسب قواعد المنصة",
    "الملاحة عبر GPS إلى نقطة الاستلام أو الانطلاق",
    "تأكيد الاستلام لدى العميل",
    "النقل أو التوصيل إلى الوجهة",
    "تأكيد انتهاء المهمة وإثبات الخدمة",
    "تحديث السجل والأرباح تلقائيا",
  ],
};

export const workflowEntrepriseI18n: Record<Language, string[]> = {
  fr: [
    "Création du compte professionnel",
    "Saisie des informations légales et coordonnées",
    "Enregistrement d'une ou plusieurs succursales",
    "Transmission des documents requis pour validation",
    "Validation et activation du compte par l'administration",
    "Configuration des horaires d'ouverture et zones de livraison",
    "Création des catégories de produits",
    "Ajout des produits : images, prix, descriptions et variantes",
    "Configuration des options, disponibilités et stocks",
    "Réception des commandes en temps réel",
    "Acceptation ou refus de commande selon les capacités",
    "Préparation et changements de statut",
    "Coordination du chauffeur pour la livraison",
    "Remise de la commande et confirmation",
    "Consultation des ventes, historiques et rapports",
  ],
  en: [
    "Create a business account",
    "Enter legal information and contact details",
    "Register one or more branches",
    "Submit required documents for validation",
    "Account validated and activated by the administration",
    "Set opening hours and delivery zones",
    "Create product categories",
    "Add products: images, prices, descriptions, and variants",
    "Configure options, availability, and inventory",
    "Receive orders in real time",
    "Accept or decline orders according to capacity",
    "Preparation and status changes",
    "Coordinate the driver for delivery",
    "Hand over the order and confirm",
    "View sales, history, and reports",
  ],
  ar: [
    "إنشاء حساب مهني",
    "إدخال المعلومات القانونية وبيانات الاتصال",
    "تسجيل فرع أو أكثر",
    "تقديم المستندات المطلوبة للتحقق",
    "التحقق من الحساب وتفعيله من طرف الإدارة",
    "ضبط ساعات العمل ومناطق التوصيل",
    "إنشاء فئات المنتجات",
    "إضافة المنتجات: الصور والأسعار والأوصاف والخيارات",
    "ضبط الخيارات والتوفر والمخزون",
    "استلام الطلبات في الوقت الحقيقي",
    "قبول الطلبات أو رفضها حسب القدرة",
    "التحضير وتغيير الحالات",
    "التنسيق مع السائق للتوصيل",
    "تسليم الطلب وتأكيده",
    "عرض المبيعات والسجل والتقارير",
  ],
};

export const workflowAdminI18n: Record<Language, string[]> = {
  fr: [
    "Supervision du tableau de bord et des opérations en cours",
    "Gestion des utilisateurs : clients, chauffeurs, entreprises et administrateurs",
    "Vérification des profils et des documents d'inscription",
    "Configuration des zones géographiques et des règles de service",
    "Dispatching : affectation des missions et suivi des chauffeurs",
    "Suivi des commandes et des courses : statuts, retards et incidents",
    "Suivi des transactions et des paiements",
    "Gestion des licences, des codes d'activation et des domaines autorisés",
    "Consultation des rapports et des indicateurs d'activité",
  ],
  en: [
    "Monitor the dashboard and ongoing operations",
    "Manage users: customers, drivers, businesses, and administrators",
    "Verify registration profiles and documents",
    "Configure geographic zones and service rules",
    "Dispatching: assign missions and track drivers",
    "Track orders and rides: statuses, delays, and incidents",
    "Track transactions and payments",
    "Manage licenses, activation codes, and authorized domains",
    "View reports and activity indicators",
  ],
  ar: [
    "الإشراف على لوحة التحكم والعمليات الجارية",
    "إدارة المستخدمين: العملاء والسائقين والشركات والإداريين",
    "التحقق من الملفات ومستندات التسجيل",
    "ضبط المناطق الجغرافية وقواعد الخدمة",
    "التوزيع: تعيين المهام وتتبع السائقين",
    "تتبع الطلبات والرحلات: الحالات والتأخيرات والحوادث",
    "تتبع المعاملات والمدفوعات",
    "إدارة التراخيص ورموز التفعيل والنطاقات المصرح بها",
    "عرض التقارير ومؤشرات النشاط",
  ],
};

// Alias français (compatibilité : ApplicationPage utilisait ces noms).
export const workflowClient = workflowClientI18n.fr;
export const workflowRideshare = workflowRideshareI18n.fr;
export const workflowChauffeur = workflowChauffeurI18n.fr;
export const workflowEntreprise = workflowEntrepriseI18n.fr;
export const workflowAdmin = workflowAdminI18n.fr;

// ─── App cards (trilingues) ──────────────────────────────────────────────────

type AppCard = {
  name: string;
  label: string;
  demoUrl: string;
  detailUrl: string;
  body: string;
  icon: typeof ArrowRight;
};

export const appCardsI18n: Record<Language, AppCard[]> = {
  fr: [
    { name: "DepXpreS Client", label: "Client", demoUrl: "https://depxpres.vercel.app/client", detailUrl: "/applications/client", body: "Création de compte, recherche de services, commandes, courses, paiements, suivi en temps réel et historique. L'application mobile que l'utilisateur final télécharge.", icon: UsersRound },
    { name: "DepXpreS Chauffeur", label: "Chauffeur", demoUrl: "https://depxpres.vercel.app/driver/login", detailUrl: "/applications/chauffeur", body: "Profil, vérification des documents, disponibilité, réception des missions, navigation GPS, preuve de service, gestion des incidents et tableau des revenus.", icon: Truck },
    { name: "DepXpreS Entreprise", label: "Partenaire", demoUrl: "https://depxpres.vercel.app/store", detailUrl: "/applications/commerce", body: "Catalogue produits, images, prix, variantes, gestion des stocks, réception des commandes, statuts, coordination chauffeur et rapports de vente.", icon: Store },
    { name: "DepXpreS Administration", label: "Administration", demoUrl: "https://depxpres.vercel.app/admin", detailUrl: "/applications/admin", body: "Centre de contrôle complet : comptes, dispatching, zones, commandes, courses, paiements, notifications, licences, supervision et configuration système.", icon: Radar },
  ],
  en: [
    { name: "DepXpreS Client", label: "Customer", demoUrl: "https://depxpres.vercel.app/client", detailUrl: "/applications/client", body: "Create an account, search for services, place orders, book rides, pay, track in real time, and view history. The mobile app your end users download.", icon: UsersRound },
    { name: "DepXpreS Chauffeur", label: "Driver", demoUrl: "https://depxpres.vercel.app/driver/login", detailUrl: "/applications/chauffeur", body: "Profile, document verification, availability, mission reception, GPS navigation, proof of service, incident management, and earnings dashboard.", icon: Truck },
    { name: "DepXpreS Entreprise", label: "Partner", demoUrl: "https://depxpres.vercel.app/store", detailUrl: "/applications/commerce", body: "Product catalog, images, prices, variants, inventory management, order reception, statuses, driver coordination, and sales reports.", icon: Store },
    { name: "DepXpreS Administration", label: "Administration", demoUrl: "https://depxpres.vercel.app/admin", detailUrl: "/applications/admin", body: "Full control center: accounts, dispatching, zones, orders, rides, payments, notifications, licenses, supervision, and system configuration.", icon: Radar },
  ],
  ar: [
    { name: "DepXpreS Client", label: "العميل", demoUrl: "https://depxpres.vercel.app/client", detailUrl: "/applications/client", body: "إنشاء حساب والبحث عن الخدمات والطلبات والرحلات والدفع والتتبع في الوقت الحقيقي والسجل. التطبيق الذي ينزله المستخدم النهائي.", icon: UsersRound },
    { name: "DepXpreS Chauffeur", label: "السائق", demoUrl: "https://depxpres.vercel.app/driver/login", detailUrl: "/applications/chauffeur", body: "الملف الشخصي والتحقق من المستندات والتوفر واستلام المهام والملاحة عبر GPS وإثبات الخدمة وإدارة الحوادث ولوحة الأرباح.", icon: Truck },
    { name: "DepXpreS Entreprise", label: "الشريك", demoUrl: "https://depxpres.vercel.app/store", detailUrl: "/applications/commerce", body: "كتالوج المنتجات والصور والأسعار والخيارات وإدارة المخزون واستلام الطلبات والحالات والتنسيق مع السائق وتقارير المبيعات.", icon: Store },
    { name: "DepXpreS Administration", label: "الإدارة", demoUrl: "https://depxpres.vercel.app/admin", detailUrl: "/applications/admin", body: "مركز تحكم كامل: الحسابات والتوزيع والمناطق والطلبات والرحلات والمدفوعات والتنبيهات والتراخيص والإشراف وإعدادات النظام.", icon: Radar },
  ],
};

export const appCards = appCardsI18n.fr;

// ─── Module rows (trilingues) ────────────────────────────────────────────────

type ModuleRow = [string, string, string, string, typeof ArrowRight];

const moduleRowsI18n: Record<Language, ModuleRow[]> = {
  fr: [
    ["Rideshare", "Demande, affectation, suivi GPS et clôture du trajet.", "Nécessaire pour orchestrer les courses et le transport de personnes.", "Client · Chauffeur · Admin", MapPinned],
    ["Livraison", "Commande, préparation, collecte, dispatch et confirmation avec preuve.", "Nécessaire pour gérer le dernier kilomètre de bout en bout.", "Client · Partenaire · Chauffeur", PackageCheck],
    ["Entreprises", "Partenaires, commerces, restaurants, succursales et paramètres.", "Nécessaire pour structurer et gérer le réseau marchand.", "Partenaire · Admin", Store],
    ["Produits", "Catalogue, catégories, prix, variantes, images et stocks.", "Nécessaire pour vendre avec des données fiables et à jour.", "Partenaire · Admin", Boxes],
    ["Scanner", "Lecture des codes-barres ou QR selon la configuration et le matériel.", "Nécessaire pour accélérer la préparation et le contrôle des colis.", "Partenaire · Chauffeur", ScanLine],
    ["Dispatching", "Attribution des missions et suivi de disponibilité des chauffeurs.", "Nécessaire pour réduire les temps d'affectation et les conflits.", "Admin · Chauffeur", Radar],
    ["Zones", "Secteurs couverts, rayons de service et règles géographiques.", "Nécessaire pour contrôler les marchés et les zones desservies.", "Admin", Globe2],
    ["Promotions", "Codes promotionnels, campagnes, offres et visibilité commerciale.", "Nécessaire pour stimuler l'acquisition et la rétention client.", "Partenaire · Admin", Sparkles],
    ["Commandes", "Validation, préparation, attribution, livraison et historique complet.", "Nécessaire pour tracer chaque étape opérationnelle.", "Tous les rôles", Layers3],
    ["Paiements", "Connexion aux fournisseurs, transactions et remboursements configurés.", "Nécessaire pour sécuriser le parcours financier de bout en bout.", "Client · Admin", CreditCard],
    ["Rapports", "Activité, commandes, courses, ventes et indicateurs opérationnels.", "Nécessaire pour décider avec des données réelles et actualisées.", "Admin · Partenaire", BarChart3],
    ["Sécurité", "Accès, rôles, permissions, journalisation et activation de licence.", "Nécessaire pour protéger les comptes, domaines et déploiements.", "Tous les rôles", ShieldCheck],
  ],
  en: [
    ["Rideshare", "Request, assignment, GPS tracking, and trip completion.", "Needed to orchestrate rides and passenger transport.", "Customer · Driver · Admin", MapPinned],
    ["Delivery", "Order, preparation, pickup, dispatch, and confirmation with proof.", "Needed to manage the last mile end to end.", "Customer · Partner · Driver", PackageCheck],
    ["Businesses", "Partners, merchants, restaurants, branches, and settings.", "Needed to structure and manage the merchant network.", "Partner · Admin", Store],
    ["Products", "Catalog, categories, prices, variants, images, and inventory.", "Needed to sell with reliable, up-to-date data.", "Partner · Admin", Boxes],
    ["Scanner", "Barcode or QR reading, depending on configuration and hardware.", "Needed to speed up preparation and parcel checks.", "Partner · Driver", ScanLine],
    ["Dispatch", "Mission assignment and driver availability tracking.", "Needed to reduce assignment times and conflicts.", "Admin · Driver", Radar],
    ["Zones", "Covered sectors, service radiuses, and geographic rules.", "Needed to control markets and served zones.", "Admin", Globe2],
    ["Promotions", "Promo codes, campaigns, offers, and commercial visibility.", "Needed to drive customer acquisition and retention.", "Partner · Admin", Sparkles],
    ["Orders", "Validation, preparation, assignment, delivery, and full history.", "Needed to trace every operational step.", "Every role", Layers3],
    ["Payments", "Provider connections, transactions, and configured refunds.", "Needed to secure the financial journey end to end.", "Customer · Admin", CreditCard],
    ["Reports", "Activity, orders, rides, sales, and operational indicators.", "Needed to decide with real, current data.", "Admin · Partner", BarChart3],
    ["Security", "Access, roles, permissions, audit logs, and license activation.", "Needed to protect accounts, domains, and deployments.", "Every role", ShieldCheck],
  ],
  ar: [
    ["الرحلات", "الطلب والتعيين والتتبع عبر GPS وإغلاق الرحلة.", "ضروري لتنظيم الرحلات ونقل الأشخاص.", "العميل · السائق · الإدارة", MapPinned],
    ["التوصيل", "الطلب والتحضير والاستلام والتوزيع والتأكيد مع الإثبات.", "ضروري لإدارة الميل الأخير من البداية إلى النهاية.", "العميل · الشريك · السائق", PackageCheck],
    ["الشركات", "الشركاء والمتاجر والمطاعم والفروع والإعدادات.", "ضروري لتنظيم وإدارة شبكة التجار.", "الشريك · الإدارة", Store],
    ["المنتجات", "الكتالوج والفئات والأسعار والخيارات والصور والمخزون.", "ضروري للبيع ببيانات موثوقة ومحدثة.", "الشريك · الإدارة", Boxes],
    ["الماسح", "قراءة الباركود أو رمز QR حسب التهيئة والعتاد.", "ضروري لتسريع التحضير ومراقبة الطرود.", "الشريك · السائق", ScanLine],
    ["التوزيع", "تعيين المهام وتتبع توفر السائقين.", "ضروري لتقليل أوقات التعيين والتعارضات.", "الإدارة · السائق", Radar],
    ["المناطق", "القطاعات المغطاة ونطاقات الخدمة والقواعد الجغرافية.", "ضروري للتحكم في الأسواق والمناطق المخدومة.", "الإدارة", Globe2],
    ["العروض", "رموز ترويجية وحملات وعروض ورؤية تجارية.", "ضروري لتحفيز اكتساب العملاء والاحتفاظ بهم.", "الشريك · الإدارة", Sparkles],
    ["الطلبات", "التحقق والتحضير والتعيين والتسليم والسجل الكامل.", "ضروري لتتبع كل خطوة تشغيلية.", "كل الأدوار", Layers3],
    ["الدفع", "ربط مقدمي الخدمة والمعاملات والاستردادات المهيأة.", "ضروري لتأمين المسار المالي من البداية إلى النهاية.", "العميل · الإدارة", CreditCard],
    ["التقارير", "النشاط والطلبات والرحلات والمبيعات والمؤشرات التشغيلية.", "ضروري لاتخاذ القرار ببيانات حقيقية ومحدثة.", "الإدارة · الشريك", BarChart3],
    ["الأمان", "الوصول والأدوار والصلاحيات والسجلات وتفعيل الترخيص.", "ضروري لحماية الحسابات والنطاقات وعمليات النشر.", "كل الأدوار", ShieldCheck],
  ],
};

// ─── Page data — français (langue source) ────────────────────────────────────
const pageDataFr: Record<PageKind, PageData> = {
  about: {
    eyebrow: "BENNISCOM / À PROPOS",
    title: "Un logiciel pour construire votre propre réseau.",
    intro: "Benniscom développe des produits numériques, applications et systèmes intégrés pour les entreprises qui veulent opérer sous leur propre marque et leurs propres règles — sans franchise obligatoire ni partage de revenus.",
    icon: Globe2,
    accent: "cyan",
    sections: [
      { title: "Notre position", body: "DepXpreS n'est pas une franchise. C'est un système logiciel licencié que vous déployez, configurez et exploitez selon votre marché, votre marque et vos règles opérationnelles.", icon: ShieldCheck },
      { title: "Notre mission", body: "Rendre accessibles les briques opérationnelles nécessaires à la mobilité, la livraison, le commerce local et la supervision multi-zones à quiconque veut lancer un réseau indépendant.", icon: Radar },
      { title: "Notre méthode", body: "Achat de licence, réception du code source, configuration des intégrations, activation du domaine, tests de bout en bout et accompagnement selon la formule choisie.", icon: Settings2 },
      { title: "Marchés annoncés", body: "Territoires annoncés : Canada, Mali, Tunisie, France, Algérie et Italie. Le déploiement dans chaque territoire dépend de l'opérateur licencié sur place : aucune opération n'y est prétendue en cours. Chaque opérateur déploie le système sous sa propre marque, selon les règles et la réglementation de son territoire.", icon: MapPinned },
      { title: "Contact & coordonnées", body: "Pour toute demande commerciale, technique ou contractuelle, utilisez le formulaire de contact ou écrivez directement à contact@benniscom.com. Les informations officielles de Benniscom sont précisées dans les conditions contractuelles.", icon: Send },
    ],
  },
  platform: {
    eyebrow: "DEPXPRES / PLATEFORME",
    title: "Un système connecté de bout en bout.",
    intro: "Chaque rôle travaille dans son application dédiée, tandis que le centre de contrôle conserve une vision commune des comptes, zones, commandes, missions et événements en temps réel.",
    icon: Layers3,
    accent: "cyan",
    sections: [
      { title: "La demande — côté client", body: "Le client sélectionne un service, renseigne son adresse, confirme sa commande ou sa course et reçoit les informations disponibles à chaque étape.", bullets: ["Recherche par service, commerce ou produit", "Adresse, panier, réservation et confirmation", "Suivi GPS, reçus, historique et assistance"], icon: UsersRound },
      { title: "L'exécution — chauffeurs et partenaires", body: "Le partenaire prépare la commande, le chauffeur reçoit une mission compatible et l'administration supervise les changements de statut en temps réel.", bullets: ["Disponibilité et affectation automatique", "Navigation GPS et preuve de service", "Incidents, retards et annulations gérés"], icon: Truck },
      { title: "Le contrôle — administration", body: "Toutes les opérations convergent dans un centre de contrôle avec rôles, permissions, zones géographiques, rapports et paramètres d'activation de licence.", bullets: ["Dispatching et supervision des missions", "Paiements, transactions et indicateurs", "Licences, domaines autorisés et configuration"], icon: Radar },
      { title: "L'infrastructure technique", body: "Le système est conçu pour être déployé sur votre hébergement, avec vos propres clés API, votre base de données et vos intégrations de paiement.", bullets: ["Hébergement indépendant sur votre domaine", "Firebase, Vercel ou serveur de votre choix", "Google Maps, Stripe, PayPal selon configuration"], icon: Code2 },
    ],
  },
  applications: {
    eyebrow: "DEPXPRES / 4 APPLICATIONS",
    title: "Quatre rôles. Un seul système.",
    intro: "Chaque application est conçue pour un rôle précis. Toutes partagent la même infrastructure, les mêmes zones et les mêmes données en temps réel.",
    icon: Layers3,
    accent: "cyan",
    sections: [
      { title: "Client — commande, mobilité et suivi", body: "L'application mobile que vos utilisateurs finaux téléchargent. Elle couvre l'intégralité du cycle client : de la création de compte jusqu'au reçu et à l'historique.", bullets: workflowClientI18n.fr, icon: UsersRound },
      { title: "Client — rideshare et transport", body: "Le workflow de réservation de course est intégré à l'application client. L'utilisateur accède aux deux services depuis la même interface.", bullets: workflowRideshareI18n.fr, icon: Navigation },
      { title: "Chauffeur — missions et opérations", body: "L'application chauffeur gère l'intégralité du cycle opérationnel, depuis l'inscription jusqu'à la clôture de chaque mission et la consultation des revenus.", bullets: workflowChauffeurI18n.fr, icon: Truck },
      { title: "Partenaire — catalogue et commandes", body: "L'interface dédiée aux commerces et restaurants partenaires. Elle centralise la gestion du catalogue, la réception des commandes et la coordination avec les chauffeurs.", bullets: workflowEntrepriseI18n.fr, icon: Store },
      { title: "Administration — centre de contrôle", body: "L'interface d'administration supervise l'ensemble des opérations : comptes, dispatching, zones, paiements, rapports et paramètres système.", bullets: workflowAdminI18n.fr, icon: Gauge },
    ],
  },
  fonctionnement: {
    eyebrow: "DEPXPRES / FONCTIONNEMENT",
    title: "Quatre applications, un seul circuit.",
    intro: "Chaque demande suit le même circuit : elle naît dans l'application client, elle est préparée par le partenaire, exécutée par le chauffeur et supervisée depuis l'administration. Les quatre workflows ci-dessous décrivent ce circuit, étape par étape.",
    icon: Compass,
    accent: "cyan",
    sections: [
      { title: "Livraison — du panier à la confirmation", body: "Le client commande depuis son application, le commerce accepte et prépare, le dispatch affecte un chauffeur disponible, la livraison est suivie par GPS puis confirmée à la réception. Chaque changement de statut est visible par les quatre rôles concernés.", icon: PackageCheck },
      { title: "VTC — de la demande à la fin de course", body: "Le client saisit départ et destination, le dispatch localise un chauffeur disponible, la course est acceptée puis suivie par GPS jusqu'à la prise en charge, le trajet et la clôture avec paiement et historique.", icon: Navigation },
      { title: "Commercial — du catalogue à la remise", body: "Le partenaire publie son catalogue, reçoit les commandes en temps réel, les accepte selon ses capacités, les prépare, puis les remet au chauffeur affecté pour la livraison.", icon: Store },
      { title: "Administration — supervision de bout en bout", body: "L'administrateur supervise les opérations en cours, gère les utilisateurs et les zones, affecte les missions, suit les transactions et consulte les rapports. Aucune opération n'échappe au centre de contrôle.", icon: Gauge },
      { title: "Comment les quatre applications interagissent", body: "Les applications ne fonctionnent pas isolément : elles partagent les mêmes comptes, les mêmes zones, les mêmes commandes et les mêmes événements en temps réel. Une commande créée côté client apparaît immédiatement côté partenaire et côté administration ; une mission acceptée côté chauffeur met à jour le suivi côté client. Le schéma ci-dessous résume ces échanges.", icon: Layers3 },
    ],
  },
  modules: {
    eyebrow: "DEPXPRES / MODULES",
    title: "Les briques qui font tourner votre activité.",
    intro: "Chaque module partage les mêmes comptes, zones, commandes et événements. Activez ceux dont votre marché a besoin — les autres restent disponibles selon la configuration.",
    icon: Layers3,
    accent: "cyan",
    sections: [
      { title: "Modules livrés avec le code source", body: "Les modules listés dans le tableau ci-dessous font partie du système DepXpreS. Certains nécessitent une configuration externe (APIs Google Maps, Stripe, etc.). Les capacités exactes de chaque module sont précisées dans la documentation livrée avec la licence.", icon: Check },
      { title: "Modules nécessitant une configuration externe", body: "Paiements (Stripe, PayPal), cartographie (Google Maps API), notifications (Firebase Cloud Messaging, Twilio SMS, SendGrid email) et scanner (selon le matériel disponible) requièrent des comptes et clés API fournis par l'acheteur.", icon: Settings2 },
      { title: "Modules en développement actif", body: "Le système évolue en continu. Certaines fonctions avancées (gestion des stocks en temps réel, intégration multi-paiements, rapports analytiques étendus) sont en cours de développement et ne sont pas nécessairement disponibles dans la version livrée.", icon: Zap },
    ],
  },
  technology: {
    eyebrow: "DEPXPRES / TECHNOLOGIE & SÉCURITÉ",
    title: "Une architecture conçue pour la production.",
    intro: "Le système s'appuie sur une pile moderne, éprouvée en production, pensée pour le déploiement indépendant sur votre infrastructure.",
    icon: Code2,
    accent: "cyan",
    sections: [
      { title: "Stack technique", body: "Next.js ou React pour les interfaces, Firebase pour l'authentification et la base de données temps réel, Vercel ou tout hébergeur compatible Node.js.", bullets: ["React / Next.js — interfaces web et mobile", "Firebase Auth — authentification sécurisée", "Firestore — base de données en temps réel", "Google Maps API — cartographie et géolocalisation", "Capacitor — applications mobiles Android et iOS"], icon: Code2 },
      { title: "Sécurité et accès", body: "Les permissions sont vérifiées côté serveur. Les actions sensibles sont journalisées. L'activation de licence est liée au domaine autorisé.", bullets: ["Contrôle des accès par rôle (RBAC)", "Journal des actions administratives sensibles", "Activation de licence liée au domaine déclaré", "Variables d'environnement pour les secrets API"], icon: ShieldCheck },
      { title: "Accès et rôles", body: "Chaque utilisateur opère dans son espace de rôle (client, chauffeur, partenaire, administrateur). Les permissions croisées sont bloquées par défaut.", bullets: ["Isolation des espaces par rôle", "Permissions granulaires par module", "Journalisation des opérations critiques"], icon: LockKeyhole },
    ],
  },
  installation: {
    eyebrow: "DEPXPRES / INSTALLATION",
    title: "De l'achat à la mise en production.",
    intro: "Une procédure guidée pour préparer l'hébergement, connecter les services externes et valider chaque composant avant le lancement public.",
    icon: Wrench,
    accent: "cyan",
    sections: [
      { title: "01 — Préparer l'environnement", body: "Choisissez l'hébergement (Vercel, serveur Node.js, VPS), configurez votre domaine, obtenez le certificat HTTPS et préparez votre base de données Firebase.", bullets: ["Domaine et certificat HTTPS", "Projet Firebase (Auth + Firestore)", "Hébergement compatible Node.js / Vercel"], icon: Settings2 },
      { title: "02 — Configurer les intégrations", body: "Renseignez toutes les variables d'environnement : authentification, cartographie, paiements, notifications et stockage.", bullets: ["Google Maps API Key", "Stripe ou PayPal (clés publique et privée)", "Firebase Config (apiKey, projectId, etc.)", "SendGrid ou Twilio pour les notifications"], icon: Code2 },
      { title: "03 — Activer la licence", body: "Associez le code d'activation unique livré avec votre licence au domaine autorisé déclaré lors de l'achat.", bullets: ["Code d'activation à usage unique", "Lié au domaine déclaré", "Vérification effectuée au premier démarrage"], icon: BadgeCheck },
      { title: "04 — Tester avant le lancement", body: "Validez systématiquement chaque flux avant d'ouvrir au public : comptes, commandes, courses, paiements, notifications et scénarios d'incident.", bullets: ["Création de comptes test pour chaque rôle", "Test d'une commande de bout en bout", "Test d'une course rideshare complète", "Vérification des notifications et paiements", "Simulation d'incidents (annulation, client absent, etc.)"], icon: Check },
    ],
  },
  licenses: {
    eyebrow: "DEPXPRES / TARIFS & LICENCES",
    title: "Une licence adaptée à votre ambition.",
    intro: "Les trois formules incluent le code source complet des quatre applications. Les droits de déploiement, domaines autorisés, options de support et conditions de modification sont définis dans le contrat de licence.",
    icon: BadgeCheck,
    accent: "amber",
    sections: [
      {
        title: "$1 000 USD — SOURCE CODE SINGLE DOMAIN",
        body: "Licence mono-domaine sans soutien technique. Installation, configuration et maintenance à la charge de l'acheteur. Idéale pour les équipes techniques autonomes.",
        bullets: [
          "Code source complet des 4 applications",
          "1 domaine autorisé",
          "1 activation de licence incluse",
          "Documentation d'installation fournie",
          "Aucun support technique inclus",
          "Mises à jour selon les conditions contractuelles",
        ],
        icon: FileText,
      },
      {
        title: "$2 000 USD — SOURCE CODE + SUPPORT",
        body: "Licence mono-domaine avec six mois de soutien technique. Inclut l'assistance à l'installation, la configuration des APIs et le dépannage couvert selon contrat.",
        bullets: [
          "Tout ce qui est inclus dans la licence à 1 000 $",
          "Assistance à l'installation et à la configuration",
          "Aide aux variables d'environnement et APIs",
          "Six mois de soutien technique",
          "Dépannage couvert selon les conditions définies au contrat",
          "Priorité de réponse selon la catégorie de demande",
        ],
        icon: Headphones,
      },
      {
        title: "$10 000 USD — MULTI-DOMAIN ENTERPRISE",
        body: "Licence multi-domaines pour opérer sous plusieurs marques, régions ou marchés. Soutien sur demande selon les conditions convenues au contrat.",
        bullets: [
          "Code source complet des 4 applications",
          "Plusieurs domaines autorisés (conditions définies au contrat)",
          "Gestion centralisée des licences et activations",
          "Soutien technique sur demande selon contrat",
          "Convient aux agences, investisseurs ou opérateurs multi-marchés",
        ],
        icon: Globe2,
      },
      {
        title: "Conditions communes à toutes les licences",
        body: "Les droits de modification, de redistribution et de revente, le nombre exact de domaines, les mises à jour et les conditions de support sont définis dans le contrat de licence signé avant tout paiement.",
        bullets: [
          "Marque blanche : exploitable sous votre propre nom",
          "Code source modifiable selon les droits contractuels",
          "Redistribution et revente soumises au contrat",
          "Taxes et frais bancaires à la charge de l'acheteur",
          "Tarifs en USD — confirmation avant paiement",
        ],
        icon: ShieldCheck,
      },
    ],
  },
  purchase: {
    eyebrow: "DEPXPRES / ACHETER",
    title: "Un parcours d'achat clair et sécurisé.",
    intro: "La licence n'est délivrée qu'après confirmation sécurisée du paiement côté serveur et validation des informations contractuelles. Chaque étape est documentée.",
    icon: CreditCard,
    accent: "cyan",
    sections: [
      {
        title: "1 — Choisir la formule",
        body: "Sélectionnez le niveau de droits, le nombre de domaines et le niveau de support correspondant à votre marché et à votre équipe.",
        bullets: ["$1 000 : autonome, 1 domaine, sans support", "$2 000 : accompagné, 1 domaine, 6 mois de support", "$10 000 : multi-domaines, support sur demande"],
        icon: BadgeCheck,
      },
      {
        title: "2 — Renseigner le formulaire de commande",
        body: "Indiquez vos informations personnelles, professionnelles, le domaine autorisé, le pays de déploiement et vos besoins spécifiques.",
        bullets: [
          "Nom, prénom, entreprise et type d'acheteur",
          "Pays, province et adresse complète de facturation",
          "Courriel professionnel et téléphone",
          "Nom de domaine prévu et nombre de domaines",
          "Expérience dans le transport ou la livraison",
          "Objectif d'utilisation et commentaires",
          "Acceptation du contrat de licence et de la politique de confidentialité",
        ],
        icon: FileText,
      },
      {
        title: "3 — Payer et confirmer",
        body: "L'intégration du paiement en ligne (Stripe Checkout et PayPal) est préparée : elle sera active une fois les clés configurées côté serveur. La licence n'est émise qu'après confirmation réelle du paiement côté serveur. La facture est générée après cette confirmation.",
        bullets: ["Stripe Checkout ou PayPal, une fois les clés configurées", "Confirmation réelle du paiement côté serveur avant émission de la licence", "Facture générée après confirmation du paiement"],
        icon: CreditCard,
      },
      {
        title: "4 — Recevoir, activer et déployer",
        body: "Après confirmation, vous recevez un accès sécurisé au code source, le code d'activation et la documentation d'installation. L'activation lie la licence à votre domaine.",
        bullets: [
          "Accès sécurisé au téléchargement du code source",
          "Code d'activation unique lié à votre domaine",
          "Documentation d'installation complète",
          "Accès au support technique si votre formule l'inclut",
          "Tableau de bord de suivi : commandes, licences, domaines",
        ],
        icon: Send,
      },
    ],
  },
  support: {
    eyebrow: "DEPXPRES / SUPPORT TECHNIQUE",
    title: "Une assistance organisée par priorité.",
    intro: "Le soutien dépend de la licence choisie et des conditions contractuelles. Les demandes sont catégorisées pour accélérer le diagnostic et la résolution.",
    icon: Headphones,
    accent: "violet",
    sections: [
      {
        title: "Formulaire de support — informations requises",
        body: "Pour ouvrir un ticket, vous aurez besoin des informations suivantes. Plus le ticket est précis, plus le diagnostic est rapide.",
        bullets: [
          "Nom, courriel et entreprise",
          "Numéro de commande ou de licence",
          "Domaine concerné",
          "Application concernée (Client, Chauffeur, Partenaire ou Admin)",
          "Catégorie : installation, activation, API, bug, panne critique, paiement, autre",
          "Priorité : normale, haute, critique",
          "Description détaillée du problème",
          "Étapes pour reproduire l'erreur",
          "Capture d'écran, journal ou document en pièce jointe",
        ],
        icon: ClipboardList,
      },
      {
        title: "Installation & configuration",
        body: "Déploiement, domaine, variables d'environnement, intégrations API, authentification Firebase, activation de licence et paramètres de démarrage.",
        icon: Wrench,
      },
      {
        title: "Bug & problème technique",
        body: "Application inaccessible, comportement incorrect, erreur de données, régression d'un module ou conflit d'intégration.",
        icon: LifeBuoy,
      },
      {
        title: "Urgence critique",
        body: "Indisponibilité complète ou incident qui bloque une opération essentielle. La priorité de réponse et les délais d'intervention sont définis dans le contrat.",
        icon: AlertCircle,
      },
    ],
  },
  faq: {
    eyebrow: "DEPXPRES / FAQ",
    title: "Les réponses avant le déploiement.",
    intro: "Les droits exacts, la configuration technique et les conditions de support sont confirmés dans le contrat avant la signature et le paiement.",
    icon: CircleHelp,
    accent: "cyan",
    sections: [
      { title: "Que contient exactement DepXpreS ?", body: "DepXpreS est un système logiciel composé de quatre applications : Client, Chauffeur, Entreprise et Administration. Les quatre sont incluses dans les trois licences disponibles.", icon: Check },
      { title: "Les quatre applications sont-elles incluses ?", body: "Oui. Les quatre applications — Client, Chauffeur, Entreprise et Administration — sont incluses dans les trois licences (Independent à 1 000 $, Assisted à 2 000 $ et Multi-domain à 10 000 $ USD). Le code source complet des quatre applications est livré avec chaque formule.", icon: Check },
      { title: "Comment demander une licence Enterprise (Multi-domain) ?", body: "Utilisez le formulaire de demande de licence sur la page Acheter, en choisissant la formule Multi-domain. Les conditions — nombre de domaines, marques, support — sont définies dans le contrat, avant tout paiement.", icon: Check },
      { title: "Comment obtenir de l'aide pour l'installation ?", body: "Avec la licence Assisted (2 000 $), l'assistance à l'installation est incluse pendant six mois. Avec la licence Independent (1 000 $), la documentation d'installation est fournie et l'assistance est un support payant, selon les conditions définies au contrat.", icon: Check },
      { title: "Le code source est-il inclus ?", body: "Oui. Les trois formules incluent le code source complet des quatre applications. Le contrat de licence définit les droits d'utilisation, de modification et de déploiement.", icon: Check },
      { title: "Puis-je utiliser ma propre marque ?", body: "Oui. DepXpreS est conçu pour être déployé sous votre marque, avec votre nom, votre domaine autorisé et votre identité visuelle.", icon: Check },
      { title: "Puis-je modifier le code ?", body: "Oui, dans les limites définies par votre contrat de licence. Les droits de modification, de redistribution et de revente varient selon la formule choisie.", icon: Check },
      { title: "Combien de domaines sont autorisés ?", body: "Les licences à 1 000 $ et 2 000 $ autorisent un seul domaine. La licence à 10 000 $ couvre plusieurs domaines selon les conditions précisées au contrat.", icon: Check },
      { title: "Comment fonctionne l'activation ?", body: "Vous recevez un code d'activation unique après confirmation du paiement. Ce code est associé au domaine déclaré lors de l'achat et vérifié au premier démarrage du système.", icon: Check },
      { title: "Ai-je besoin de mon propre serveur ?", body: "Oui. Vous déployez le système sur votre propre hébergement (Vercel, VPS ou serveur Node.js). Firebase est utilisé pour l'authentification et la base de données.", icon: Check },
      { title: "Quelles APIs dois-je configurer ?", body: "Google Maps API pour la cartographie, Firebase pour l'authentification et la base de données, Stripe ou PayPal pour les paiements, et optionnellement SendGrid/Twilio pour les notifications.", icon: Check },
      { title: "Les paiements sont-ils déjà intégrés ?", body: "Le système inclut les intégrations Stripe et PayPal. Vous devez créer vos propres comptes chez ces fournisseurs et fournir vos clés API lors du déploiement.", icon: Check },
      { title: "Que comprend le support de six mois ?", body: "Le support de la licence à 2 000 $ couvre l'assistance à l'installation, la configuration des APIs, le dépannage technique et les incidents courants. Les délais et modalités sont précisés au contrat.", icon: Check },
      { title: "Que se passe-t-il après les six mois ?", body: "À l'expiration du support inclus, vous pouvez demander une extension payante. Les modalités et tarifs sont définis au moment du renouvellement.", icon: Check },
      { title: "Comment recevoir les mises à jour ?", body: "Les conditions de mise à jour sont définies dans le contrat de licence. Contactez-nous pour connaître les modalités applicables à votre formule.", icon: Check },
      { title: "Quelles responsabilités légales dois-je assumer ?", body: "En tant qu'opérateur indépendant, vous êtes responsable de la conformité légale dans votre pays : protection des données, règles de transport, fiscalité et toute réglementation locale applicable.", icon: Check },
      { title: "La licence est-elle une franchise ?", body: "Non. Il s'agit d'une licence logicielle indépendante. Aucun partage de revenus ni partenariat obligatoire avec Benniscom n'est requis.", icon: Check },
    ],
  },
  contact: {
    eyebrow: "DEPXPRES / CONTACT",
    title: "Parlons de votre marché.",
    intro: "Décrivez votre pays, votre domaine, le nombre d'opérations visé et le niveau d'accompagnement souhaité. Nous vous orienterons vers la formule adaptée et les prochaines étapes.",
    icon: Send,
    accent: "cyan",
    sections: [
      {
        title: "Informations à préparer avant de contacter",
        body: "Plus votre demande est précise, plus vite nous pourrons évaluer la formule la mieux adaptée à votre projet.",
        bullets: [
          "Marché cible : pays, ville ou région principale",
          "Services visés : livraison, rideshare ou les deux",
          "Marque envisagée et domaine prévu",
          "Nombre de marchés ou de domaines souhaités",
          "Niveau d'autonomie technique de votre équipe",
          "Intégrations spécifiques requises",
          "Budget et délai de lancement envisagé",
        ],
        icon: FileText,
      },
      {
        title: "Réponse commerciale",
        body: "Après réception de votre demande, nous précisons les droits contractuels, les limites de domaine, le calendrier de livraison et les conditions de support avant tout paiement.",
        icon: Headphones,
      },
      {
        title: "Courriel de contact",
        body: "contact@benniscom.com — Pour toute demande commerciale, technique ou contractuelle. Réponse dans les 48 heures ouvrables.",
        icon: Send,
      },
    ],
  },
};

// ─── Page data — English ─────────────────────────────────────────────────────
const pageDataEn: Record<PageKind, PageData> = {
  about: {
    eyebrow: "BENNISCOM / ABOUT",
    title: "Software to build your own network.",
    intro: "Benniscom develops digital products, applications, and integrated systems for businesses that want to operate under their own brand and their own rules — with no required franchise or revenue sharing.",
    icon: Globe2,
    accent: "cyan",
    sections: [
      { title: "Our position", body: "DepXpreS is not a franchise. It is licensed software that you deploy, configure, and operate according to your market, your brand, and your operational rules.", icon: ShieldCheck },
      { title: "Our mission", body: "Make the operational building blocks for mobility, delivery, local commerce, and multi-zone supervision accessible to anyone who wants to launch an independent network.", icon: Radar },
      { title: "Our method", body: "Buy a license, receive the source code, configure the integrations, activate the domain, run end-to-end tests, and get guidance according to the chosen plan.", icon: Settings2 },
      { title: "Announced markets", body: "Announced territories: Canada, Mali, Tunisia, France, Algeria, and Italy. Deployment in each territory depends on the licensed operator on site: no operation there is claimed to be underway. Each operator deploys the system under its own brand, according to the rules and regulations of its territory.", icon: MapPinned },
      { title: "Contact details", body: "For any commercial, technical, or contractual request, use the contact form or write directly to contact@benniscom.com. Benniscom's official information is stated in the contractual terms.", icon: Send },
    ],
  },
  platform: {
    eyebrow: "DEPXPRES / PLATFORM",
    title: "A system connected end to end.",
    intro: "Each role works in its own dedicated application, while the control center keeps a shared view of accounts, zones, orders, missions, and events in real time.",
    icon: Layers3,
    accent: "cyan",
    sections: [
      { title: "The request — customer side", body: "The customer selects a service, enters an address, confirms an order or a ride, and receives the available information at every step.", bullets: ["Search by service, business, or product", "Address, cart, booking, and confirmation", "GPS tracking, receipts, history, and support"], icon: UsersRound },
      { title: "Execution — drivers and partners", body: "The partner prepares the order, the driver receives a compatible mission, and the administration supervises status changes in real time.", bullets: ["Availability and automatic assignment", "GPS navigation and proof of service", "Incidents, delays, and cancellations handled"], icon: Truck },
      { title: "Control — administration", body: "All operations converge in a control center with roles, permissions, geographic zones, reports, and license activation settings.", bullets: ["Dispatching and mission supervision", "Payments, transactions, and indicators", "Licenses, authorized domains, and configuration"], icon: Radar },
      { title: "Technical infrastructure", body: "The system is designed to be deployed on your hosting, with your own API keys, your database, and your payment integrations.", bullets: ["Independent hosting on your domain", "Firebase, Vercel, or a server of your choice", "Google Maps, Stripe, PayPal depending on configuration"], icon: Code2 },
    ],
  },
  applications: {
    eyebrow: "DEPXPRES / 4 APPLICATIONS",
    title: "Four roles. One system.",
    intro: "Each application is designed for a specific role. All share the same infrastructure, the same zones, and the same data in real time.",
    icon: Layers3,
    accent: "cyan",
    sections: [
      { title: "Customer — ordering, mobility, and tracking", body: "The mobile app your end users download. It covers the full customer cycle: from account creation to the receipt and history.", bullets: workflowClientI18n.en, icon: UsersRound },
      { title: "Customer — rideshare and transport", body: "The ride booking workflow is built into the customer app. Users access both services from the same interface.", bullets: workflowRideshareI18n.en, icon: Navigation },
      { title: "Driver — missions and operations", body: "The driver app manages the entire operational cycle, from sign-up to the closing of each mission and the review of earnings.", bullets: workflowChauffeurI18n.en, icon: Truck },
      { title: "Partner — catalog and orders", body: "The interface for partner businesses and restaurants. It centralizes catalog management, order reception, and coordination with drivers.", bullets: workflowEntrepriseI18n.en, icon: Store },
      { title: "Administration — control center", body: "The administration interface supervises all operations: accounts, dispatching, zones, payments, reports, and system settings.", bullets: workflowAdminI18n.en, icon: Gauge },
    ],
  },
  fonctionnement: {
    eyebrow: "DEPXPRES / HOW IT WORKS",
    title: "Four applications, one circuit.",
    intro: "Every request follows the same circuit: it starts in the customer app, is prepared by the partner, executed by the driver, and supervised from the administration. The four workflows below describe this circuit, step by step.",
    icon: Compass,
    accent: "cyan",
    sections: [
      { title: "Delivery — from cart to confirmation", body: "The customer orders from the app, the business accepts and prepares, dispatch assigns an available driver, the delivery is tracked by GPS and confirmed on receipt. Every status change is visible to the four roles involved.", icon: PackageCheck },
      { title: "Rideshare — from request to trip end", body: "The customer enters pickup and destination, dispatch locates an available driver, the ride is accepted and tracked by GPS through pickup, the trip, and closing with payment and history.", icon: Navigation },
      { title: "Business — from catalog to handover", body: "The partner publishes its catalog, receives orders in real time, accepts them according to capacity, prepares them, then hands them to the assigned driver for delivery.", icon: Store },
      { title: "Administration — end-to-end supervision", body: "The administrator supervises ongoing operations, manages users and zones, assigns missions, tracks transactions, and reviews reports. No operation escapes the control center.", icon: Gauge },
      { title: "How the four applications interact", body: "The applications do not work in isolation: they share the same accounts, zones, orders, and real-time events. An order created on the customer side appears immediately on the partner and administration sides; a mission accepted on the driver side updates tracking on the customer side. The diagram below summarizes these exchanges.", icon: Layers3 },
    ],
  },
  modules: {
    eyebrow: "DEPXPRES / MODULES",
    title: "The building blocks that run your business.",
    intro: "Every module shares the same accounts, zones, orders, and events. Activate the ones your market needs — the others remain available depending on configuration.",
    icon: Layers3,
    accent: "cyan",
    sections: [
      { title: "Modules delivered with the source code", body: "The modules listed in the table below are part of the DepXpreS system. Some require external configuration (Google Maps, Stripe APIs, etc.). The exact capabilities of each module are stated in the documentation delivered with the license.", icon: Check },
      { title: "Modules requiring external configuration", body: "Payments (Stripe, PayPal), mapping (Google Maps API), notifications (Firebase Cloud Messaging, Twilio SMS, SendGrid email), and the scanner (depending on available hardware) require accounts and API keys provided by the buyer.", icon: Settings2 },
      { title: "Modules in active development", body: "The system evolves continuously. Some advanced features (real-time inventory management, multi-payment integration, extended analytics reports) are under development and are not necessarily available in the delivered version.", icon: Zap },
    ],
  },
  technology: {
    eyebrow: "DEPXPRES / TECHNOLOGY & SECURITY",
    title: "An architecture built for production.",
    intro: "The system relies on a modern stack, proven in production, designed for independent deployment on your infrastructure.",
    icon: Code2,
    accent: "cyan",
    sections: [
      { title: "Technical stack", body: "Next.js or React for the interfaces, Firebase for authentication and the real-time database, Vercel or any Node.js-compatible host.", bullets: ["React / Next.js — web and mobile interfaces", "Firebase Auth — secure authentication", "Firestore — real-time database", "Google Maps API — mapping and geolocation", "Capacitor — Android and iOS mobile apps"], icon: Code2 },
      { title: "Security and access", body: "Permissions are checked server-side. Sensitive actions are logged. License activation is tied to the authorized domain.", bullets: ["Role-based access control (RBAC)", "Audit log of sensitive administrative actions", "License activation tied to the declared domain", "Environment variables for API secrets"], icon: ShieldCheck },
      { title: "Access and roles", body: "Each user operates in their role space (customer, driver, partner, administrator). Cross-role permissions are blocked by default.", bullets: ["Isolation of spaces by role", "Granular permissions per module", "Logging of critical operations"], icon: LockKeyhole },
    ],
  },
  installation: {
    eyebrow: "DEPXPRES / INSTALLATION",
    title: "From purchase to production.",
    intro: "A guided procedure to prepare hosting, connect external services, and validate every component before the public launch.",
    icon: Wrench,
    accent: "cyan",
    sections: [
      { title: "01 — Prepare the environment", body: "Choose hosting (Vercel, Node.js server, VPS), configure your domain, obtain the HTTPS certificate, and prepare your Firebase database.", bullets: ["Domain and HTTPS certificate", "Firebase project (Auth + Firestore)", "Node.js / Vercel compatible hosting"], icon: Settings2 },
      { title: "02 — Configure the integrations", body: "Enter all environment variables: authentication, mapping, payments, notifications, and storage.", bullets: ["Google Maps API Key", "Stripe or PayPal (public and private keys)", "Firebase Config (apiKey, projectId, etc.)", "SendGrid or Twilio for notifications"], icon: Code2 },
      { title: "03 — Activate the license", body: "Bind the unique activation code delivered with your license to the authorized domain declared at purchase.", bullets: ["Single-use activation code", "Tied to the declared domain", "Verified on first startup"], icon: BadgeCheck },
      { title: "04 — Test before launch", body: "Systematically validate every flow before opening to the public: accounts, orders, rides, payments, notifications, and incident scenarios.", bullets: ["Create test accounts for each role", "Test an order end to end", "Test a complete rideshare trip", "Verify notifications and payments", "Simulate incidents (cancellation, absent customer, etc.)"], icon: Check },
    ],
  },
  licenses: {
    eyebrow: "DEPXPRES / PRICING & LICENSES",
    title: "A license matched to your ambition.",
    intro: "All three plans include the full source code of the four applications. Deployment rights, authorized domains, support options, and modification terms are defined in the license agreement.",
    icon: BadgeCheck,
    accent: "amber",
    sections: [
      {
        title: "$1,000 USD — SOURCE CODE SINGLE DOMAIN",
        body: "Single-domain license with no technical support. Installation, configuration, and maintenance are the buyer's responsibility. Ideal for autonomous technical teams.",
        bullets: [
          "Full source code of the 4 applications",
          "1 authorized domain",
          "1 license activation included",
          "Installation documentation provided",
          "No technical support included",
          "Updates according to contractual terms",
        ],
        icon: FileText,
      },
      {
        title: "$2,000 USD — SOURCE CODE + SUPPORT",
        body: "Single-domain license with six months of technical support. Includes installation assistance, API configuration, and troubleshooting covered by contract.",
        bullets: [
          "Everything included in the $1,000 license",
          "Installation and configuration assistance",
          "Help with environment variables and APIs",
          "Six months of technical support",
          "Troubleshooting covered under the terms defined in the contract",
          "Response priority by request category",
        ],
        icon: Headphones,
      },
      {
        title: "$10,000 USD — MULTI-DOMAIN ENTERPRISE",
        body: "Multi-domain license to operate under several brands, regions, or markets. Support on demand under the terms agreed in the contract.",
        bullets: [
          "Full source code of the 4 applications",
          "Multiple authorized domains (terms defined in the contract)",
          "Centralized license and activation management",
          "Technical support on demand, per contract",
          "Suited to agencies, investors, or multi-market operators",
        ],
        icon: Globe2,
      },
      {
        title: "Terms common to all licenses",
        body: "Modification, redistribution, and resale rights, the exact number of domains, updates, and support terms are defined in the license agreement signed before any payment.",
        bullets: [
          "White label: usable under your own name",
          "Source code modifiable under contractual rights",
          "Redistribution and resale subject to the contract",
          "Taxes and bank fees borne by the buyer",
          "Prices in USD — confirmed before payment",
        ],
        icon: ShieldCheck,
      },
    ],
  },
  purchase: {
    eyebrow: "DEPXPRES / BUY",
    title: "A clear and secure purchase journey.",
    intro: "The license is issued only after secure server-side confirmation of payment and validation of the contractual information. Every step is documented.",
    icon: CreditCard,
    accent: "cyan",
    sections: [
      {
        title: "1 — Choose the plan",
        body: "Select the level of rights, the number of domains, and the level of support matching your market and your team.",
        bullets: ["$1,000: independent, 1 domain, no support", "$2,000: guided, 1 domain, 6 months of support", "$10,000: multi-domain, support on demand"],
        icon: BadgeCheck,
      },
      {
        title: "2 — Fill in the order form",
        body: "Provide your personal and business information, the authorized domain, the country of deployment, and your specific needs.",
        bullets: [
          "First name, last name, company, and buyer type",
          "Country, province, and full billing address",
          "Business email and phone",
          "Planned domain name and number of domains",
          "Experience in transport or delivery",
          "Purpose of use and comments",
          "Acceptance of the license agreement and privacy policy",
        ],
        icon: FileText,
      },
      {
        title: "3 — Pay and confirm",
        body: "The online payment integration (Stripe Checkout and PayPal) is prepared: it will go live once the keys are configured server-side. The license is issued only after real server-side confirmation of payment. The invoice is generated after this confirmation.",
        bullets: ["Stripe Checkout or PayPal, once the keys are configured", "Real server-side payment confirmation before the license is issued", "Invoice generated after payment confirmation"],
        icon: CreditCard,
      },
      {
        title: "4 — Receive, activate, and deploy",
        body: "After confirmation, you receive secure access to the source code, the activation code, and the installation documentation. Activation ties the license to your domain.",
        bullets: [
          "Secure access to the source code download",
          "Unique activation code tied to your domain",
          "Complete installation documentation",
          "Access to technical support if your plan includes it",
          "Tracking dashboard: orders, licenses, domains",
        ],
        icon: Send,
      },
    ],
  },
  support: {
    eyebrow: "DEPXPRES / TECHNICAL SUPPORT",
    title: "Support organized by priority.",
    intro: "Support depends on the chosen license and the contractual terms. Requests are categorized to speed up diagnosis and resolution.",
    icon: Headphones,
    accent: "violet",
    sections: [
      {
        title: "Support form — required information",
        body: "To open a ticket, you will need the following information. The more precise the ticket, the faster the diagnosis.",
        bullets: [
          "Name, email, and company",
          "Order or license number",
          "Domain concerned",
          "Application concerned (Customer, Driver, Partner, or Admin)",
          "Category: installation, activation, API, bug, critical incident, payment, other",
          "Priority: normal, high, critical",
          "Detailed description of the problem",
          "Steps to reproduce the error",
          "Screenshot, log, or document as an attachment",
        ],
        icon: ClipboardList,
      },
      {
        title: "Installation & configuration",
        body: "Deployment, domain, environment variables, API integrations, Firebase authentication, license activation, and startup settings.",
        icon: Wrench,
      },
      {
        title: "Bug & technical problem",
        body: "Application unavailable, incorrect behavior, data error, module regression, or integration conflict.",
        icon: LifeBuoy,
      },
      {
        title: "Critical emergency",
        body: "Complete outage or an incident blocking an essential operation. Response priority and intervention timelines are defined in the contract.",
        icon: AlertCircle,
      },
    ],
  },
  faq: {
    eyebrow: "DEPXPRES / FAQ",
    title: "The answers before deployment.",
    intro: "Exact rights, technical configuration, and support terms are confirmed in the contract before signing and payment.",
    icon: CircleHelp,
    accent: "cyan",
    sections: [
      { title: "What exactly does DepXpreS contain?", body: "DepXpreS is a software system made of four applications: Customer, Driver, Business, and Administration. All four are included in the three available licenses.", icon: Check },
      { title: "Are the four applications included?", body: "Yes. All four applications — Customer, Driver, Business, and Administration — are included in the three licenses (Independent at $1,000, Assisted at $2,000, and Multi-domain at $10,000 USD). The full source code of all four applications is delivered with each plan.", icon: Check },
      { title: "How do I request an Enterprise (Multi-domain) license?", body: "Use the license request form on the Buy page, choosing the Multi-domain plan. The terms — number of domains, brands, support — are defined in the contract, before any payment.", icon: Check },
      { title: "How do I get help with installation?", body: "With the Assisted license ($2,000), installation assistance is included for six months. With the Independent license ($1,000), installation documentation is provided and assistance is paid support, under the terms defined in the contract.", icon: Check },
      { title: "Is the source code included?", body: "Yes. All three plans include the full source code of the four applications. The license agreement defines the rights of use, modification, and deployment.", icon: Check },
      { title: "Can I use my own brand?", body: "Yes. DepXpreS is designed to be deployed under your brand, with your name, your authorized domain, and your visual identity.", icon: Check },
      { title: "Can I modify the code?", body: "Yes, within the limits defined by your license agreement. Modification, redistribution, and resale rights vary by plan.", icon: Check },
      { title: "How many domains are allowed?", body: "The $1,000 and $2,000 licenses allow a single domain. The $10,000 license covers multiple domains under the terms stated in the contract.", icon: Check },
      { title: "How does activation work?", body: "You receive a unique activation code after payment confirmation. This code is linked to the domain declared at purchase and verified on first startup of the system.", icon: Check },
      { title: "Do I need my own server?", body: "Yes. You deploy the system on your own hosting (Vercel, VPS, or Node.js server). Firebase is used for authentication and the database.", icon: Check },
      { title: "Which APIs do I need to configure?", body: "Google Maps API for mapping, Firebase for authentication and the database, Stripe or PayPal for payments, and optionally SendGrid/Twilio for notifications.", icon: Check },
      { title: "Are payments already integrated?", body: "The system includes the Stripe and PayPal integrations. You must create your own accounts with these providers and supply your API keys at deployment.", icon: Check },
      { title: "What does the six-month support cover?", body: "Support for the $2,000 license covers installation assistance, API configuration, technical troubleshooting, and common incidents. Timelines and terms are stated in the contract.", icon: Check },
      { title: "What happens after the six months?", body: "When the included support expires, you can request a paid extension. Terms and prices are defined at renewal time.", icon: Check },
      { title: "How do I receive updates?", body: "Update terms are defined in the license agreement. Contact us to learn the terms applicable to your plan.", icon: Check },
      { title: "What legal responsibilities do I take on?", body: "As an independent operator, you are responsible for legal compliance in your country: data protection, transport rules, taxation, and any applicable local regulation.", icon: Check },
      { title: "Is the license a franchise?", body: "No. It is an independent software license. No revenue sharing and no mandatory partnership with Benniscom are required.", icon: Check },
    ],
  },
  contact: {
    eyebrow: "DEPXPRES / CONTACT",
    title: "Let's talk about your market.",
    intro: "Describe your country, your domain, the number of operations targeted, and the level of guidance wanted. We will point you to the right plan and the next steps.",
    icon: Send,
    accent: "cyan",
    sections: [
      {
        title: "Information to prepare before contacting us",
        body: "The more precise your request, the faster we can assess the plan best suited to your project.",
        bullets: [
          "Target market: country, city, or main region",
          "Services targeted: delivery, rideshare, or both",
          "Planned brand and domain",
          "Number of markets or domains wanted",
          "Your team's technical autonomy level",
          "Specific integrations required",
          "Planned budget and launch timeline",
        ],
        icon: FileText,
      },
      {
        title: "Commercial reply",
        body: "After receiving your request, we clarify the contractual rights, domain limits, delivery schedule, and support terms before any payment.",
        icon: Headphones,
      },
      {
        title: "Contact email",
        body: "contact@benniscom.com — For any commercial, technical, or contractual request. Reply within 48 business hours.",
        icon: Send,
      },
    ],
  },
};

// ─── Page data — العربية ─────────────────────────────────────────────────────
const pageDataAr: Record<PageKind, PageData> = {
  about: {
    eyebrow: "BENNISCOM / من نحن",
    title: "برمجيات لبناء شبكتك الخاصة.",
    intro: "تطور Benniscom منتجات رقمية وتطبيقات وأنظمة متكاملة للشركات التي تريد العمل تحت علامتها وقواعدها الخاصة — دون امتياز إلزامي أو مشاركة في الإيرادات.",
    icon: Globe2,
    accent: "cyan",
    sections: [
      { title: "موقفنا", body: "DepXpreS ليس امتيازا. إنه نظام برمجي مرخص تنشره وتضبطه وتشغله حسب سوقك وعلامتك وقواعدك التشغيلية.", icon: ShieldCheck },
      { title: "مهمتنا", body: "إتاحة المكونات التشغيلية اللازمة للتنقل والتوصيل والتجارة المحلية والإشراف متعدد المناطق لكل من يريد إطلاق شبكة مستقلة.", icon: Radar },
      { title: "منهجيتنا", body: "شراء الترخيص، واستلام الكود المصدري، وضبط التكاملات، وتفعيل النطاق، واختبار شامل، ومرافقة حسب الخطة المختارة.", icon: Settings2 },
      { title: "الأسواق المعلنة", body: "الأقاليم المعلنة: كندا ومالي وتونس وفرنسا والجزائر وإيطاليا. النشر في كل إقليم يعتمد على المشغل المرخص فيه: لا ندعي وجود أي عملية جارية هناك. كل مشغل ينشر النظام تحت علامته، وفق قواعد وأنظمة إقليمه.", icon: MapPinned },
      { title: "الاتصال وبيانات التواصل", body: "لأي طلب تجاري أو تقني أو تعاقدي، استخدم نموذج الاتصال أو راسلنا مباشرة عبر contact@benniscom.com. المعلومات الرسمية عن Benniscom مذكورة في الشروط التعاقدية.", icon: Send },
    ],
  },
  platform: {
    eyebrow: "DEPXPRES / المنصة",
    title: "نظام مترابط من البداية إلى النهاية.",
    intro: "كل دور يعمل في تطبيقه الخاص، بينما يحتفظ مركز التحكم برؤية مشتركة للحسابات والمناطق والطلبات والمهام والأحداث في الوقت الحقيقي.",
    icon: Layers3,
    accent: "cyan",
    sections: [
      { title: "الطلب — من جهة العميل", body: "يختار العميل خدمة، ويدخل عنوانه، ويؤكد طلبه أو رحلته، ويتلقى المعلومات المتاحة في كل خطوة.", bullets: ["البحث حسب الخدمة أو المتجر أو المنتج", "العنوان والسلة والحجز والتأكيد", "التتبع عبر GPS والإيصالات والسجل والدعم"], icon: UsersRound },
      { title: "التنفيذ — السائقون والشركاء", body: "يحضر الشريك الطلب، ويستلم السائق مهمة مناسبة، وتشرف الإدارة على تغييرات الحالات في الوقت الحقيقي.", bullets: ["التوفر والتعيين التلقائي", "الملاحة عبر GPS وإثبات الخدمة", "معالجة الحوادث والتأخيرات والإلغاءات"], icon: Truck },
      { title: "التحكم — الإدارة", body: "تتجمع كل العمليات في مركز تحكم يضم الأدوار والصلاحيات والمناطق الجغرافية والتقارير وإعدادات تفعيل الترخيص.", bullets: ["التوزيع والإشراف على المهام", "المدفوعات والمعاملات والمؤشرات", "التراخيص والنطاقات المصرح بها والإعدادات"], icon: Radar },
      { title: "البنية التقنية", body: "صمم النظام لينشر على استضافتك، بمفاتيح API الخاصة بك وقاعدة بياناتك وتكاملات الدفع الخاصة بك.", bullets: ["استضافة مستقلة على نطاقك", "Firebase أو Vercel أو خادم من اختيارك", "Google Maps وStripe وPayPal حسب التهيئة"], icon: Code2 },
    ],
  },
  applications: {
    eyebrow: "DEPXPRES / 4 تطبيقات",
    title: "أربعة أدوار. نظام واحد.",
    intro: "صمم كل تطبيق لدور محدد. جميعها تشترك في البنية نفسها والمناطق نفسها والبيانات نفسها في الوقت الحقيقي.",
    icon: Layers3,
    accent: "cyan",
    sections: [
      { title: "العميل — الطلب والتنقل والتتبع", body: "التطبيق الذي ينزله المستخدمون النهائيون. يغطي دورة العميل كاملة: من إنشاء الحساب حتى الإيصال والسجل.", bullets: workflowClientI18n.ar, icon: UsersRound },
      { title: "العميل — الرحلات والنقل", body: "سير عمل حجز الرحلات مدمج في تطبيق العميل. يصل المستخدم إلى الخدمتين من الواجهة نفسها.", bullets: workflowRideshareI18n.ar, icon: Navigation },
      { title: "السائق — المهام والعمليات", body: "يدير تطبيق السائق الدورة التشغيلية كاملة، من التسجيل حتى إغلاق كل مهمة ومراجعة الأرباح.", bullets: workflowChauffeurI18n.ar, icon: Truck },
      { title: "الشريك — الكتالوج والطلبات", body: "واجهة مخصصة للمتاجر والمطاعم الشريكة. تجمع إدارة الكتالوج واستلام الطلبات والتنسيق مع السائقين.", bullets: workflowEntrepriseI18n.ar, icon: Store },
      { title: "الإدارة — مركز التحكم", body: "تشرف واجهة الإدارة على كل العمليات: الحسابات والتوزيع والمناطق والمدفوعات والتقارير وإعدادات النظام.", bullets: workflowAdminI18n.ar, icon: Gauge },
    ],
  },
  fonctionnement: {
    eyebrow: "DEPXPRES / كيف يعمل",
    title: "أربعة تطبيقات، مسار واحد.",
    intro: "كل طلب يتبع المسار نفسه: ينشأ في تطبيق العميل، ويحضره الشريك، وينفذه السائق، وتشرف عليه الإدارة. الأربعة مسارات أدناه تصف هذا المسار خطوة بخطوة.",
    icon: Compass,
    accent: "cyan",
    sections: [
      { title: "التوصيل — من السلة إلى التأكيد", body: "يطلب العميل من تطبيقه، ويقبل المتجر ويحضر، ويعين التوزيع سائقا متاحا، ويتم تتبع التوصيل عبر GPS ثم تأكيده عند الاستلام. كل تغيير في الحالة مرئي للأدوار الأربعة المعنية.", icon: PackageCheck },
      { title: "الرحلات — من الطلب إلى نهاية الرحلة", body: "يدخل العميل الانطلاق والوجهة، ويحدد التوزيع سائقا متاحا، وتقبل الرحلة وتتبع عبر GPS حتى الاستلام والرحلة والإغلاق مع الدفع والسجل.", icon: Navigation },
      { title: "التجاري — من الكتالوج إلى التسليم", body: "ينشر الشريك كتالوجه، ويستلم الطلبات في الوقت الحقيقي، ويقبلها حسب قدرته، ويحضرها، ثم يسلمها للسائق المعين للتوصيل.", icon: Store },
      { title: "الإدارة — إشراف شامل", body: "يشرف المدير على العمليات الجارية، ويدير المستخدمين والمناطق، ويعين المهام، ويتتبع المعاملات، ويراجع التقارير. لا تفلت أي عملية من مركز التحكم.", icon: Gauge },
      { title: "كيف تتفاعل التطبيقات الأربعة", body: "لا تعمل التطبيقات بمعزل: تشترك في الحسابات والمناطق والطلبات والأحداث الفورية نفسها. طلب ينشأ لدى العميل يظهر فورا لدى الشريك والإدارة؛ ومهمة يقبلها السائق تحدث التتبع لدى العميل. المخطط أدناه يلخص هذه التبادلات.", icon: Layers3 },
    ],
  },
  modules: {
    eyebrow: "DEPXPRES / الوحدات",
    title: "المكونات التي تدير نشاطك.",
    intro: "كل وحدة تشارك الحسابات والمناطق والطلبات والأحداث نفسها. فعّل ما يحتاجه سوقك — والباقي يبقى متاحا حسب التهيئة.",
    icon: Layers3,
    accent: "cyan",
    sections: [
      { title: "وحدات مسلمة مع الكود المصدري", body: "الوحدات المذكورة في الجدول أدناه جزء من نظام DepXpreS. بعضها يتطلب تهيئة خارجية (واجهات Google Maps وStripe وغيرها). القدرات الدقيقة لكل وحدة مذكورة في التوثيق المسلم مع الترخيص.", icon: Check },
      { title: "وحدات تتطلب تهيئة خارجية", body: "المدفوعات (Stripe وPayPal) والخرائط (Google Maps API) والتنبيهات (Firebase Cloud Messaging وTwilio SMS وSendGrid email) والماسح (حسب العتاد المتاح) تتطلب حسابات ومفاتيح API يوفرها المشتري.", icon: Settings2 },
      { title: "وحدات قيد التطوير النشط", body: "النظام يتطور باستمرار. بعض الوظائف المتقدمة (إدارة المخزون في الوقت الحقيقي، وتكامل المدفوعات المتعددة، والتقارير التحليلية الموسعة) قيد التطوير وليست بالضرورة متاحة في النسخة المسلمة.", icon: Zap },
    ],
  },
  technology: {
    eyebrow: "DEPXPRES / التقنية والأمان",
    title: "بنية مصممة للإنتاج.",
    intro: "يعتمد النظام على حزمة حديثة مجربة في الإنتاج، مصممة للنشر المستقل على بنيتك التحتية.",
    icon: Code2,
    accent: "cyan",
    sections: [
      { title: "الحزمة التقنية", body: "Next.js أو React للواجهات، وFirebase للمصادقة وقاعدة البيانات الفورية، وVercel أو أي مضيف متوافق مع Node.js.", bullets: ["React / Next.js — واجهات الويب والجوال", "Firebase Auth — مصادقة آمنة", "Firestore — قاعدة بيانات فورية", "Google Maps API — الخرائط وتحديد الموقع", "Capacitor — تطبيقات Android وiOS"], icon: Code2 },
      { title: "الأمان والوصول", body: "يتم التحقق من الصلاحيات من جهة الخادم. وتسجل الإجراءات الحساسة. ويرتبط تفعيل الترخيص بالنطاق المصرح به.", bullets: ["التحكم في الوصول حسب الدور (RBAC)", "سجل الإجراءات الإدارية الحساسة", "تفعيل الترخيص مرتبط بالنطاق المعلن", "متغيرات البيئة لأسرار API"], icon: ShieldCheck },
      { title: "الوصول والأدوار", body: "يعمل كل مستخدم في فضاء دوره (عميل أو سائق أو شريك أو مدير). والصلاحيات المتقاطعة محظورة افتراضيا.", bullets: ["عزل الفضاءات حسب الدور", "صلاحيات دقيقة لكل وحدة", "تسجيل العمليات الحرجة"], icon: LockKeyhole },
    ],
  },
  installation: {
    eyebrow: "DEPXPRES / التثبيت",
    title: "من الشراء إلى الإنتاج.",
    intro: "إجراء موجه لتحضير الاستضافة وربط الخدمات الخارجية والتحقق من كل مكون قبل الإطلاق العام.",
    icon: Wrench,
    accent: "cyan",
    sections: [
      { title: "01 — تحضير البيئة", body: "اختر الاستضافة (Vercel أو خادم Node.js أو VPS)، واضبط نطاقك، واحصل على شهادة HTTPS، وحضر قاعدة بيانات Firebase.", bullets: ["النطاق وشهادة HTTPS", "مشروع Firebase (Auth + Firestore)", "استضافة متوافقة مع Node.js / Vercel"], icon: Settings2 },
      { title: "02 — ضبط التكاملات", body: "أدخل كل متغيرات البيئة: المصادقة والخرائط والمدفوعات والتنبيهات والتخزين.", bullets: ["Google Maps API Key", "Stripe أو PayPal (المفتاح العام والخاص)", "Firebase Config (apiKey وprojectId وغيرها)", "SendGrid أو Twilio للتنبيهات"], icon: Code2 },
      { title: "03 — تفعيل الترخيص", body: "اربط رمز التفعيل الفريد المسلم مع ترخيصك بالنطاق المصرح به المعلن عند الشراء.", bullets: ["رمز تفعيل لاستخدام واحد", "مرتبط بالنطاق المعلن", "يتحقق منه عند أول تشغيل"], icon: BadgeCheck },
      { title: "04 — الاختبار قبل الإطلاق", body: "تحقق بشكل منهجي من كل مسار قبل الفتح للعموم: الحسابات والطلبات والرحلات والمدفوعات والتنبيهات وسيناريوهات الحوادث.", bullets: ["إنشاء حسابات تجريبية لكل دور", "اختبار طلب من البداية إلى النهاية", "اختبار رحلة كاملة", "التحقق من التنبيهات والمدفوعات", "محاكاة حوادث (إلغاء أو غياب العميل وغيرها)"], icon: Check },
    ],
  },
  licenses: {
    eyebrow: "DEPXPRES / الأسعار والتراخيص",
    title: "ترخيص يناسب طموحك.",
    intro: "تشمل الخطط الثلاث الكود المصدري الكامل للتطبيقات الأربعة. حقوق النشر والنطاقات المصرح بها وخيارات الدعم وشروط التعديل محددة في عقد الترخيص.",
    icon: BadgeCheck,
    accent: "amber",
    sections: [
      {
        title: "1,000 $ USD — SOURCE CODE SINGLE DOMAIN",
        body: "ترخيص نطاق واحد دون دعم تقني. التثبيت والتهيئة والصيانة على عاتق المشتري. مثالي للفرق التقنية المستقلة.",
        bullets: [
          "الكود المصدري الكامل للتطبيقات الأربعة",
          "نطاق واحد مصرح به",
          "تفعيل ترخيص واحد مشمول",
          "توثيق التثبيت مسلم",
          "بدون دعم تقني مشمول",
          "التحديثات حسب الشروط التعاقدية",
        ],
        icon: FileText,
      },
      {
        title: "2,000 $ USD — SOURCE CODE + SUPPORT",
        body: "ترخيص نطاق واحد مع ستة أشهر من الدعم التقني. يشمل المساعدة في التثبيت وضبط واجهات API وحل المشاكل المشمولة بالعقد.",
        bullets: [
          "كل ما يشمله ترخيص 1,000 $",
          "مساعدة في التثبيت والتهيئة",
          "مساعدة في متغيرات البيئة وواجهات API",
          "ستة أشهر من الدعم التقني",
          "حل المشاكل مشمول حسب الشروط المحددة في العقد",
          "أولوية الرد حسب فئة الطلب",
        ],
        icon: Headphones,
      },
      {
        title: "10,000 $ USD — MULTI-DOMAIN ENTERPRISE",
        body: "ترخيص متعدد النطاقات للعمل تحت عدة علامات أو مناطق أو أسواق. دعم عند الطلب حسب الشروط المتفق عليها في العقد.",
        bullets: [
          "الكود المصدري الكامل للتطبيقات الأربعة",
          "عدة نطاقات مصرح بها (الشروط محددة في العقد)",
          "إدارة مركزية للتراخيص والتفعيلات",
          "دعم تقني عند الطلب حسب العقد",
          "مناسب للوكالات والمستثمرين والمشغلين متعددي الأسواق",
        ],
        icon: Globe2,
      },
      {
        title: "شروط مشتركة لكل التراخيص",
        body: "حقوق التعديل وإعادة التوزيع وإعادة البيع، والعدد الدقيق للنطاقات، والتحديثات، وشروط الدعم محددة في عقد الترخيص الموقع قبل أي دفع.",
        bullets: [
          "علامة بيضاء: يعمل باسمك الخاص",
          "الكود المصدري قابل للتعديل حسب الحقوق التعاقدية",
          "إعادة التوزيع وإعادة البيع خاضعة للعقد",
          "الضرائب والرسوم البنكية على عاتق المشتري",
          "الأسعار بالدولار الأمريكي — تأكيد قبل الدفع",
        ],
        icon: ShieldCheck,
      },
    ],
  },
  purchase: {
    eyebrow: "DEPXPRES / شراء",
    title: "مسار شراء واضح وآمن.",
    intro: "لا يصدر الترخيص إلا بعد تأكيد آمن للدفع من جهة الخادم والتحقق من المعلومات التعاقدية. كل خطوة موثقة.",
    icon: CreditCard,
    accent: "cyan",
    sections: [
      {
        title: "1 — اختيار الخطة",
        body: "اختر مستوى الحقوق وعدد النطاقات ومستوى الدعم المناسب لسوقك وفريقك.",
        bullets: ["1,000 $: مستقل، نطاق واحد، بدون دعم", "2,000 $: بمرافقة، نطاق واحد، 6 أشهر دعم", "10,000 $: نطاقات متعددة، دعم عند الطلب"],
        icon: BadgeCheck,
      },
      {
        title: "2 — ملء نموذج الطلب",
        body: "أدخل معلوماتك الشخصية والمهنية والنطاق المصرح به وبلد النشر واحتياجاتك الخاصة.",
        bullets: [
          "الاسم والشركة ونوع المشتري",
          "البلد والمقاطعة وعنوان الفوترة الكامل",
          "البريد المهني والهاتف",
          "اسم النطاق المخطط وعدد النطاقات",
          "الخبرة في النقل أو التوصيل",
          "هدف الاستخدام والملاحظات",
          "قبول عقد الترخيص وسياسة الخصوصية",
        ],
        icon: FileText,
      },
      {
        title: "3 — الدفع والتأكيد",
        body: "تكامل الدفع عبر الإنترنت (Stripe Checkout وPayPal) جاهز: سيعمل فور تهيئة المفاتيح من جهة الخادم. لا يصدر الترخيص إلا بعد تأكيد حقيقي للدفع من جهة الخادم. وتصدر الفاتورة بعد هذا التأكيد.",
        bullets: ["Stripe Checkout أو PayPal فور تهيئة المفاتيح", "تأكيد حقيقي للدفع من جهة الخادم قبل إصدار الترخيص", "الفاتورة تصدر بعد تأكيد الدفع"],
        icon: CreditCard,
      },
      {
        title: "4 — الاستلام والتفعيل والنشر",
        body: "بعد التأكيد، تستلم وصولا آمنا إلى الكود المصدري ورمز التفعيل وتوثيق التثبيت. التفعيل يربط الترخيص بنطاقك.",
        bullets: [
          "وصول آمن لتنزيل الكود المصدري",
          "رمز تفعيل فريد مرتبط بنطاقك",
          "توثيق تثبيت كامل",
          "وصول إلى الدعم التقني إذا كانت خطتك تشمله",
          "لوحة متابعة: الطلبات والتراخيص والنطاقات",
        ],
        icon: Send,
      },
    ],
  },
  support: {
    eyebrow: "DEPXPRES / الدعم التقني",
    title: "مساعدة منظمة حسب الأولوية.",
    intro: "الدعم يعتمد على الترخيص المختار والشروط التعاقدية. تصنف الطلبات لتسريع التشخيص والحل.",
    icon: Headphones,
    accent: "violet",
    sections: [
      {
        title: "نموذج الدعم — المعلومات المطلوبة",
        body: "لفتح طلب، ستحتاج إلى المعلومات التالية. كلما كان الطلب أدق، كان التشخيص أسرع.",
        bullets: [
          "الاسم والبريد والشركة",
          "رقم الطلب أو الترخيص",
          "النطاق المعني",
          "التطبيق المعني (العميل أو السائق أو الشريك أو الإدارة)",
          "الفئة: التثبيت أو التفعيل أو API أو خطأ أو حادث حرج أو الدفع أو أخرى",
          "الأولوية: عادية أو عالية أو حرجة",
          "وصف مفصل للمشكلة",
          "خطوات إعادة إنتاج الخطأ",
          "لقطة شاشة أو سجل أو مستند كمرفق",
        ],
        icon: ClipboardList,
      },
      {
        title: "التثبيت والتهيئة",
        body: "النشر والنطاق ومتغيرات البيئة وتكاملات API ومصادقة Firebase وتفعيل الترخيص وإعدادات التشغيل.",
        icon: Wrench,
      },
      {
        title: "خطأ ومشكلة تقنية",
        body: "تطبيق غير متاح أو سلوك غير صحيح أو خطأ في البيانات أو تراجع في وحدة أو تعارض في التكامل.",
        icon: LifeBuoy,
      },
      {
        title: "طوارئ حرجة",
        body: "تعطل كامل أو حادث يمنع عملية أساسية. أولوية الرد وآجال التدخل محددة في العقد.",
        icon: AlertCircle,
      },
    ],
  },
  faq: {
    eyebrow: "DEPXPRES / الأسئلة الشائعة",
    title: "الإجابات قبل النشر.",
    intro: "الحقوق الدقيقة والتهيئة التقنية وشروط الدعم تؤكد في العقد قبل التوقيع والدفع.",
    icon: CircleHelp,
    accent: "cyan",
    sections: [
      { title: "ماذا يتضمن DepXpreS بالضبط؟", body: "DepXpreS نظام برمجي يتكون من أربعة تطبيقات: العميل والسائق والشركة والإدارة. الأربعة مشمولة في التراخيص الثلاثة المتاحة.", icon: Check },
      { title: "هل التطبيقات الأربعة مشمولة؟", body: "نعم. التطبيقات الأربعة — العميل والسائق والشركة والإدارة — مشمولة في التراخيص الثلاثة (Independent بـ 1,000 $ وAssisted بـ 2,000 $ وMulti-domain بـ 10,000 $ أمريكي). الكود المصدري الكامل للتطبيقات الأربعة يسلم مع كل خطة.", icon: Check },
      { title: "كيف أطلب ترخيص Enterprise (Multi-domain)؟", body: "استخدم نموذج طلب الترخيص في صفحة الشراء، باختيار خطة Multi-domain. الشروط — عدد النطاقات والعلامات والدعم — تحدد في العقد قبل أي دفع.", icon: Check },
      { title: "كيف أحصل على مساعدة في التثبيت؟", body: "مع ترخيص Assisted (2,000 $)، المساعدة في التثبيت مشمولة لستة أشهر. مع ترخيص Independent (1,000 $)، يسلم توثيق التثبيت والمساعدة دعم مدفوع، حسب الشروط المحددة في العقد.", icon: Check },
      { title: "هل الكود المصدري مشمول؟", body: "نعم. الخطط الثلاث تشمل الكود المصدري الكامل للتطبيقات الأربعة. عقد الترخيص يحدد حقوق الاستخدام والتعديل والنشر.", icon: Check },
      { title: "هل يمكنني استخدام علامتي الخاصة؟", body: "نعم. صمم DepXpreS لينشر تحت علامتك، باسمك ونطاقك المصرح به وهويتك البصرية.", icon: Check },
      { title: "هل يمكنني تعديل الكود؟", body: "نعم، ضمن الحدود المحددة في عقد ترخيصك. حقوق التعديل وإعادة التوزيع وإعادة البيع تختلف حسب الخطة المختارة.", icon: Check },
      { title: "كم عدد النطاقات المسموح بها؟", body: "ترخيصا 1,000 $ و2,000 $ يسمحان بنطاق واحد. ترخيص 10,000 $ يغطي عدة نطاقات حسب الشروط المذكورة في العقد.", icon: Check },
      { title: "كيف يعمل التفعيل؟", body: "تستلم رمز تفعيل فريدا بعد تأكيد الدفع. يرتبط هذا الرمز بالنطاق المعلن عند الشراء ويتحقق منه عند أول تشغيل للنظام.", icon: Check },
      { title: "هل أحتاج إلى خادم خاص بي؟", body: "نعم. تنشر النظام على استضافتك الخاصة (Vercel أو VPS أو خادم Node.js). ويستخدم Firebase للمصادقة وقاعدة البيانات.", icon: Check },
      { title: "ما واجهات API التي يجب ضبطها؟", body: "Google Maps API للخرائط، وFirebase للمصادقة وقاعدة البيانات، وStripe أو PayPal للمدفوعات، واختياريا SendGrid/Twilio للتنبيهات.", icon: Check },
      { title: "هل المدفوعات مدمجة مسبقا؟", body: "النظام يتضمن تكامل Stripe وPayPal. يجب أن تنشئ حساباتك لدى هذين المزودين وتقدم مفاتيح API عند النشر.", icon: Check },
      { title: "ماذا يشمل دعم الستة أشهر؟", body: "دعم ترخيص 2,000 $ يغطي المساعدة في التثبيت وضبط واجهات API وحل المشاكل التقنية والحوادث الشائعة. الآجال والشروط مذكورة في العقد.", icon: Check },
      { title: "ماذا يحدث بعد الستة أشهر؟", body: "عند انتهاء الدعم المشمول، يمكنك طلب تمديد مدفوع. الشروط والأسعار تحدد عند التجديد.", icon: Check },
      { title: "كيف أستلم التحديثات؟", body: "شروط التحديث محددة في عقد الترخيص. اتصل بنا لمعرفة الشروط المطبقة على خطتك.", icon: Check },
      { title: "ما المسؤوليات القانونية التي أتحملها؟", body: "بصفتك مشغلا مستقلا، أنت مسؤول عن الامتثال القانوني في بلدك: حماية البيانات وقواعد النقل والضرائب وأي لائحة محلية مطبقة.", icon: Check },
      { title: "هل الترخيص امتياز؟", body: "لا. إنه ترخيص برمجي مستقل. لا مشاركة إيرادات ولا شراكة إلزامية مع Benniscom.", icon: Check },
    ],
  },
  contact: {
    eyebrow: "DEPXPRES / اتصل بنا",
    title: "لنتحدث عن سوقك.",
    intro: "صف بلدك ونطاقك وعدد العمليات المستهدفة ومستوى المرافقة المطلوب. سنوجهك إلى الخطة المناسبة والخطوات التالية.",
    icon: Send,
    accent: "cyan",
    sections: [
      {
        title: "معلومات تحضرها قبل الاتصال",
        body: "كلما كان طلبك أدق، أسرعنا في تقييم الخطة الأنسب لمشروعك.",
        bullets: [
          "السوق المستهدف: البلد أو المدينة أو المنطقة الرئيسية",
          "الخدمات المستهدفة: التوصيل أو الرحلات أو كلاهما",
          "العلامة المخططة والنطاق المخطط",
          "عدد الأسواق أو النطاقات المطلوبة",
          "مستوى الاستقلالية التقنية لفريقك",
          "التكاملات الخاصة المطلوبة",
          "الميزانية وموعد الإطلاق المخطط",
        ],
        icon: FileText,
      },
      {
        title: "الرد التجاري",
        body: "بعد استلام طلبك، نوضح الحقوق التعاقدية وحدود النطاقات وجدول التسليم وشروط الدعم قبل أي دفع.",
        icon: Headphones,
      },
      {
        title: "البريد الإلكتروني للاتصال",
        body: "contact@benniscom.com — لأي طلب تجاري أو تقني أو تعاقدي. الرد خلال 48 ساعة عمل.",
        icon: Send,
      },
    ],
  },
};

const pageData: Record<Language, Record<PageKind, PageData>> = {
  fr: pageDataFr,
  en: pageDataEn,
  ar: pageDataAr,
};

// ─── Libellés des visuels (fonctionnement, achat, licences) ─────────────────

type FlowVisual = { title: string; icon: typeof ArrowRight; steps: string[] };

const fonctionnementFlowsI18n: Record<Language, FlowVisual[]> = {
  fr: [
    { title: "Livraison", icon: PackageCheck, steps: ["Client", "Commande", "Commerce", "Acceptation", "Préparation", "Dispatch", "Chauffeur", "Livraison", "Confirmation", "Historique"] },
    { title: "VTC", icon: Navigation, steps: ["Client", "Demande", "Géolocalisation", "Dispatch", "Chauffeur", "Acceptation", "Prise en charge", "Trajet", "Fin de course"] },
    { title: "Commercial", icon: Store, steps: ["Partenaire", "Catalogue", "Produits", "Commandes", "Préparation", "Remise au chauffeur", "Livraison"] },
    { title: "Administration", icon: Gauge, steps: ["Admin", "Supervision", "Utilisateurs", "Zones", "Missions", "Transactions", "Rapports"] },
  ],
  en: [
    { title: "Delivery", icon: PackageCheck, steps: ["Customer", "Order", "Partner", "Acceptance", "Preparation", "Dispatch", "Driver", "Delivery", "Confirmation", "History"] },
    { title: "Rideshare", icon: Navigation, steps: ["Customer", "Request", "Geolocation", "Dispatch", "Driver", "Acceptance", "Pickup", "Trip", "Trip end"] },
    { title: "Business", icon: Store, steps: ["Partner", "Catalog", "Products", "Orders", "Preparation", "Handover to driver", "Delivery"] },
    { title: "Administration", icon: Gauge, steps: ["Admin", "Supervision", "Users", "Zones", "Missions", "Transactions", "Reports"] },
  ],
  ar: [
    { title: "التوصيل", icon: PackageCheck, steps: ["العميل", "الطلب", "المتجر", "القبول", "التحضير", "التوزيع", "السائق", "التوصيل", "التأكيد", "السجل"] },
    { title: "VTC", icon: Navigation, steps: ["العميل", "الطلب", "تحديد الموقع", "التوزيع", "السائق", "القبول", "الاستلام", "الرحلة", "نهاية الرحلة"] },
    { title: "التجاري", icon: Store, steps: ["الشريك", "الكتالوج", "المنتجات", "الطلبات", "التحضير", "التسليم للسائق", "التوصيل"] },
    { title: "الإدارة", icon: Gauge, steps: ["الإدارة", "الإشراف", "المستخدمون", "المناطق", "المهام", "المعاملات", "التقارير"] },
  ],
};

const interactionI18n: Record<Language, { title: string; noteTop: string; noteBottom: string; nodes: Array<{ label: string; sub: string }> }> = {
  fr: {
    title: "Interactions entre les 4 applications",
    noteTop: "Une même commande traverse les quatre applications : le client la crée, le partenaire la prépare, le chauffeur la livre, l'administrateur la supervise. Chaque étape met à jour les autres en temps réel.",
    noteBottom: "Client → Partenaire → Chauffeur → Admin : la commande, la mission et le paiement sont partagés par les quatre rôles, sans ressaisie.",
    nodes: [
      { label: "Client", sub: "Demande · suivi" },
      { label: "Partenaire", sub: "Préparation" },
      { label: "Chauffeur", sub: "Exécution" },
      { label: "Admin", sub: "Supervision" },
    ],
  },
  en: {
    title: "How the 4 applications interact",
    noteTop: "A single order crosses all four applications: the customer creates it, the partner prepares it, the driver delivers it, and the administrator supervises it. Every step updates the others in real time.",
    noteBottom: "Customer → Partner → Driver → Admin: the order, the mission, and the payment are shared by all four roles, with no re-entry.",
    nodes: [
      { label: "Customer", sub: "Request · tracking" },
      { label: "Partner", sub: "Preparation" },
      { label: "Driver", sub: "Execution" },
      { label: "Admin", sub: "Supervision" },
    ],
  },
  ar: {
    title: "التفاعلات بين التطبيقات الأربعة",
    noteTop: "طلب واحد يعبر التطبيقات الأربعة: العميل ينشئه، والشريك يحضره، والسائق يوصله، والمدير يشرف عليه. كل خطوة تحدث الأخرى في الوقت الحقيقي.",
    noteBottom: "العميل ← الشريك ← السائق ← الإدارة: الطلب والمهمة والدفع مشتركة بين الأدوار الأربعة دون إعادة إدخال.",
    nodes: [
      { label: "العميل", sub: "الطلب · التتبع" },
      { label: "الشريك", sub: "التحضير" },
      { label: "السائق", sub: "التنفيذ" },
      { label: "الإدارة", sub: "الإشراف" },
    ],
  },
};

const moduleTableHeadI18n: Record<Language, string[]> = {
  fr: ["Module", "Explication", "Nécessité", "Synchronisation"],
  en: ["Module", "Explanation", "Why it matters", "Sync"],
  ar: ["الوحدة", "الشرح", "الضرورة", "المزامنة"],
};

const purchaseFlowI18n: Record<Language, string[]> = {
  fr: ["Choisir", "Renseigner", "Payer", "Recevoir", "Activer", "Déployer"],
  en: ["Choose", "Enter details", "Pay", "Receive", "Activate", "Deploy"],
  ar: ["اختيار", "إدخال البيانات", "الدفع", "الاستلام", "التفعيل", "النشر"],
};

const purchaseNoteI18n: Record<Language, { none: string; selected: (name: string, price: string) => string }> = {
  fr: {
    none: "Aucune formule présélectionnée — choisissez-en une dans le formulaire ci-dessous.",
    selected: (name, price) => `Formule présélectionnée : ${name} — ${price}. Vous pouvez la modifier dans le formulaire ci-dessous.`,
  },
  en: {
    none: "No plan preselected — choose one in the form below.",
    selected: (name, price) => `Selected plan: ${name} — ${price}. You can change it in the form below.`,
  },
  ar: {
    none: "لم يتم اختيار أي خطة مسبقا — اختر واحدة في النموذج أدناه.",
    selected: (name, price) => `الخطة المختارة مسبقا: ${name} — ${price}. يمكنك تغييرها في النموذج أدناه.`,
  },
};

type LicenseCardVisual = { plan: string; name: string; price: string; accent: string; icon: typeof ArrowRight; domains: string; support: string };

const licenseCardsI18n: Record<Language, LicenseCardVisual[]> = {
  fr: [
    { plan: "independent", name: "Independent", price: "1,000", accent: "neutral", icon: FileText, domains: "1 domaine", support: "Aucun support" },
    { plan: "assisted", name: "Assisted", price: "2,000", accent: "featured", icon: Headphones, domains: "1 domaine", support: "6 mois de support" },
    { plan: "multi-domain", name: "Multi-domain", price: "10,000", accent: "gold", icon: Globe2, domains: "Multi-domaines", support: "Support sur demande" },
  ],
  en: [
    { plan: "independent", name: "Independent", price: "1,000", accent: "neutral", icon: FileText, domains: "1 domain", support: "No support" },
    { plan: "assisted", name: "Assisted", price: "2,000", accent: "featured", icon: Headphones, domains: "1 domain", support: "6 months of support" },
    { plan: "multi-domain", name: "Multi-domain", price: "10,000", accent: "gold", icon: Globe2, domains: "Multiple domains", support: "Support on demand" },
  ],
  ar: [
    { plan: "independent", name: "Independent", price: "1,000", accent: "neutral", icon: FileText, domains: "نطاق واحد", support: "بدون دعم" },
    { plan: "assisted", name: "Assisted", price: "2,000", accent: "featured", icon: Headphones, domains: "نطاق واحد", support: "6 أشهر من الدعم" },
    { plan: "multi-domain", name: "Multi-domain", price: "10,000", accent: "gold", icon: Globe2, domains: "نطاقات متعددة", support: "دعم عند الطلب" },
  ],
};

const licenseCardSourceI18n: Record<Language, string> = {
  fr: "Code source complet — 4 apps",
  en: "Full source code — 4 apps",
  ar: "الكود المصدري الكامل — 4 تطبيقات",
};

export default function InfoPage({ kind }: { kind: PageKind }) {
  const [lang, setLang] = useSiteLanguage("fr");
  const data = pageData[lang][kind];
  const Icon = data.icon;
  const t = COMMON[lang];
  const footer = FOOTER_LABELS[lang];
  const nav = NAV_LABELS[lang];
  const [open, setOpen] = useState<number | null>(kind === "faq" ? 0 : null);
  const [menuOpen, setMenuOpen] = useState(false);
  const planParam = new URLSearchParams(window.location.search).get("plan");
  const selectedPlan = ["independent", "assisted", "multi-domain"].includes(planParam ?? "") ? planParam : null;
  const planMeta: Record<string, { name: string; price: string }> = {
    independent: { name: "Independent", price: "1 000 $ USD" },
    assisted: { name: "Assisted", price: "2 000 $ USD" },
    "multi-domain": { name: "Multi-domain", price: "10 000 $ USD" },
  };
  const interaction = interactionI18n[lang];

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
              <Link href="/" className="back-link"><ArrowLeft size={14} /> {t.backHome}</Link>
              <div className="eyebrow"><span className="eyebrow-dot" />{data.eyebrow}</div>
              <h1>{data.title}</h1>
              <p>{data.intro}</p>
            </div>
            <div className="info-hero-icon"><Icon size={58} strokeWidth={1.2} /><span>DEPXPRES<br />SYSTEM LAYER</span></div>
          </div>
        </section>

        {/* Applications: app cards + workflow visual */}
        {kind === "applications" && (
          <section className="page-width info-app-grid">
            {appCardsI18n[lang].map((app) => {
              const AppIcon = app.icon;
              return (
                <article className="info-app-card" key={app.name}>
                  <div className="info-card-icon"><AppIcon size={21} /></div>
                  <span>{app.label}</span>
                  <h2>{app.name}</h2>
                  <p>{app.body}</p>
                  <div className="info-app-links">
                    <a href={app.demoUrl} target="_blank" rel="noopener">{t.seeDemo} <ArrowRight size={14} /></a>
                    <Link href={app.detailUrl}>{t.detailLink} <ArrowRight size={14} /></Link>
                    <Link href="/fonctionnement">{t.seeWorkflow} <ArrowRight size={14} /></Link>
                  </div>
                </article>
              );
            })}
          </section>
        )}

        {/* Fonctionnement : les 4 workflows en diagrammes + schéma d'interactions */}
        {kind === "fonctionnement" && (
          <section className="page-width">
            {fonctionnementFlowsI18n[lang].map((flow) => {
              const FlowIcon = flow.icon;
              return (
                <div className="workflow-block" key={flow.title}>
                  <h3 className="workflow-block-title"><FlowIcon size={18} /> {flow.title}</h3>
                  <div className="purchase-flow">
                    {flow.steps.map((step, index) => (
                      <div className="purchase-step" key={step}>
                        <span className="purchase-step-num">{String(index + 1).padStart(2, "0")}</span>
                        <span className="purchase-step-label">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
            <div className="workflow-block">
              <h3 className="workflow-block-title"><Layers3 size={18} /> {interaction.title}</h3>
              <p className="workflow-block-note">{interaction.noteTop}</p>
              <div className="flow-diagram">
                {interaction.nodes.map((node, index) => {
                  const NodeIcon = [UsersRound, Store, Truck, Radar][index];
                  return (
                    <div className="flow-node" key={node.label}><div className="flow-icon"><NodeIcon size={20} /></div><strong>{node.label}</strong><span>{node.sub}</span></div>
                  );
                })}
              </div>
              <p className="workflow-block-note">{interaction.noteBottom}</p>
            </div>
          </section>
        )}

        {/* Modules: table */}
        {kind === "modules" && (
          <section className="page-width module-table-page">
            <div className="module-table-head">
              {moduleTableHeadI18n[lang].map((head) => <span key={head}>{head}</span>)}
            </div>
            {moduleRowsI18n[lang].map(([name, explanation, necessity, sync, ModuleIcon]) => (
              <article className="module-table-row" key={name}>
                <div className="module-name"><ModuleIcon size={18} /><strong>{name}</strong></div>
                <p>{explanation}</p>
                <p>{necessity}</p>
                <span className="module-sync">{sync}</span>
              </article>
            ))}
          </section>
        )}

        {/* Purchase: workflow visual */}
        {kind === "purchase" && (
          <section className="page-width purchase-steps-visual">
            <div className="purchase-flow">
              {[
                { step: "01", icon: BadgeCheck },
                { step: "02", icon: FileText },
                { step: "03", icon: CreditCard },
                { step: "04", icon: Download },
                { step: "05", icon: Key },
                { step: "06", icon: Zap },
              ].map(({ step, icon: StepIcon }, index) => (
                <div className="purchase-step" key={step}>
                  <div className="purchase-step-icon"><StepIcon size={20} /></div>
                  <span className="purchase-step-num">{step}</span>
                  <span className="purchase-step-label">{purchaseFlowI18n[lang][index]}</span>
                </div>
              ))}
            </div>
            <div className="purchase-plan-picker">
              {(["independent", "assisted", "multi-domain"] as const).map((key) => (
                <div key={key} className={`purchase-plan-chip ${selectedPlan === key ? "purchase-plan-chip-selected" : ""}`}>
                  <strong>{planMeta[key].name}</strong>
                  <span>{planMeta[key].price}</span>
                  {selectedPlan === key && <span> — {t.selected}</span>}
                </div>
              ))}
            </div>
            <p className="purchase-selected-note">
              {selectedPlan
                ? purchaseNoteI18n[lang].selected(planMeta[selectedPlan].name, planMeta[selectedPlan].price)
                : purchaseNoteI18n[lang].none}
            </p>
          </section>
        )}

        {/* Licenses: pricing cards */}
        {kind === "licenses" && (
          <section className="page-width licenses-cards-visual">
            <div className="pricing-grid">
              {licenseCardsI18n[lang].map((plan) => {
                const PlanIcon = plan.icon;
                return (
                  <article className={`pricing-card pricing-${plan.accent}`} key={plan.name}>
                    {plan.accent === "featured" && <div className="featured-ribbon">{t.mostChosen}</div>}
                    <div className="plan-top"><PlanIcon size={19} /></div>
                    <span className="plan-name">{plan.name}</span>
                    <div className="plan-price"><span>$</span>{plan.price}<small>USD</small></div>
                    <div className="plan-rule" />
                    <ul>
                      <li><Check size={15} />{licenseCardSourceI18n[lang]}</li>
                      <li><Check size={15} />{plan.domains}</li>
                      <li><Check size={15} />{plan.support}</li>
                    </ul>
                    <Link href={`/purchase?plan=${plan.plan}`} className={`plan-button ${plan.accent === "featured" ? "plan-button-bright" : ""}`}>
                      {t.chooseLicense} <ArrowRight size={16} />
                    </Link>
                  </article>
                );
              })}
            </div>
          </section>
        )}

        {/* Formulaires réels (Lot 2) — /purchase, /support, /contact */}
        {kind === "purchase" && (
          <section className="page-width form-section-wrap">
            <LicenseRequestForm initialPlan={(selectedPlan as "independent" | "assisted" | "multi-domain" | null) ?? "independent"} lang={lang} />
          </section>
        )}
        {kind === "support" && (
          <section className="page-width form-section-wrap">
            <SupportForm lang={lang} />
          </section>
        )}
        {kind === "contact" && (
          <section className="page-width form-section-wrap">
            <ContactForm lang={lang} />
          </section>
        )}

        {/* Sections communes */}
        <section className={`page-width info-sections ${kind === "modules" ? "info-sections-after-table" : ""}`}>
          {data.sections.map((section, index) => {
            const SectionIcon = section.icon || Icon;
            const isFaq = kind === "faq";
            const expanded = open === index;
            return (
              <article className={`info-section-card ${isFaq ? "info-faq-card" : ""}`} key={section.title}>
                <button className="info-section-trigger" onClick={() => isFaq ? setOpen(expanded ? null : index) : undefined}>
                  <span className="info-section-title">
                    <span className="info-section-icon"><SectionIcon size={18} /></span>
                    <strong>{section.title}</strong>
                  </span>
                  {isFaq ? <ChevronDown size={18} className={expanded ? "faq-chevron-open" : ""} /> : <span className="info-section-number">0{index + 1}</span>}
                </button>
                {(!isFaq || expanded) && (
                  <div className="info-section-body">
                    <p>{section.body}</p>
                    {section.bullets && (
                      <ul>{section.bullets.map((bullet) => <li key={bullet}><Check size={15} />{bullet}</li>)}</ul>
                    )}
                  </div>
                )}
              </article>
            );
          })}
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
