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
import { toast } from "sonner";
import { Link } from "wouter";

type Language = "fr" | "en" | "ar";

type IconComponent = typeof ArrowRight;

const ui = {
  fr: {
    language: "Langue",
    nav: ["Plateforme", "Applications", "Modules", "Licences"],
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
  },
  en: {
    language: "Language",
    nav: ["Platform", "Applications", "Modules", "Licenses"],
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
  },
  ar: {
    language: "اللغة",
    nav: ["المنصة", "التطبيقات", "الوحدات", "التراخيص"],
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
  { name: "Independent", price: "1,000", description: "Pour lancer un domaine avec votre propre équipe.", features: ["Code source complet", "Les 4 applications", "1 domaine autorisé", "1 activation de licence", "Installation autonome"], accent: "neutral" },
  { name: "Assisted", price: "2,000", description: "Pour démarrer avec six mois de soutien technique.", features: ["Tout ce qui est inclus dans Independent", "Assistance installation & configuration", "Aide APIs et variables d'environnement", "Six mois de soutien technique", "Dépannage couvert selon contrat"], accent: "featured" },
  { name: "Multi-domain", price: "10,000", description: "Pour opérer plusieurs marques ou marchés.", features: ["Code source complet", "Les 4 applications", "Plusieurs domaines autorisés", "Gestion des licences et domaines", "Soutien sur demande selon contrat"], accent: "gold" },
];

const faqs = [
  ["Le code source est-il inclus ?", "Oui. Les trois formules incluent le code source des quatre applications. Les droits d'utilisation, de modification et de déploiement sont définis par le contrat de licence."],
  ["La licence à 2 000 $ inclut-elle du support ?", "Oui. Elle inclut six mois de soutien technique, avec les modalités, délais et limites précisées dans le contrat."],
  ["Puis-je utiliser ma propre marque ?", "Oui. DepXpreS est conçu pour être déployé sous votre marque, avec votre domaine autorisé et votre configuration opérationnelle."],
  ["Les paiements sont-ils déjà connectés ?", "Le site présente l'offre commerciale. La configuration Stripe, PayPal ou d'autres fournisseurs dépend du déploiement livré et des intégrations retenues."],
];

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

  const showComingSoon = () => toast(lang === "fr" ? "Le portail client sera activé avec votre licence." : lang === "en" ? "The customer portal will be enabled with your license." : "سيتم تفعيل بوابة العميل مع ترخيصك.");

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
            <Link href="/platform" onClick={() => setMenuOpen(false)}>{t.nav[0]}</Link>
            <Link href="/applications" onClick={() => setMenuOpen(false)}>{t.nav[1]}</Link>
            <Link href="/modules" onClick={() => setMenuOpen(false)}>{t.nav[2]}</Link>
            <Link href="/licenses" onClick={() => setMenuOpen(false)}>{t.nav[3]}</Link>
            <button className="mobile-portal" onClick={showComingSoon}>{t.signIn} <ArrowRight size={15} /></button>
          </nav>
          <div className="nav-actions">
            <div className="language-switcher" aria-label={t.language}>
              {(["fr", "en", "ar"] as Language[]).map((option) => (
                <button key={option} className={lang === option ? "language-active" : ""} onClick={() => setLang(option)}>{option.toUpperCase()}</button>
              ))}
            </div>
            <button className="portal-button" onClick={showComingSoon}>{t.signIn} <ArrowUpRightIcon /></button>
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
              <div className="hero-qualifiers"><span><Check size={14} />{t.fourApps}</span><span><Check size={14} />{t.oneDomain}</span><span><Check size={14} />{t.supportOptions}</span></div>
              <div className="hero-note"><ShieldCheck size={15} /><span>{t.liveDetail}</span></div>
            </div>
            <div className="hero-console" aria-label="DepXpreS control center preview">
              <div className="console-glow" />
              <div className="console-topline"><span className="console-title"><span className="mini-logo"><LogoMark /></span> Control center</span><span className="console-live"><i /> LIVE</span></div>
              <div className="console-map">
                <div className="map-noise" />
                <div className="map-grid map-grid-one" /><div className="map-grid map-grid-two" />
                <div className="route route-a" /><div className="route route-b" /><div className="route route-c" />
                <span className="map-node node-1" /><span className="map-node node-2" /><span className="map-node node-3" /><span className="map-node node-4" />
                <div className="map-center"><Radar size={28} /><span>OPS<br />CORE</span></div>
                <div className="map-label label-one">MTL / 04</div><div className="map-label label-two">LAVAL / 02</div><div className="map-label label-three">RIVE-SUD / 07</div>
              </div>
              <div className="console-metrics">
                <div><span>Active missions</span><strong>128</strong><em className="metric-up">+18.4%</em></div>
                <div><span>On-time rate</span><strong>96.8%</strong><em className="metric-good">Stable</em></div>
                <div><span>Live partners</span><strong>42</strong><em className="metric-cyan">Online</em></div>
              </div>
              <div className="console-bottom"><span><span className="tiny-avatar">D</span> Dispatch layer</span><span>Updated just now <Zap size={13} /></span></div>
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
                  <span className="card-link">{t.learnMore} <ArrowUpRightIcon /></span>
                </article>;
              })}
            </div>
            <div className="ecosystem-panel">
              <div className="ecosystem-orbit orbit-large" /><div className="ecosystem-orbit orbit-small" />
              <div className="ecosystem-center"><LogoMark /><strong>DepXpreS</strong><span>CORE OS</span></div>
              <div className="ecosystem-node ecosystem-node-top"><span className="node-icon"><CircleUserRound size={17} /></span><b>Client</b><small>Request</small></div>
              <div className="ecosystem-node ecosystem-node-right"><span className="node-icon"><Bike size={17} /></span><b>Driver</b><small>Move</small></div>
              <div className="ecosystem-node ecosystem-node-bottom"><span className="node-icon"><Store size={17} /></span><b>Partner</b><small>Prepare</small></div>
              <div className="ecosystem-node ecosystem-node-left"><span className="node-icon"><Gauge size={17} /></span><b>Admin</b><small>Control</small></div>
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
              <div className="module-detail-visual"><div className="detail-grid" /><div className="detail-radar"><div className="radar-ring ring-one" /><div className="radar-ring ring-two" /><div className="radar-sweep" /><div className="radar-point point-a" /><div className="radar-point point-b" /><div className="radar-point point-c" /><Radar size={27} /></div><span className="visual-tag">MODULE / {String(activeModule + 1).padStart(2, "0")}</span></div>
              <div className="module-detail-copy"><span className="card-kicker">{activeModuleData[2]}</span><h3>{activeModuleData[0]}</h3><p>{activeModuleData[1]}</p><div className="detail-checks"><span><Check size={15} /> {lang === "fr" ? "Workflow connecté" : lang === "en" ? "Connected workflow" : "سير عمل مترابط"}</span><span><Check size={15} /> {lang === "fr" ? "Permissions par rôle" : lang === "en" ? "Role-based access" : "صلاحيات حسب الدور"}</span><span><Check size={15} /> {lang === "fr" ? "Événements en temps réel" : lang === "en" ? "Real-time events" : "أحداث فورية"}</span></div><button className="text-button" onClick={() => toast(`${activeModuleData[0]} — ${t.learnMore}`)}>{t.learnMore} <ArrowRight size={16} /></button></div>
            </div>
          </div>
        </section>

        <section className="content-section architecture-section page-width">
          <div className="architecture-heading"><SectionHeading eyebrow="SYSTEM / FLOW" title={t.architecture} body={t.architectureBody} /><div className="architecture-badge"><Globe2 size={16} /><span>Built for multi-market operations</span></div></div>
          <div className="flow-diagram">
            <div className="flow-line flow-line-one" /><div className="flow-line flow-line-two" /><div className="flow-line flow-line-three" />
            <div className="flow-node flow-request"><div className="flow-icon"><CircleUserRound size={20} /></div><strong>Request</strong><span>Client intent</span></div>
            <div className="flow-node flow-ops"><div className="flow-icon"><Radar size={20} /></div><strong>DepXpreS Core</strong><span>Decision layer</span></div>
            <div className="flow-node flow-action"><div className="flow-icon"><Truck size={20} /></div><strong>Action</strong><span>Driver + partner</span></div>
            <div className="flow-node flow-insight"><div className="flow-icon"><BarChart3 size={20} /></div><strong>Insight</strong><span>Admin intelligence</span></div>
          </div>
        </section>

        <section id="licenses" className="content-section pricing-section">
          <div className="page-width"><SectionHeading eyebrow={t.plansEyebrow} title={t.plansTitle} body={t.plansBody} /></div>
          <div className="page-width pricing-grid">
            {plans.map((plan, index) => <article key={plan.name} className={`pricing-card pricing-${plan.accent}`}>
              {plan.accent === "featured" && <div className="featured-ribbon">{t.featured}</div>}
              <div className="plan-top"><span className="plan-number">0{index + 1}</span><BadgeCheck size={19} /></div>
              <span className="plan-name">{plan.name}</span><div className="plan-price"><span>$</span>{plan.price}<small>USD</small></div><p>{plan.description}</p>
              <div className="plan-rule" />
              <ul>{plan.features.map((feature) => <li key={feature}><Check size={15} />{feature}</li>)}</ul>
              <button className={`plan-button ${plan.accent === "featured" ? "plan-button-bright" : ""}`} onClick={() => toast(`${plan.name} — ${t.buy}`)}>{t.buy}<ArrowRight size={16} /></button>
              <span className="plan-footnote">{index === 2 ? "Multi-domain license" : t.perDomain}</span>
            </article>)}
          </div>
          <div className="page-width pricing-note"><ShieldCheck size={16} /><span>Pricing in USD. Taxes, contract terms, authorized domains and support scope are confirmed before payment.</span></div>
        </section>

        <section className="content-section activation-section page-width">
          <SectionHeading eyebrow={t.activationEyebrow} title={t.activationTitle} body={"A deployment path designed to keep the operational details visible at every step."} />
          <div className="activation-grid">
            {["01 / CHOOSE", "02 / CONFIGURE", "03 / ACTIVATE", "04 / OPERATE"].map((step, index) => <div className="activation-step" key={step}><span className="step-number">{step}</span><div className="step-dot"><Check size={15} /></div><h3>{["Select your license", "Prepare your environment", "Authorize your domain", "Run your operation"][index]}</h3><p>{["Choose the rights, domains and support level that match your ambition.", "Connect hosting, APIs, maps, payments and operational settings.", "Validate the unique code and bind the license to the authorized domain.", "Monitor customers, drivers, partners, orders and performance from one core."][index]}</p></div>)}
          </div>
        </section>

        <section className="content-section faq-section page-width">
          <div className="faq-heading"><SectionHeading eyebrow="FAQ / CLARITY" title={t.faqTitle} body={t.faqBody} /><CircleHelp size={48} strokeWidth={1.2} /></div>
          <div className="faq-list">{faqs.map(([question, answer], index) => <div className={`faq-item ${openFaq === index ? "faq-open" : ""}`} key={question}><button onClick={() => setOpenFaq(openFaq === index ? null : index)}><span>{question}</span><span className="faq-plus">{openFaq === index ? "−" : "+"}</span></button>{openFaq === index && <p>{answer}</p>}</div>)}</div>
        </section>

        <section className="cta-section page-width"><div className="cta-card"><div className="cta-orb" /><div className="cta-copy"><div className="eyebrow"><span className="eyebrow-dot" />DEPXPRES / NEXT MOVE</div><h2>{t.ctaTitle}</h2><p>{t.ctaBody}</p></div><button className="button-primary cta-button" onClick={() => toast("contact@benniscom.com")}>{t.contact}<ArrowRight size={17} /></button></div></section>
      </main>

      <footer className="site-footer"><div className="page-width footer-top"><div className="footer-brand"><button className="brand" onClick={() => scrollTo("top")}><LogoMark /><span className="brand-word">DepXpreS<span>.</span></span></button><p>{t.footerNote}</p></div><div className="footer-links"><div><span className="footer-label">Explore</span><button onClick={() => scrollTo("platform")}>{t.nav[0]}</button><button onClick={() => scrollTo("apps")}>{t.nav[1]}</button><button onClick={() => scrollTo("modules")}>{t.nav[2]}</button></div><div><span className="footer-label">Connect</span><button onClick={showComingSoon}>{t.signIn}</button><button onClick={() => toast("contact@benniscom.com")}>Contact</button><button onClick={() => toast("Technical support is included according to your license.")}>Support</button></div></div></div><div className="page-width footer-bottom"><span>© 2026 Benniscom / DepXpreS</span><span>Privacy · Terms · License agreement</span><span className="footer-status"><i /> System concept / v1.0</span></div></footer>
    </div>
  );
}

function ArrowUpRightIcon() {
  return <ArrowRight size={15} className="arrow-up-right" />;
}
