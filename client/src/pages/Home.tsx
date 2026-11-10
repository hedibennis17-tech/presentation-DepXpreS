import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Bike,
  Boxes,
  Check,
  ChevronDown,
  CircleHelp,
  CircleUserRound,
  Code2,
  Compass,
  CreditCard,
  Gauge,
  Globe2,
  Headphones,
  Layers3,
  MapPinned,
  Menu,
  PackageCheck,
  Radar,
  ScanLine,
  ShieldCheck,
  Sparkles,
  Store,
  Truck,
  UsersRound,
  X,
  Zap,
} from "lucide-react";
import { Link } from "wouter";
import { FOOTER_LABELS } from "@/lib/i18n";

type Language = "fr" | "en" | "ar";

type IconComponent = typeof ArrowRight;

const ui = {
  fr: {
    language: "Langue",
    nav: ["Accueil", "Plateforme", "Applications", "Fonctionnement", "Modules", "Architecture", "Tarification", "Acheter", "Installation", "FAQ", "Assistance", "Contact", "À propos"],
    signIn: "Espace client",
    heroKicker: "DEPXPRES / LICENCE LOGICIELLE INTERNATIONALE",
    heroTitle: "Achetez le système. Opérez sous votre marque.",
    heroBody:
      "DepXpreS est un logiciel complet de mobilité, livraison et commerce. Vous achetez une licence indépendante, recevez le code source et déployez votre propre opération sur votre domaine — sans franchise obligatoire ni partage de revenus.",
    explore: "Explorer la plateforme",
    compare: "Voir les licences",
    live: "Architecture connectée",
    liveDetail: "Un seul système. Chaque opération synchronisée.",
    commercialModel: "MODÈLE COMMERCIAL",
    licensedSoftware: "Licence logicielle indépendante",
    sourceIncluded: "Code source inclus",
    noRevenueShare: "Sans partage de revenus",
    fourApps: "4 applications incluses",
    oneDomain: "Domaine autorisé selon la formule",
    supportOptions: "Support selon la licence choisie",
    appsEyebrow: "01 / ÉCOSYSTÈME",
    appsTitle: "Quatre expériences.\nUn même moteur.",
    appsBody: "DepXpreS relie les clients, chauffeurs, partenaires et opérateurs dans une seule infrastructure opérationnelle.",
    modulesEyebrow: "02 / CONTROL LAYER",
    modulesTitle: "Les modules qui font\ntourner votre activité.",
    modulesBody: "Activez les briques dont votre marché a besoin. Chaque module partage les mêmes comptes, zones, commandes et événements.",
    architecture: "Le système en mouvement",
    architectureBody: "De la demande à la livraison, chaque étape est visible, traçable et pilotable.",
    plansEyebrow: "03 / LICENCES",
    plansTitle: "Choisissez votre niveau\nd'indépendance.",
    plansBody: "Le code source est inclus dans les trois offres. Vous exploitez votre propre marque, votre domaine et votre opération.",
    perDomain: "par domaine autorisé",
    buy: "Choisir cette licence",
    featured: "La plus choisie",
    activationEyebrow: "04 / ACTIVATION",
    activationTitle: "Du code à votre marché\nen quelques étapes claires.",
    ctaTitle: "Prêt à lancer votre propre réseau ?",
    ctaBody: "Parlons de votre marché, de vos domaines et du niveau d'accompagnement dont votre équipe a besoin.",
    contact: "Parler à un spécialiste",
    footerNote: "Logiciel de mobilité, livraison et opérations — conçu au Canada, pensé pour l'international.",
    faqTitle: "Questions essentielles",
    faqBody: "Les détails qui comptent avant de déployer.",
    allModules: "Tous les modules",
    learnMore: "Voir le module",
    synced: "Synchronisé",
    online: "En ligne",
    demos: "Voir les démos",
    viewDemo: "Voir la démo",
    detailLink: "Fiche détaillée",
    demoBadge: "DÉMO",
    demoNote: "Données de démonstration",
    consoleTitle: "Centre de contrôle",
    consoleActive: "Missions actives",
    consoleOnTime: "Taux à l'heure",
    consolePartners: "Partenaires en ligne",
    consoleOnline: "En ligne",
    consoleStable: "Stable",
    consoleUpdated: "Mis à jour à l'instant",
    consoleDispatch: "Couche de dispatch",
    flowRequest: "Demande",
    flowRequestSub: "Intention client",
    flowCore: "DepXpreS Core",
    flowCoreSub: "Couche de décision",
    flowAction: "Action",
    flowActionSub: "Chauffeur + partenaire",
    flowInsight: "Aperçu",
    flowInsightSub: "Intelligence admin",
    archBadge: "Conçu pour les opérations multi-marchés",
    pricingNote: "Tarifs en USD. Taxes, conditions contractuelles, domaines autorisés et portée du support confirmés avant paiement.",
    activationBody: "Un parcours de déploiement conçu pour garder les détails opérationnels visibles à chaque étape.",
    multiDomainNote: "Licence multi-domaines",
    moduleTag: "MODULE",
    ecoClient: "Client",
    ecoClientSub: "Demande",
    ecoDriver: "Chauffeur",
    ecoDriverSub: "Déplacement",
    ecoPartner: "Partenaire",
    ecoPartnerSub: "Préparation",
    ecoAdmin: "Admin",
    ecoAdminSub: "Contrôle",
  },
  en: {
    language: "Language",
    nav: ["Home", "Platform", "Applications", "How it works", "Modules", "Architecture", "Pricing", "Buy", "Installation", "FAQ", "Support", "Contact", "About"],
    signIn: "Customer portal",
    heroKicker: "DEPXPRES / INTERNATIONAL SOFTWARE LICENSE",
    heroTitle: "Buy the system. Operate under your brand.",
    heroBody:
      "DepXpreS is a complete mobility, delivery, and commerce software system. Buy an independent license, receive the source code, and deploy your own operation on your domain — with no required franchise or revenue sharing.",
    explore: "Explore the platform",
    compare: "View licenses",
    live: "Connected architecture",
    liveDetail: "One system. Every operation synchronized.",
    commercialModel: "COMMERCIAL MODEL",
    licensedSoftware: "Independent software license",
    sourceIncluded: "Source code included",
    noRevenueShare: "No revenue sharing",
    fourApps: "4 applications included",
    oneDomain: "Authorized domain by plan",
    supportOptions: "Support according to your license",
    appsEyebrow: "01 / ECOSYSTEM",
    appsTitle: "Four experiences.\nOne operating engine.",
    appsBody: "DepXpreS connects customers, drivers, partners, and operators through one operational infrastructure.",
    modulesEyebrow: "02 / CONTROL LAYER",
    modulesTitle: "The modules that keep\nyour operation moving.",
    modulesBody: "Activate the building blocks your market needs. Every module shares the same accounts, zones, orders, and events.",
    architecture: "The system in motion",
    architectureBody: "From request to delivery, every step is visible, traceable, and controllable.",
    plansEyebrow: "03 / LICENSES",
    plansTitle: "Choose your level\nof independence.",
    plansBody: "Source code is included in all three offers. Run your own brand, domain, and operation.",
    perDomain: "per authorized domain",
    buy: "Choose this license",
    featured: "Most popular",
    activationEyebrow: "04 / ACTIVATION",
    activationTitle: "From source code to your market\nin a few clear steps.",
    ctaTitle: "Ready to launch your own network?",
    ctaBody: "Tell us about your market, domains, and the level of guidance your team needs.",
    contact: "Talk to a specialist",
    footerNote: "Mobility, delivery, and operations software — built in Canada, designed for the world.",
    faqTitle: "Essential questions",
    faqBody: "The details that matter before you deploy.",
    allModules: "All modules",
    learnMore: "View module",
    synced: "Synchronized",
    online: "Online",
    demos: "View the demos",
    viewDemo: "View the demo",
    detailLink: "Detailed overview",
    demoBadge: "DEMO",
    demoNote: "Demonstration data",
    consoleTitle: "Control center",
    consoleActive: "Active missions",
    consoleOnTime: "On-time rate",
    consolePartners: "Live partners",
    consoleOnline: "Online",
    consoleStable: "Stable",
    consoleUpdated: "Updated just now",
    consoleDispatch: "Dispatch layer",
    flowRequest: "Request",
    flowRequestSub: "Client intent",
    flowCore: "DepXpreS Core",
    flowCoreSub: "Decision layer",
    flowAction: "Action",
    flowActionSub: "Driver + partner",
    flowInsight: "Insight",
    flowInsightSub: "Admin intelligence",
    archBadge: "Built for multi-market operations",
    pricingNote: "Pricing in USD. Taxes, contract terms, authorized domains and support scope are confirmed before payment.",
    activationBody: "A deployment path designed to keep the operational details visible at every step.",
    multiDomainNote: "Multi-domain license",
    moduleTag: "MODULE",
    ecoClient: "Customer",
    ecoClientSub: "Request",
    ecoDriver: "Driver",
    ecoDriverSub: "Move",
    ecoPartner: "Partner",
    ecoPartnerSub: "Prepare",
    ecoAdmin: "Admin",
    ecoAdminSub: "Control",
  },
  ar: {
    language: "اللغة",
    nav: ["الرئيسية", "المنصة", "التطبيقات", "كيف يعمل", "الوحدات", "البنية", "الأسعار", "شراء", "التثبيت", "الأسئلة الشائعة", "الدعم", "اتصل بنا", "من نحن"],
    signIn: "بوابة العميل",
    heroKicker: "DEPXPRES / ترخيص برمجي دولي",
    heroTitle: "اشترِ النظام. شغّل عملياتك تحت علامتك.",
    heroBody:
      "DepXpreS هو نظام برمجي متكامل للتنقل والتوصيل والتجارة. اشترِ ترخيصا مستقلا، واحصل على الكود المصدري، وانشر عملياتك على نطاقك دون امتياز إلزامي أو مشاركة في الإيرادات.",
    explore: "اكتشف المنصة",
    compare: "عرض التراخيص",
    live: "بنية مترابطة",
    liveDetail: "نظام واحد. كل عملية متزامنة.",
    commercialModel: "النموذج التجاري",
    licensedSoftware: "ترخيص برمجي مستقل",
    sourceIncluded: "الكود المصدري مشمول",
    noRevenueShare: "بدون مشاركة الإيرادات",
    fourApps: "أربعة تطبيقات مشمولة",
    oneDomain: "نطاق مصرح حسب الخطة",
    supportOptions: "دعم حسب الترخيص المختار",
    appsEyebrow: "01 / المنظومة",
    appsTitle: "أربع تجارب.\nمحرك تشغيلي واحد.",
    appsBody: "تربط DepXpreS العملاء والسائقين والشركاء والمشغلين ضمن بنية تشغيلية واحدة.",
    modulesEyebrow: "02 / طبقة التحكم",
    modulesTitle: "الوحدات التي تحرك\nعملياتك اليومية.",
    modulesBody: "فعّل المكونات التي يحتاجها سوقك. كل وحدة تشارك الحسابات والمناطق والطلبات والأحداث نفسها.",
    architecture: "النظام أثناء العمل",
    architectureBody: "من الطلب إلى التسليم، كل خطوة مرئية وقابلة للتتبع والتحكم.",
    plansEyebrow: "03 / التراخيص",
    plansTitle: "اختر مستوى\nاستقلاليتك.",
    plansBody: "الكود المصدري مشمول في العروض الثلاثة. شغّل علامتك التجارية ونطاقك وعملياتك الخاصة.",
    perDomain: "لكل نطاق مصرح",
    buy: "اختر هذا الترخيص",
    featured: "الأكثر اختيارا",
    activationEyebrow: "04 / التفعيل",
    activationTitle: "من الكود إلى سوقك\nفي خطوات واضحة.",
    ctaTitle: "هل أنت مستعد لإطلاق شبكتك الخاصة؟",
    ctaBody: "حدثنا عن سوقك ونطاقاتك ومستوى الإرشاد الذي يحتاجه فريقك.",
    contact: "تحدث مع متخصص",
    footerNote: "برمجيات التنقل والتوصيل والعمليات — طُورت في كندا للعالم.",
    faqTitle: "أسئلة أساسية",
    faqBody: "التفاصيل المهمة قبل الإطلاق.",
    allModules: "كل الوحدات",
    learnMore: "عرض الوحدة",
    synced: "متزامن",
    online: "متصل",
    demos: "عرض النسخ التجريبية",
    viewDemo: "عرض النسخة التجريبية",
    detailLink: "نظرة مفصلة",
    demoBadge: "عرض",
    demoNote: "بيانات تجريبية",
    consoleTitle: "مركز التحكم",
    consoleActive: "مهام نشطة",
    consoleOnTime: "نسبة الالتزام بالوقت",
    consolePartners: "شركاء متصلون",
    consoleOnline: "متصل",
    consoleStable: "مستقر",
    consoleUpdated: "حدث الآن",
    consoleDispatch: "طبقة التوزيع",
    flowRequest: "الطلب",
    flowRequestSub: "نية العميل",
    flowCore: "DepXpreS Core",
    flowCoreSub: "طبقة القرار",
    flowAction: "التنفيذ",
    flowActionSub: "السائق + الشريك",
    flowInsight: "رؤية",
    flowInsightSub: "ذكاء الإدارة",
    archBadge: "مصمم للعمليات متعددة الأسواق",
    pricingNote: "الأسعار بالدولار الأمريكي. الضرائب والشروط التعاقدية والنطاقات المصرح بها ونطاق الدعم تؤكد قبل الدفع.",
    activationBody: "مسار نشر مصمم لإبقاء التفاصيل التشغيلية مرئية في كل خطوة.",
    multiDomainNote: "ترخيص متعدد النطاقات",
    moduleTag: "وحدة",
    ecoClient: "العميل",
    ecoClientSub: "الطلب",
    ecoDriver: "السائق",
    ecoDriverSub: "التنقل",
    ecoPartner: "الشريك",
    ecoPartnerSub: "التحضير",
    ecoAdmin: "الإدارة",
    ecoAdminSub: "التحكم",
  },
} as const;

