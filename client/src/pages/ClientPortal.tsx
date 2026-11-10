import { useEffect, useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  CircleUserRound,
  BookOpen,
  Download,
  FileText,
  Globe2,
  Headphones,
  History,
  Key,
  Menu,
  Receipt,
  ShoppingBag,
  User,
  X,
} from "lucide-react";
import { Link } from "wouter";
import { FOOTER_LABELS } from "@/lib/i18n";

type Language = "fr" | "en" | "ar";

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

const ui = {
  fr: {
    language: "Langue",
    nav: [
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
    contact: "Parler à un spécialiste",
    eyebrow: "DEPXPRES / ESPACE CLIENT",
    title: "Portail client — disponible avec votre licence.",
    intro:
      "Ce portail regroupera votre profil, vos commandes, vos factures et votre licence une fois votre compte activé. Pour l'instant, il s'agit d'une page d'attente : aucune connexion ni donnée n'est encore branchée.",
    soon: "Bientôt disponible",
    noticeTitle: "Pas encore disponible",
    noticeBody:
      "L'authentification et l'accès aux données ne sont pas encore branchés. Le backend du portail est à venir : aucun formulaire de connexion n'est proposé ici et aucune donnée n'est affichée.",
    comingTitle: "Ce que contiendra le portail",
    statusNote: "Chaque élément est marqué « à venir » : il nécessite un backend et une authentification avant d'être activé.",
    items: [
      ["Profil", "Vos coordonnées personnelles et professionnelles."],
      ["Commandes", "L'historique de vos commandes de licences."],
      ["Factures", "Vos factures téléchargeables."],
      ["Licence", "Le détail de votre licence et de ses droits."],
      ["Code d'activation", "Votre code d'activation unique."],
      ["Domaines autorisés", "Les domaines liés à votre licence."],
      ["Téléchargements", "Le code source et la documentation."],
      ["Demandes de support", "Le suivi de vos tickets d'assistance."],
      ["Documents", "Vos documents contractuels et justificatifs."],
      ["Historique des téléchargements", "La liste de vos téléchargements du code source et de la documentation."],
      ["Instructions d'installation", "Le guide d'installation et de configuration de votre déploiement."],
    ],
    backHome: "Retour à l'accueil",
    footerNote:
      "Logiciel de mobilité, livraison et opérations — conçu au Canada, pensé pour l'international.",
  },
  en: {
    language: "Language",
    nav: [
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
    contact: "Talk to a specialist",
    eyebrow: "DEPXPRES / CUSTOMER PORTAL",
    title: "Customer portal — available with your license.",
    intro:
      "This portal will bring together your profile, orders, invoices, and license once your account is activated. For now, this is a holding page: no sign-in and no data are connected yet.",
    soon: "Coming soon",
    noticeTitle: "Not available yet",
    noticeBody:
      "Authentication and data access are not connected yet. The portal backend is coming: no sign-in form is offered here and no data is shown.",
    comingTitle: "What the portal will contain",
    statusNote: "Every item is marked as coming soon: it needs a backend and authentication before it can be activated.",
    items: [
      ["Profile", "Your personal and business contact details."],
      ["Orders", "Your license order history."],
      ["Invoices", "Your downloadable invoices."],
      ["License", "Your license details and rights."],
      ["Activation code", "Your unique activation code."],
      ["Authorized domains", "The domains linked to your license."],
      ["Downloads", "Source code and documentation."],
      ["Support requests", "Tracking for your support tickets."],
      ["Documents", "Your contractual documents and supporting files."],
      ["Download history", "Your source code and documentation download history."],
      ["Installation instructions", "The installation and setup guide for your deployment."],
    ],
    backHome: "Back to home",
    footerNote:
      "Mobility, delivery, and operations software — built in Canada, designed for the world.",
  },
  ar: {
    language: "اللغة",
    nav: [
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
    contact: "تحدث مع متخصص",
    eyebrow: "DEPXPRES / بوابة العميل",
    title: "بوابة العميل — متاحة مع ترخيصك.",
    intro:
      "ستجمع هذه البوابة ملفك الشخصي وطلباتك وفواتيرك وترخيصك بعد تفعيل حسابك. في الوقت الحالي، هذه صفحة انتظار: لم يتم ربط أي تسجيل دخول أو بيانات بعد.",
    soon: "قريبا",
    noticeTitle: "غير متاحة بعد",
    noticeBody:
      "لم يتم بعد ربط المصادقة والوصول إلى البيانات. الواجهة الخلفية للبوابة قادمة: لا يوجد نموذج تسجيل دخول هنا ولا يتم عرض أي بيانات.",
    comingTitle: "ما الذي ستتضمنه البوابة",
    statusNote: "كل عنصر موسوم بأنه «قادم»: يحتاج إلى واجهة خلفية ومصادقة قبل تفعيله.",
    items: [
      ["الملف الشخصي", "بيانات الاتصال الشخصية والمهنية الخاصة بك."],
      ["الطلبات", "سجل طلبات التراخيص الخاصة بك."],
      ["الفواتير", "فواتيرك القابلة للتنزيل."],
      ["الترخيص", "تفاصيل ترخيصك وحقوقه."],
      ["رمز التفعيل", "رمز التفعيل الفريد الخاص بك."],
      ["النطاقات المصرح بها", "النطاقات المرتبطة بترخيصك."],
      ["التنزيلات", "الكود المصدري والتوثيق."],
      ["طلبات الدعم", "متابعة طلبات الدعم الخاصة بك."],
      ["المستندات", "مستنداتك التعاقدية وملفاتك الداعمة."],
      ["سجل التنزيلات", "سجل تنزيلات الكود المصدري والتوثيق."],
      ["تعليمات التثبيت", "دليل تثبيت وإعداد نشرك."],
    ],
    backHome: "العودة إلى الصفحة الرئيسية",
    footerNote:
      "برمجيات التنقل والتوصيل والعمليات — طُورت في كندا للعالم.",
  },
} as const;

const ITEM_ICONS = [
  User,
  ShoppingBag,
  Receipt,
  BadgeCheck,
  Key,
  Globe2,
  Download,
  Headphones,
  FileText,
  History,
  BookOpen,
] as const;

function LogoMark() {
  return (
    <span className="logo-mark" aria-hidden="true">
      <span />
      <span />
      <span />
    </span>
  );
}

export default function ClientPortal() {
  const [lang, setLang] = useState<Language>("fr");
  const [menuOpen, setMenuOpen] = useState(false);
  const t = ui[lang];
  const footer = FOOTER_LABELS[lang];

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  return (
    <div className="info-page" dir={lang === "ar" ? "rtl" : "ltr"}>
      <header className="info-header">
        <Link href="/" className="brand">
          <LogoMark />
          <span className="brand-word">
            DepXpreS<span>.</span>
          </span>
        </Link>
        <nav className={menuOpen ? "info-nav-open" : ""}>
          {NAV_ROUTES.map((href, index) => (
            <Link key={href} href={href} onClick={() => setMenuOpen(false)}>
              {t.nav[index]}
            </Link>
          ))}
        </nav>
        <div className="nav-actions">
          <div className="language-switcher" aria-label={t.language}>
            {(["fr", "en", "ar"] as Language[]).map((option) => (
              <button
                key={option}
                className={lang === option ? "language-active" : ""}
                onClick={() => setLang(option)}
              >
                {option.toUpperCase()}
              </button>
            ))}
          </div>
          <Link href="/contact" className="info-header-cta">
            {t.contact} <ArrowRight size={14} />
          </Link>
          <button
            className="menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      <main>
        <section className="info-hero info-accent-cyan">
          <div className="page-width info-hero-grid">
            <div>
              <Link href="/" className="back-link">
                ← {t.backHome}
              </Link>
              <div className="eyebrow">
                <span className="eyebrow-dot" />
                {t.eyebrow}
              </div>
              <h1>{t.title}</h1>
              <p>{t.intro}</p>
            </div>
            <div className="info-hero-icon">
              <CircleUserRound size={58} strokeWidth={1.2} />
              <span>
                DEPXPRES
                <br />
                {t.soon.toUpperCase()}
              </span>
            </div>
          </div>
        </section>

        <section className="page-width info-sections">
          <article className="info-section-card">
            <div className="info-section-trigger">
              <span className="info-section-title">
                <span className="info-section-icon">
                  <CircleUserRound size={18} />
                </span>
                <strong>{t.noticeTitle}</strong>
              </span>
              <span className="info-section-number">01</span>
            </div>
            <div className="info-section-body">
              <p>{t.noticeBody}</p>
            </div>
          </article>
          <article className="info-section-card">
            <div className="info-section-trigger">
              <span className="info-section-title">
                <span className="info-section-icon">
                  <BadgeCheck size={18} />
                </span>
                <strong>{t.comingTitle}</strong>
              </span>
              <span className="info-section-number">02</span>
            </div>
            <div className="info-section-body">
              <ul>
                {t.items.map(([title, desc], index) => {
                  const ItemIcon = ITEM_ICONS[index];
                  return (
                    <li key={title}>
                      <ItemIcon size={15} />
                      <span>
                        <strong>{title}</strong> — {desc}
                      </span>
                    </li>
                  );
                })}
              </ul>
              <p className="portal-note">{t.statusNote}</p>
            </div>
          </article>
        </section>

        <section className="page-width info-bottom-cta">
          <div>
            <span className="eyebrow">
              <span className="eyebrow-dot" />
              DEPXPRES / NEXT STEP
            </span>
            <h2>{t.comingTitle}</h2>
          </div>
          <Link href="/" className="button-primary">
            {t.backHome} <ArrowRight size={16} />
          </Link>
        </section>
      </main>

      <footer className="site-footer info-footer">
        <div className="page-width footer-bottom">
          <span>© 2026 Benniscom / DepXpreS</span>
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
          <span>{t.footerNote}</span>
        </div>
      </footer>
    </div>
  );
}
