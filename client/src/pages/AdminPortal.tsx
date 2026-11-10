// Espace administrateur commercial — page de structure, trilingue FR / EN / AR (Lot 4).
// Modèle i18n : celui de Home.tsx — objet de traductions par langue,
// `documentElement.dir` + attribut `dir` (RTL pour l'arabe), sélecteur
// de langue. Statuts « à brancher » traduits dans les 3 langues.

import { Link } from "wouter";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Check,
  CreditCard,
  Download,
  FileText,
  Globe2,
  Headphones,
  Key,
  Languages,
  Menu,
  Receipt,
  Settings2,
  ShieldCheck,
  ShoppingBag,
  Tag,
  UsersRound,
  X,
} from "lucide-react";
import { useState } from "react";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { COMMON, FOOTER_LABELS, NAV_LABELS, NAV_ROUTES, useSiteLanguage, type Language } from "@/lib/i18n";

const STATUS_I18N: Record<Language, string> = {
  fr: "À brancher — nécessite authentification et base de données",
  en: "To be connected — requires authentication and a database",
  ar: "للربط — يتطلب مصادقة وقاعدة بيانات",
};

type ModuleGroup = {
  title: string;
  body: string;
  icon: typeof ArrowRight;
  modules: Array<{ name: string; desc: string; icon: typeof ArrowRight }>;
};