const appContent = {
  fr: [
    { tag: "CLIENT", title: "Commandez. Suivez. Revenez.", body: "Une expérience fluide pour réserver une course, commander, payer et suivre chaque étape.", icon: CircleUserRound, tone: "cyan" },
    { tag: "CHAUFFEUR", title: "Chaque mission, au bon moment.", body: "Disponibilité, dispatching, navigation, preuve de service et revenus dans une seule app.", icon: Bike, tone: "violet" },
    { tag: "PARTENAIRE", title: "Votre commerce, en mouvement.", body: "Catalogue, stocks, commandes, promotions et rapports pour les entreprises connectées.", icon: Store, tone: "lime" },
    { tag: "ADMINISTRATION", title: "Le centre de gravité.", body: "Supervisez les opérations, les zones, les comptes, les paiements et les performances.", icon: Gauge, tone: "amber" },
  ],
  en: [
    { tag: "CUSTOMER", title: "Request. Track. Return.", body: "A smooth experience to book a ride, order, pay, and follow every step.", icon: CircleUserRound, tone: "cyan" },
    { tag: "DRIVER", title: "Every mission, right on time.", body: "Availability, dispatch, navigation, proof of service, and earnings in one app.", icon: Bike, tone: "violet" },
    { tag: "PARTNER", title: "Your business, in motion.", body: "Catalog, inventory, orders, promotions, and reports for connected businesses.", icon: Store, tone: "lime" },
    { tag: "ADMINISTRATION", title: "The center of gravity.", body: "Supervise operations, zones, accounts, payments, and performance from one place.", icon: Gauge, tone: "amber" },
  ],
  ar: [
    { tag: "العميل", title: "اطلب. تتبع. عد.", body: "تجربة بسيطة لحجز رحلة وطلب المنتجات والدفع ومتابعة كل خطوة.", icon: CircleUserRound, tone: "cyan" },
    { tag: "السائق", title: "كل مهمة في وقتها.", body: "التوفر والتوزيع والملاحة وإثبات الخدمة والأرباح في تطبيق واحد.", icon: Bike, tone: "violet" },
    { tag: "الشريك", title: "تجارتك تتحرك.", body: "الكتالوج والمخزون والطلبات والعروض والتقارير للشركات المتصلة.", icon: Store, tone: "lime" },
    { tag: "الإدارة", title: "مركز الثقل.", body: "أشرف على العمليات والمناطق والحسابات والمدفوعات والأداء.", icon: Gauge, tone: "amber" },
  ],
} as const;

const moduleContent = {
  fr: [
    ["Rideshare", "De la demande à la clôture, orchestrez chaque trajet.", "Client · Chauffeur · Admin", MapPinned],
    ["Livraison", "Préparation, collecte, dispatch et confirmation en temps réel.", "Client · Partenaire · Chauffeur", PackageCheck],
    ["Dispatching", "Affectez la bonne mission au bon opérateur, sans friction.", "Admin · Chauffeur", Radar],
    ["Entreprises", "Gérez les partenaires, commerces et succursales connectés.", "Partenaire · Admin", Store],
    ["Produits", "Catalogue, catégories, variantes, prix et disponibilités.", "Partenaire · Admin", Boxes],
    ["Zones", "Définissez les secteurs, rayons et couvertures de service.", "Admin", Compass],
    ["Scanner", "Accélérez la préparation avec les codes-barres et QR.", "Partenaire · Chauffeur", ScanLine],
    ["Promotions", "Créez des codes, campagnes et offres qui convertissent.", "Partenaire · Admin", Sparkles],
    ["Commandes", "Validez, préparez, attribuez, livrez et gardez l'historique.", "Tous les rôles", Layers3],
    ["Paiements", "Connectez vos moyens de paiement et suivez les transactions.", "Client · Admin", CreditCard],
    ["Rapports", "Transformez les opérations en indicateurs actionnables.", "Admin · Partenaire", BarChart3],
    ["Sécurité", "Rôles, permissions, journalisation et activation protégée.", "Tous les rôles", ShieldCheck],
  ],
  en: [
    ["Rideshare", "Orchestrate every trip from request to completion.", "Customer · Driver · Admin", MapPinned],
    ["Delivery", "Preparation, pickup, dispatch, and confirmation in real time.", "Customer · Partner · Driver", PackageCheck],
    ["Dispatch", "Assign the right mission to the right operator, without friction.", "Admin · Driver", Radar],
    ["Businesses", "Manage connected partners, merchants, and branches.", "Partner · Admin", Store],
    ["Products", "Catalog, categories, variants, prices, and availability.", "Partner · Admin", Boxes],
    ["Zones", "Define service sectors, radiuses, and geographic coverage.", "Admin", Compass],
    ["Scanner", "Speed up preparation with barcodes and QR codes.", "Partner · Driver", ScanLine],
    ["Promotions", "Create codes, campaigns, and offers that convert.", "Partner · Admin", Sparkles],
    ["Orders", "Validate, prepare, assign, deliver, and keep the history.", "Every role", Layers3],
    ["Payments", "Connect payment methods and monitor every transaction.", "Customer · Admin", CreditCard],
    ["Reporting", "Turn operations into actionable performance indicators.", "Admin · Partner", BarChart3],
    ["Security", "Roles, permissions, audit logs, and protected activation.", "Every role", ShieldCheck],
  ],
  ar: [
    ["الرحلات", "أدر كل رحلة من الطلب حتى الإغلاق.", "العميل · السائق · الإدارة", MapPinned],
    ["التوصيل", "التحضير والاستلام والتوزيع والتأكيد في الوقت الحقيقي.", "العميل · الشريك · السائق", PackageCheck],
    ["التوزيع", "خصص المهمة المناسبة للمشغل المناسب بسهولة.", "الإدارة · السائق", Radar],
    ["الشركات", "أدر الشركاء والمتاجر والفروع المتصلة.", "الشريك · الإدارة", Store],
    ["المنتجات", "الكتالوج والفئات والأسعار والتوفر.", "الشريك · الإدارة", Boxes],
    ["المناطق", "حدد القطاعات ونطاقات الخدمة والتغطية الجغرافية.", "الإدارة", Compass],
    ["الماسح", "سرّع التحضير باستخدام الباركود ورموز QR.", "الشريك · السائق", ScanLine],
    ["العروض", "أنشئ رموزا وحملات وعروضا فعالة.", "الشريك · الإدارة", Sparkles],
    ["الطلبات", "تحقق وحضر وخصص وسلم واحتفظ بالسجل.", "كل الأدوار", Layers3],
    ["الدفع", "اربط وسائل الدفع وتابع المعاملات.", "العميل · الإدارة", CreditCard],
    ["التقارير", "حول العمليات إلى مؤشرات قابلة للتنفيذ.", "الإدارة · الشريك", BarChart3],
    ["الأمان", "أدوار وصلاحيات وسجلات وتفعيل محمي.", "كل الأدوار", ShieldCheck],
  ],
} as const;