const groupsI18n: Record<Language, ModuleGroup[]> = {
  fr: [
    {
      title: "Clients et licences",
      body: "Tout ce qui concerne les acheteurs et leurs droits d'utilisation.",
      icon: UsersRound,
      modules: [
        { name: "Clients", desc: "Liste des acheteurs, coordonnées et historique de la relation commerciale.", icon: UsersRound },
        { name: "Demandes de licences", desc: "Demandes reçues via le formulaire de demande de licence, à qualifier avant signature du contrat.", icon: FileText },
        { name: "Licences", desc: "Licences émises par formule : Independent, Assisted, Multi-domain.", icon: BadgeCheck },
        { name: "Codes d'activation", desc: "Codes uniques émis, associés à un domaine et à une licence.", icon: Key },
        { name: "Domaines autorisés", desc: "Domaines déclarés lors de l'achat et autorisés par licence.", icon: Globe2 },
        { name: "Activations", desc: "Historique des activations et des vérifications au premier démarrage.", icon: Check },
        { name: "Suspensions", desc: "Suspensions de licence décidées en cas de non-respect du contrat.", icon: ShieldCheck },
      ],
    },
    {
      title: "Commerce",
      body: "Commandes, paiements et facturation des licences vendues.",
      icon: ShoppingBag,
      modules: [
        { name: "Commandes", desc: "Commandes de licences, de la demande à la livraison du code source.", icon: ShoppingBag },
        { name: "Paiements", desc: "Paiements confirmés via Stripe ou PayPal, rapprochés côté serveur.", icon: CreditCard },
        { name: "Factures", desc: "Factures générées après confirmation du paiement.", icon: Receipt },
        { name: "Versions du code source", desc: "Versions livrées aux acheteurs, par formule et par date.", icon: Download },
        { name: "Téléchargements", desc: "Historique des téléchargements du code source et de la documentation.", icon: Download },
        { name: "Prix et offres", desc: "Tarifs publics des trois formules et offres commerciales en vigueur.", icon: Tag },
      ],
    },
    {
      title: "Support et contenus",
      body: "Demandes entrantes et contenus publiés sur le site de présentation.",
      icon: Headphones,
      modules: [
        { name: "Demandes de support", desc: "Tickets reçus via le formulaire de support, classés par catégorie et priorité.", icon: Headphones },
        { name: "Formulaires de contact", desc: "Demandes commerciales reçues via le formulaire de contact.", icon: FileText },
        { name: "Contenus commerciaux", desc: "Textes des pages du site : présentation, licences, workflows, FAQ.", icon: FileText },
        { name: "Traductions", desc: "Versions française, anglaise et arabe des contenus du site.", icon: Languages },
        { name: "Paramètres", desc: "Configuration du site et des intégrations (courriel, paiements).", icon: Settings2 },
      ],
    },
  ],
  en: [
    {
      title: "Customers and licenses",
      body: "Everything about buyers and their usage rights.",
      icon: UsersRound,
      modules: [
        { name: "Customers", desc: "Buyer list, contact details, and commercial relationship history.", icon: UsersRound },
        { name: "License requests", desc: "Requests received through the license request form, to qualify before signing the contract.", icon: FileText },
        { name: "Licenses", desc: "Licenses issued by plan: Independent, Assisted, Multi-domain.", icon: BadgeCheck },
        { name: "Activation codes", desc: "Unique codes issued, linked to a domain and a license.", icon: Key },
        { name: "Authorized domains", desc: "Domains declared at purchase and authorized per license.", icon: Globe2 },
        { name: "Activations", desc: "History of activations and first-startup verifications.", icon: Check },
        { name: "Suspensions", desc: "License suspensions decided in case of contract breach.", icon: ShieldCheck },
      ],
    },
    {
      title: "Commerce",
      body: "Orders, payments, and invoicing for licenses sold.",
      icon: ShoppingBag,
      modules: [
        { name: "Orders", desc: "License orders, from request to source code delivery.", icon: ShoppingBag },
        { name: "Payments", desc: "Payments confirmed via Stripe or PayPal, reconciled server-side.", icon: CreditCard },
        { name: "Invoices", desc: "Invoices generated after payment confirmation.", icon: Receipt },
        { name: "Source code versions", desc: "Versions delivered to buyers, by plan and date.", icon: Download },
        { name: "Downloads", desc: "History of source code and documentation downloads.", icon: Download },
        { name: "Prices and offers", desc: "Public prices of the three plans and current commercial offers.", icon: Tag },
      ],
    },
    {
      title: "Support and content",
      body: "Incoming requests and content published on the presentation site.",
      icon: Headphones,
      modules: [
        { name: "Support requests", desc: "Tickets received through the support form, ranked by category and priority.", icon: Headphones },
        { name: "Contact forms", desc: "Commercial requests received through the contact form.", icon: FileText },
        { name: "Commercial content", desc: "Site page texts: presentation, licenses, workflows, FAQ.", icon: FileText },
        { name: "Translations", desc: "French, English, and Arabic versions of the site content.", icon: Languages },
        { name: "Settings", desc: "Site and integration configuration (email, payments).", icon: Settings2 },
      ],
    },
  ],
  ar: [
    {
      title: "العملاء والتراخيص",
      body: "كل ما يتعلق بالمشترين وحقوق استخدامهم.",
      icon: UsersRound,
      modules: [
        { name: "العملاء", desc: "قائمة المشترين وبيانات الاتصال وسجل العلاقة التجارية.", icon: UsersRound },
        { name: "طلبات التراخيص", desc: "طلبات وردت عبر نموذج طلب الترخيص، لتأهيلها قبل توقيع العقد.", icon: FileText },
        { name: "التراخيص", desc: "التراخيص الصادرة حسب الخطة: Independent وAssisted وMulti-domain.", icon: BadgeCheck },
        { name: "رموز التفعيل", desc: "رموز فريدة صادرة، مرتبطة بنطاق وترخيص.", icon: Key },
        { name: "النطاقات المصرح بها", desc: "النطاقات المعلنة عند الشراء والمصرح بها لكل ترخيص.", icon: Globe2 },
        { name: "التفعيلات", desc: "سجل التفعيلات والتحقق عند أول تشغيل.", icon: Check },
        { name: "الإيقافات", desc: "إيقافات ترخيص تقرر في حال عدم احترام العقد.", icon: ShieldCheck },
      ],
    },
    {
      title: "التجارة",
      body: "الطلبات والمدفوعات والفوترة للتراخيص المباعة.",
      icon: ShoppingBag,
      modules: [
        { name: "الطلبات", desc: "طلبات التراخيص، من الطلب حتى تسليم الكود المصدري.", icon: ShoppingBag },
        { name: "المدفوعات", desc: "مدفوعات مؤكدة عبر Stripe أو PayPal، مطابقة من جهة الخادم.", icon: CreditCard },
        { name: "الفواتير", desc: "فواتير صادرة بعد تأكيد الدفع.", icon: Receipt },
        { name: "نسخ الكود المصدري", desc: "النسخ المسلمة للمشترين، حسب الخطة والتاريخ.", icon: Download },
        { name: "التنزيلات", desc: "سجل تنزيلات الكود المصدري والتوثيق.", icon: Download },
        { name: "الأسعار والعروض", desc: "الأسعار العامة للخطط الثلاث والعروض التجارية الجارية.", icon: Tag },
      ],
    },
    {
      title: "الدعم والمحتويات",
      body: "الطلبات الواردة والمحتويات المنشورة على موقع العرض.",
      icon: Headphones,
      modules: [
        { name: "طلبات الدعم", desc: "طلبات وردت عبر نموذج الدعم، مصنفة حسب الفئة والأولوية.", icon: Headphones },
        { name: "نماذج الاتصال", desc: "طلبات تجارية وردت عبر نموذج الاتصال.", icon: FileText },
        { name: "المحتويات التجارية", desc: "نصوص صفحات الموقع: العرض والتراخيص ومسارات العمل والأسئلة الشائعة.", icon: FileText },
        { name: "الترجمات", desc: "النسخ الفرنسية والإنجليزية والعربية لمحتويات الموقع.", icon: Languages },
        { name: "الإعدادات", desc: "تهيئة الموقع والتكاملات (البريد والمدفوعات).", icon: Settings2 },
      ],
    },
  ],
};