const plans = [
  { plan: "independent", name: "Independent", price: "1,000", accent: "neutral" },
  { plan: "assisted", name: "Assisted", price: "2,000", accent: "featured" },
  { plan: "multi-domain", name: "Multi-domain", price: "10,000", accent: "gold" },
];

// Descriptions et caractéristiques des 3 formules, dans les 3 langues
// (auparavant en français dans les 3 langues).
const plansI18n: Record<Language, Array<{ description: string; features: string[] }>> = {
  fr: [
    { description: "Pour les équipes techniques autonomes qui veulent lancer sans dépendance.", features: ["Code source complet des 4 apps", "1 domaine autorisé", "1 activation de licence", "Documentation d'installation", "Aucun support technique inclus"] },
    { description: "Pour démarrer accompagné avec six mois de soutien technique inclus.", features: ["Tout ce qui est inclus dans Independent", "Assistance à l'installation & configuration", "Aide APIs et variables d'environnement", "Six mois de soutien technique", "Dépannage couvert selon contrat"] },
    { description: "Pour opérer plusieurs marques, régions ou marchés sous une seule licence.", features: ["Code source complet des 4 apps", "Plusieurs domaines autorisés", "Gestion des activations multi-domaines", "Soutien technique sur demande", "Convient aux agences & opérateurs multi-marchés"] },
  ],
  en: [
    { description: "For autonomous technical teams that want to launch without dependencies.", features: ["Full source code of the 4 apps", "1 authorized domain", "1 license activation", "Installation documentation", "No technical support included"] },
    { description: "To start with guidance, with six months of technical support included.", features: ["Everything included in Independent", "Installation & configuration assistance", "Help with APIs and environment variables", "Six months of technical support", "Troubleshooting covered by contract"] },
    { description: "To operate multiple brands, regions, or markets under a single license.", features: ["Full source code of the 4 apps", "Multiple authorized domains", "Multi-domain activation management", "Technical support on demand", "Suited to agencies & multi-market operators"] },
  ],
  ar: [
    { description: "للفرق التقنية المستقلة التي تريد الإطلاق دون تبعية.", features: ["الكود المصدري الكامل للتطبيقات الأربعة", "نطاق واحد مصرح به", "تفعيل ترخيص واحد", "توثيق التثبيت", "بدون دعم تقني مشمول"] },
    { description: "للبدء بمرافقة مع ستة أشهر من الدعم التقني المشمول.", features: ["كل ما يشمله Independent", "مساعدة في التثبيت والتهيئة", "مساعدة في واجهات API ومتغيرات البيئة", "ستة أشهر من الدعم التقني", "حل المشاكل مشمول بالعقد"] },
    { description: "لتشغيل عدة علامات أو مناطق أو أسواق بترخيص واحد.", features: ["الكود المصدري الكامل للتطبيقات الأربعة", "عدة نطاقات مصرح بها", "إدارة تفعيلات متعددة النطاقات", "دعم تقني عند الطلب", "مناسب للوكالات والمشغلين متعددي الأسواق"] },
  ],
};

// Étapes d'activation (auparavant codées en dur en anglais).
const activationI18n: Record<Language, Array<{ step: string; title: string; body: string }>> = {
  fr: [
    { step: "01 / CHOISIR", title: "Choisir votre licence", body: "Choisissez les droits, domaines et niveau de support adaptés à votre ambition." },
    { step: "02 / CONFIGURER", title: "Préparer votre environnement", body: "Connectez l'hébergement, les APIs, les cartes, les paiements et les réglages opérationnels." },
    { step: "03 / ACTIVER", title: "Autoriser votre domaine", body: "Validez le code unique et liez la licence au domaine autorisé." },
    { step: "04 / EXPLOITER", title: "Exploiter votre opération", body: "Surveillez clients, chauffeurs, partenaires, commandes et performances depuis un seul centre." },
  ],
  en: [
    { step: "01 / CHOOSE", title: "Select your license", body: "Choose the rights, domains and support level that match your ambition." },
    { step: "02 / CONFIGURE", title: "Prepare your environment", body: "Connect hosting, APIs, maps, payments and operational settings." },
    { step: "03 / ACTIVATE", title: "Authorize your domain", body: "Validate the unique code and bind the license to the authorized domain." },
    { step: "04 / OPERATE", title: "Run your operation", body: "Monitor customers, drivers, partners, orders and performance from one core." },
  ],
  ar: [
    { step: "01 / اختيار", title: "اختر ترخيصك", body: "اختر الحقوق والنطاقات ومستوى الدعم المناسب لطموحك." },
    { step: "02 / تهيئة", title: "حضر بيئتك", body: "اربط الاستضافة وواجهات API والخرائط والمدفوعات والإعدادات التشغيلية." },
    { step: "03 / تفعيل", title: "صرح بنطاقك", body: "تحقق من الرمز الفريد واربط الترخيص بالنطاق المصرح به." },
    { step: "04 / تشغيل", title: "شغل عمليتك", body: "راقب العملاء والسائقين والشركاء والطلبات والأداء من مركز واحد." },
  ],
};