const heroI18n: Record<Language, { eyebrow: string; title: string; intro: string; note: string; iconLabel: string; ctaTitle: string }> = {
  fr: {
    eyebrow: "DEPXPRES / ESPACE ADMIN COMMERCIAL",
    title: "Espace administrateur commercial — structure à brancher.",
    intro: "Cet espace regroupera la gestion des clients, des licences, des commandes, des paiements et des demandes de support. Pour l'instant, il s'agit d'une page de structure : aucune authentification n'est implémentée et aucune donnée n'est affichée.",
    note: "Aucune donnée réelle n'est affichée ici. Aucun compte administrateur n'existe pour l'instant et aucun formulaire de connexion n'est proposé.",
    iconLabel: "ADMIN — À VENIR",
    ctaTitle: "Une question sur une licence ?",
  },
  en: {
    eyebrow: "DEPXPRES / COMMERCIAL ADMIN SPACE",
    title: "Commercial admin space — structure to be connected.",
    intro: "This space will bring together customer, license, order, payment, and support request management. For now, it is a structure page: no authentication is implemented and no data is shown.",
    note: "No real data is shown here. No administrator account exists yet and no sign-in form is offered.",
    iconLabel: "ADMIN — COMING SOON",
    ctaTitle: "A question about a license?",
  },
  ar: {
    eyebrow: "DEPXPRES / فضاء الإدارة التجارية",
    title: "فضاء الإدارة التجارية — بنية للربط.",
    intro: "سيجمع هذا الفضاء إدارة العملاء والتراخيص والطلبات والمدفوعات وطلبات الدعم. في الوقت الحالي، هذه صفحة بنية: لا توجد مصادقة مطبقة ولا تعرض أي بيانات.",
    note: "لا تعرض أي بيانات حقيقية هنا. لا يوجد حساب مدير حتى الآن ولا يقدم أي نموذج تسجيل دخول.",
    iconLabel: "الإدارة — قريبا",
    ctaTitle: "سؤال حول ترخيص؟",
  },
};

function LogoMark() {
  return <span className="logo-mark" aria-hidden="true"><span /><span /><span /></span>;
}

export default function AdminPortal() {
  const [lang, setLang] = useSiteLanguage("fr");
  const t = COMMON[lang];
  const footer = FOOTER_LABELS[lang];
  const nav = NAV_LABELS[lang];
  const hero = heroI18n[lang];
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
        <section className="info-hero info-accent-amber">
          <div className="page-width info-hero-grid">
            <div>
              <Link href="/" className="back-link"><ArrowLeft size={14} /> {t.backHome}</Link>
              <div className="eyebrow"><span className="eyebrow-dot" />{hero.eyebrow}</div>
              <h1>{hero.title}</h1>
              <p>{hero.intro}</p>
              <p className="legal-disclaimer">{hero.note}</p>
            </div>
            <div className="info-hero-icon"><ShieldCheck size={58} strokeWidth={1.2} /><span>DEPXPRES<br />{hero.iconLabel}</span></div>
          </div>
        </section>

        <section className="page-width info-sections">
          {groupsI18n[lang].map((group, index) => {
            const GroupIcon = group.icon;
            return (
              <article className="info-section-card" key={group.title}>
                <div className="info-section-trigger">
                  <span className="info-section-title">
                    <span className="info-section-icon"><GroupIcon size={18} /></span>
                    <strong>{group.title}</strong>
                  </span>
                  <span className="info-section-number">0{index + 1}</span>
                </div>
                <div className="info-section-body">
                  <p>{group.body}</p>
                  <ul>
                    {group.modules.map((mod) => {
                      const ModIcon = mod.icon;
                      return (
                        <li key={mod.name}>
                          <ModIcon size={15} />
                          <span>
                            <strong>{mod.name}</strong> — {mod.desc}
                            <br />
                            <span className="portal-status">{STATUS_I18N[lang]}</span>
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </article>
            );
          })}
        </section>

        <section className="page-width info-bottom-cta">
          <div>
            <span className="eyebrow"><span className="eyebrow-dot" />DEPXPRES / NEXT STEP</span>
            <h2>{hero.ctaTitle}</h2>
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