const NAV_ROUTES = [
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

const DEMO_LINKS = [
  "https://depxpres.vercel.app/client",
  "https://depxpres.vercel.app/driver/login",
  "https://depxpres.vercel.app/store",
  "https://depxpres.vercel.app/admin",
] as const;

const DEMO_LABELS = ["Client", "Chauffeur", "Commerce", "Admin"] as const;

const DETAIL_LINKS = [
  "/applications/client",
  "/applications/chauffeur",
  "/applications/commerce",
  "/applications/admin",
] as const;

// FAQ de l'accueil (8 questions), dans les 3 langues
// (auparavant en français uniquement).
const faqsI18n: Record<Language, string[][]> = {
  fr: [
    ["Le code source est-il inclus ?", "Oui. Les trois formules incluent le code source complet des quatre applications. Les droits d'utilisation, de modification et de déploiement sont définis par le contrat de licence."],
    ["La licence à 2 000 $ inclut-elle du support ?", "Oui. Elle inclut six mois de soutien technique : assistance à l'installation, configuration des APIs, dépannage et incidents couverts selon les modalités du contrat."],
    ["Puis-je utiliser ma propre marque ?", "Oui. DepXpreS est conçu pour être déployé sous votre marque, avec votre nom, votre domaine autorisé et votre identité visuelle."],
    ["Les paiements sont-ils déjà connectés ?", "Le système inclut les intégrations Stripe et PayPal. Vous devez créer vos propres comptes et fournir vos clés API lors du déploiement."],
    ["Combien de domaines puis-je autoriser ?", "Les licences à 1 000 $ et 2 000 $ autorisent un seul domaine. La licence à 10 000 $ couvre plusieurs domaines selon les conditions définies au contrat."],
    ["Que se passe-t-il après les 6 mois de support ?", "Vous pouvez renouveler un forfait de support payant. Les modalités et tarifs sont définis au moment de la demande de renouvellement."],
    ["La licence est-elle une franchise ?", "Non. Il s'agit d'une licence logicielle indépendante. Aucun partage de revenus ni partenariat obligatoire avec Benniscom n'est requis."],
    ["Ai-je besoin de mon propre serveur ?", "Oui. Vous déployez sur votre propre hébergement (Vercel, VPS ou tout serveur Node.js compatible). Firebase est utilisé pour l'authentification et la base de données."],
  ],
  en: [
    ["Is the source code included?", "Yes. All three plans include the full source code of the four applications. Usage, modification, and deployment rights are defined in the license agreement."],
    ["Does the $2,000 license include support?", "Yes. It includes six months of technical support: installation assistance, API configuration, troubleshooting, and incidents covered under the contract terms."],
    ["Can I use my own brand?", "Yes. DepXpreS is designed to be deployed under your brand, with your name, your authorized domain, and your visual identity."],
    ["Are payments already connected?", "The system includes the Stripe and PayPal integrations. You must create your own accounts and supply your API keys at deployment."],
    ["How many domains can I authorize?", "The $1,000 and $2,000 licenses allow a single domain. The $10,000 license covers multiple domains under the terms defined in the contract."],
    ["What happens after the 6 months of support?", "You can renew a paid support plan. Terms and prices are defined when the renewal is requested."],
    ["Is the license a franchise?", "No. It is an independent software license. No revenue sharing and no mandatory partnership with Benniscom are required."],
    ["Do I need my own server?", "Yes. You deploy on your own hosting (Vercel, VPS, or any compatible Node.js server). Firebase is used for authentication and the database."],
  ],
  ar: [
    ["هل الكود المصدري مشمول؟", "نعم. الخطط الثلاث تشمل الكود المصدري الكامل للتطبيقات الأربعة. حقوق الاستخدام والتعديل والنشر محددة في عقد الترخيص."],
    ["هل يشمل ترخيص 2,000 $ الدعم؟", "نعم. يشمل ستة أشهر من الدعم التقني: المساعدة في التثبيت وضبط واجهات API وحل المشاكل والحوادث المشمولة بشروط العقد."],
    ["هل يمكنني استخدام علامتي الخاصة؟", "نعم. صمم DepXpreS لينشر تحت علامتك، باسمك ونطاقك المصرح به وهويتك البصرية."],
    ["هل المدفوعات متصلة مسبقا؟", "النظام يتضمن تكامل Stripe وPayPal. يجب أن تنشئ حساباتك الخاصة وتقدم مفاتيح API عند النشر."],
    ["كم عدد النطاقات التي يمكنني التصريح بها؟", "ترخيصا 1,000 $ و2,000 $ يسمحان بنطاق واحد. ترخيص 10,000 $ يغطي عدة نطاقات حسب الشروط المحددة في العقد."],
    ["ماذا يحدث بعد 6 أشهر من الدعم؟", "يمكنك تجديد خطة دعم مدفوعة. الشروط والأسعار تحدد عند طلب التجديد."],
    ["هل الترخيص امتياز؟", "لا. إنه ترخيص برمجي مستقل. لا مشاركة إيرادات ولا شراكة إلزامية مع Benniscom."],
    ["هل أحتاج إلى خادم خاص بي؟", "نعم. تنشر على استضافتك الخاصة (Vercel أو VPS أو أي خادم Node.js متوافق). ويستخدم Firebase للمصادقة وقاعدة البيانات."],
  ],
};

function LogoMark() {
  return (
    <span className="logo-mark" aria-hidden="true">
      <span />
      <span />
      <span />
    </span>
  );
}

function SectionHeading({ eyebrow, title, body, align = "left" }: { eyebrow: string; title: string; body: string; align?: "left" | "center" }) {
  return (
    <div className={`section-heading ${align === "center" ? "section-heading-center" : ""}`}>
      <div className="eyebrow"><span className="eyebrow-dot" />{eyebrow}</div>
      <h2>{title.split("\n").map((line, index) => <span key={line}>{line}{index < title.split("\n").length - 1 && <br />}</span>)}</h2>
      <p>{body}</p>
    </div>
  );
}

export default function Home() {
  const [lang, setLang] = useState<Language>("fr");
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeModule, setActiveModule] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [scrolled, setScrolled] = useState(false);

  const t = ui[lang];
  const footer = FOOTER_LABELS[lang];
  const apps = appContent[lang];
  const modules = moduleContent[lang];
  const activeModuleData = modules[activeModule];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  const metrics = useMemo(() => [
    ["04", lang === "fr" ? "applications connectées" : lang === "en" ? "connected applications" : "تطبيقات مترابطة"],
    ["12+", lang === "fr" ? "modules opérationnels" : lang === "en" ? "operational modules" : "وحدة تشغيلية"],
    ["01", lang === "fr" ? "centre de contrôle" : lang === "en" ? "control center" : "مركز تحكم"],
    ["∞", lang === "fr" ? "marchés possibles" : lang === "en" ? "possible markets" : "أسواق ممكنة"],
  ], [lang]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMenuOpen(false);
  };


  return (
    <div className="site-shell" dir={lang === "ar" ? "rtl" : "ltr"}>
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <header className={`site-header ${scrolled ? "site-header-scrolled" : ""}`}>
        <div className="nav-wrap">
          <button className="brand" onClick={() => scrollTo("top")} aria-label="DepXpreS home">
            <LogoMark />
            <span className="brand-word">DepXpreS<span>.</span></span>
          </button>
          <nav className={`main-nav ${menuOpen ? "main-nav-open" : ""}`}>
{NAV_ROUTES.map((href, index) => (
              <Link key={href} href={href} onClick={() => setMenuOpen(false)}>{t.nav[index]}</Link>
            ))}
            <Link href="/client" className="mobile-portal" onClick={() => setMenuOpen(false)}>{t.signIn} <ArrowRight size={15} /></Link>
          </nav>
          <div className="nav-actions">
            <div className="language-switcher" aria-label={t.language}>
              {(["fr", "en", "ar"] as Language[]).map((option) => (
                <button key={option} className={lang === option ? "language-active" : ""} onClick={() => setLang(option)}>{option.toUpperCase()}</button>
              ))}
            </div>
            <Link href="/client" className="portal-button">{t.signIn} <ArrowUpRightIcon /></Link>
            <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      <main id="top">
        <section id="platform" className="hero-section">
          <div className="hero-grid-lines" />
          <div className="hero-content page-width">
            <div className="hero-copy">
              <div className="context-ribbon"><span className="context-label">{t.commercialModel}</span><strong>{t.licensedSoftware}</strong><span className="context-separator">/</span><span>{t.sourceIncluded}</span><span className="context-separator">/</span><span>{t.noRevenueShare}</span></div>
              <div className="status-pill"><span className="status-pulse" />{t.live}</div>
              <div className="eyebrow hero-eyebrow"><span className="eyebrow-dot" />{t.heroKicker}</div>
              <h1>{t.heroTitle}</h1>
              <p className="hero-lead">{t.heroBody}</p>
              <div className="hero-actions">
                <button className="button-primary" onClick={() => scrollTo("apps")}>{t.explore}<ArrowRight size={17} /></button>
                <button className="button-ghost" onClick={() => scrollTo("licenses")}>{t.compare}<ArrowRight size={17} /></button>
              </div>
<div className="hero-demo-links"><span>{t.demos}</span>{DEMO_LINKS.map((href, index) => (<a key={href} href={href} target="_blank" rel="noopener">{DEMO_LABELS[index]}</a>))}</div>
              <div className="hero-qualifiers"><span><Check size={14} />{t.fourApps}</span><span><Check size={14} />{t.oneDomain}</span><span><Check size={14} />{t.supportOptions}</span></div>
              <div className="hero-note"><ShieldCheck size={15} /><span>{t.liveDetail}</span></div>
            </div>
            <div className="hero-console" aria-label="DepXpreS control center preview">
              <div className="console-glow" />
              <div className="console-topline"><span className="console-title"><span className="mini-logo"><LogoMark /></span> {t.consoleTitle}</span><span className="console-live"><i /> {t.demoBadge}</span></div>
              <div className="console-map">
                <div className="map-noise" />
                <div className="map-grid map-grid-one" /><div className="map-grid map-grid-two" />
                <div className="route route-a" /><div className="route route-b" /><div className="route route-c" />
                <span className="map-node node-1" /><span className="map-node node-2" /><span className="map-node node-3" /><span className="map-node node-4" />
                <div className="map-center"><Radar size={28} /><span>OPS<br />CORE</span></div>
                <div className="map-label label-one">MTL / 04</div><div className="map-label label-two">LAVAL / 02</div><div className="map-label label-three">RIVE-SUD / 07</div>
              </div>
              <div className="console-metrics">
                <div><span>{t.consoleActive}</span><strong>128</strong><em className="metric-up">+18.4%</em></div>
                <div><span>{t.consoleOnTime}</span><strong>96.8%</strong><em className="metric-good">{t.consoleStable}</em></div>
                <div><span>{t.consolePartners}</span><strong>42</strong><em className="metric-cyan">{t.consoleOnline}</em></div>
              </div>
              <div className="console-bottom"><span><span className="tiny-avatar">D</span> {t.consoleDispatch}</span><span>{t.consoleUpdated} <Zap size={13} /></span></div>
              <div className="console-demo-note">{t.demoNote}</div>
            </div>
          </div>
          <div className="page-width metrics-row">
            {metrics.map(([value, label]) => <div className="metric-block" key={label}><strong>{value}</strong><span>{label}</span></div>)}
          </div>
        </section>

        <section id="apps" className="content-section apps-section page-width">
          <SectionHeading eyebrow={t.appsEyebrow} title={t.appsTitle} body={t.appsBody} />
          <div className="apps-layout">
            <div className="apps-stack">
              {apps.map((app, index) => {
                const Icon = app.icon;
                return <article className={`app-card app-card-${app.tone}`} key={app.tag}>
                  <div className="app-card-top"><div className="app-icon"><Icon size={21} /></div><span className="app-index">0{index + 1}</span></div>
                  <span className="card-kicker">{app.tag}</span><h3>{app.title}</h3><p>{app.body}</p>
                  <a className="card-link" href={DEMO_LINKS[index]} target="_blank" rel="noopener">{t.viewDemo} <ArrowUpRightIcon /></a>
                  <Link className="card-link" href={DETAIL_LINKS[index]}>{t.detailLink} <ArrowRight size={15} /></Link>
                </article>;
              })}
            </div>
            <div className="ecosystem-panel">
              <div className="ecosystem-orbit orbit-large" /><div className="ecosystem-orbit orbit-small" />
              <div className="ecosystem-center"><LogoMark /><strong>DepXpreS</strong><span>CORE OS</span></div>
              <div className="ecosystem-node ecosystem-node-top"><span className="node-icon"><CircleUserRound size={17} /></span><b>{t.ecoClient}</b><small>{t.ecoClientSub}</small></div>
              <div className="ecosystem-node ecosystem-node-right"><span className="node-icon"><Bike size={17} /></span><b>{t.ecoDriver}</b><small>{t.ecoDriverSub}</small></div>
              <div className="ecosystem-node ecosystem-node-bottom"><span className="node-icon"><Store size={17} /></span><b>{t.ecoPartner}</b><small>{t.ecoPartnerSub}</small></div>
              <div className="ecosystem-node ecosystem-node-left"><span className="node-icon"><Gauge size={17} /></span><b>{t.ecoAdmin}</b><small>{t.ecoAdminSub}</small></div>
              <div className="ecosystem-caption"><span className="caption-line" />{t.liveDetail}<span className="caption-line" /></div>
            </div>
          </div>
        </section>

        <section id="modules" className="content-section modules-section">
          <div className="page-width"><SectionHeading eyebrow={t.modulesEyebrow} title={t.modulesTitle} body={t.modulesBody} /></div>
          <div className="page-width modules-shell">
            <div className="modules-list">
              <button className="module-tab module-tab-all" onClick={() => setActiveModule(0)}><Layers3 size={17} /><span>{t.allModules}</span><span className="module-count">12</span></button>
              {modules.map(([name, , , Icon], index) => <button key={name} className={`module-tab ${activeModule === index ? "module-tab-active" : ""}`} onClick={() => setActiveModule(index)}><Icon size={17} /><span>{name}</span><ChevronDown size={14} className="module-arrow" /></button>)}
            </div>
            <div className="module-detail">
              <div className="module-detail-visual"><div className="detail-grid" /><div className="detail-radar"><div className="radar-ring ring-one" /><div className="radar-ring ring-two" /><div className="radar-sweep" /><div className="radar-point point-a" /><div className="radar-point point-b" /><div className="radar-point point-c" /><Radar size={27} /></div><span className="visual-tag">{t.moduleTag} / {String(activeModule + 1).padStart(2, "0")}</span></div>
              <div className="module-detail-copy"><span className="card-kicker">{activeModuleData[2]}</span><h3>{activeModuleData[0]}</h3><p>{activeModuleData[1]}</p><div className="detail-checks"><span><Check size={15} /> {lang === "fr" ? "Workflow connecté" : lang === "en" ? "Connected workflow" : "سير عمل مترابط"}</span><span><Check size={15} /> {lang === "fr" ? "Permissions par rôle" : lang === "en" ? "Role-based access" : "صلاحيات حسب الدور"}</span><span><Check size={15} /> {lang === "fr" ? "Événements en temps réel" : lang === "en" ? "Real-time events" : "أحداث فورية"}</span></div><Link href="/modules" className="text-button">{t.learnMore} <ArrowRight size={16} /></Link></div>
            </div>
          </div>
        </section>

        <section className="content-section architecture-section page-width">
          <div className="architecture-heading"><SectionHeading eyebrow="SYSTEM / FLOW" title={t.architecture} body={t.architectureBody} /><div className="architecture-badge"><Globe2 size={16} /><span>{t.archBadge}</span></div></div>
          <div className="flow-diagram">
            <div className="flow-line flow-line-one" /><div className="flow-line flow-line-two" /><div className="flow-line flow-line-three" />
            <div className="flow-node flow-request"><div className="flow-icon"><CircleUserRound size={20} /></div><strong>{t.flowRequest}</strong><span>{t.flowRequestSub}</span></div>
            <div className="flow-node flow-ops"><div className="flow-icon"><Radar size={20} /></div><strong>{t.flowCore}</strong><span>{t.flowCoreSub}</span></div>
            <div className="flow-node flow-action"><div className="flow-icon"><Truck size={20} /></div><strong>{t.flowAction}</strong><span>{t.flowActionSub}</span></div>
            <div className="flow-node flow-insight"><div className="flow-icon"><BarChart3 size={20} /></div><strong>{t.flowInsight}</strong><span>{t.flowInsightSub}</span></div>
          </div>
        </section>

        <section id="licenses" className="content-section pricing-section">
          <div className="page-width"><SectionHeading eyebrow={t.plansEyebrow} title={t.plansTitle} body={t.plansBody} /></div>
          <div className="page-width pricing-grid">
            {plans.map((plan, index) => <article key={plan.name} className={`pricing-card pricing-${plan.accent}`}>
              {plan.accent === "featured" && <div className="featured-ribbon">{t.featured}</div>}
              <div className="plan-top"><span className="plan-number">0{index + 1}</span><BadgeCheck size={19} /></div>
              <span className="plan-name">{plan.name}</span><div className="plan-price"><span>$</span>{plan.price}<small>USD</small></div><p>{plansI18n[lang][index].description}</p>
              <div className="plan-rule" />
              <ul>{plansI18n[lang][index].features.map((feature) => <li key={feature}><Check size={15} />{feature}</li>)}</ul>
              <Link href={`/purchase?plan=${plan.plan}`} className={`plan-button ${plan.accent === "featured" ? "plan-button-bright" : ""}`}>{t.buy}<ArrowRight size={16} /></Link>
              <span className="plan-footnote">{index === 2 ? t.multiDomainNote : t.perDomain}</span>
            </article>)}
          </div>
          <div className="page-width pricing-note"><ShieldCheck size={16} /><span>{t.pricingNote}</span></div>
        </section>

        <section className="content-section activation-section page-width">
          <SectionHeading eyebrow={t.activationEyebrow} title={t.activationTitle} body={t.activationBody} />
          <div className="activation-grid">
            {activationI18n[lang].map((step) => <div className="activation-step" key={step.step}><span className="step-number">{step.step}</span><div className="step-dot"><Check size={15} /></div><h3>{step.title}</h3><p>{step.body}</p></div>)}
          </div>
        </section>

        <section className="content-section faq-section page-width">
          <div className="faq-heading"><SectionHeading eyebrow="FAQ / CLARITY" title={t.faqTitle} body={t.faqBody} /><CircleHelp size={48} strokeWidth={1.2} /></div>
          <div className="faq-list">{faqsI18n[lang].map(([question, answer], index) => <div className={`faq-item ${openFaq === index ? "faq-open" : ""}`} key={question}><button onClick={() => setOpenFaq(openFaq === index ? null : index)}><span>{question}</span><span className="faq-plus">{openFaq === index ? "−" : "+"}</span></button>{openFaq === index && <p>{answer}</p>}</div>)}</div>
        </section>

        <section className="cta-section page-width"><div className="cta-card"><div className="cta-orb" /><div className="cta-copy"><div className="eyebrow"><span className="eyebrow-dot" />DEPXPRES / NEXT MOVE</div><h2>{t.ctaTitle}</h2><p>{t.ctaBody}</p></div><Link href="/contact" className="button-primary cta-button">{t.contact}<ArrowRight size={17} /></Link></div></section>
      </main>

      <footer className="site-footer"><div className="page-width footer-top"><div className="footer-brand"><button className="brand" onClick={() => scrollTo("top")}><LogoMark /><span className="brand-word">DepXpreS<span>.</span></span></button><p>{t.footerNote}</p></div><div className="footer-links"><div><span className="footer-label">{footer.explore}</span><Link href="/platform">{t.nav[1]}</Link><Link href="/applications">{t.nav[2]}</Link><Link href="/modules">{t.nav[3]}</Link><Link href="/licenses">{t.nav[6]}</Link></div><div><span className="footer-label">{footer.connect}</span><Link href="/client">{t.signIn}</Link><Link href="/contact">{footer.contact}</Link><Link href="/support">{footer.support}</Link><Link href="/admin-portal">{footer.adminCommercial}</Link></div><div><span className="footer-label">{footer.legal}</span><Link href="/terms">{footer.termsOfSale}</Link><Link href="/license">{footer.licenseContract}</Link><Link href="/refund">{footer.refund}</Link><Link href="/privacy">{footer.privacy}</Link><Link href="/cookies">{footer.cookies}</Link><Link href="/security">{footer.security}</Link><Link href="/ip">{footer.ip}</Link><Link href="/support-terms">{footer.supportTerms}</Link></div></div></div><div className="page-width footer-bottom"><span>© 2026 Benniscom / DepXpreS</span><span><Link href="/privacy">{footer.privacy}</Link> · <Link href="/terms">{footer.terms}</Link> · <Link href="/license">{footer.license}</Link></span><span className="footer-status"><i /> {footer.systemConcept}</span></div></footer>
    </div>
  );
}

function ArrowUpRightIcon() {
  return <ArrowRight size={15} className="arrow-up-right" />;
}
