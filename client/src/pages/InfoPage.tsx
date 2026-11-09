import { Link } from "wouter";
import {
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
} from "lucide-react";
import { useState } from "react";

export type PageKind =
  | "about"
  | "platform"
  | "applications"
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

const appCards = [
  { name: "DepXpreS Client", label: "Client", body: "Création de compte, recherche de services, commandes, courses, paiements, suivi et historique.", icon: UsersRound },
  { name: "DepXpreS Chauffeur", label: "Chauffeur", body: "Profil, vérification, disponibilité, missions, navigation, preuve de service et revenus.", icon: Truck },
  { name: "DepXpreS Entreprise", label: "Partenaire", body: "Catalogue, prix, variantes, stocks, commandes, promotions et rapports de vente.", icon: Store },
  { name: "DepXpreS Administration", label: "Administration", body: "Comptes, dispatching, zones, paiements, notifications, licences et supervision opérationnelle.", icon: Radar },
];

const moduleRows = [
  ["Rideshare", "Demande, affectation, suivi et clôture du trajet.", "Nécessaire pour orchestrer les courses et le transport.", "Client · Chauffeur · Admin", MapPinned],
  ["Livraison", "Commande, préparation, collecte, dispatch et confirmation.", "Nécessaire pour gérer le dernier kilomètre.", "Client · Partenaire · Chauffeur", PackageCheck],
  ["Entreprises", "Partenaires, commerces, restaurants et succursales.", "Nécessaire pour structurer le réseau marchand.", "Partenaire · Admin", Store],
  ["Produits", "Catalogue, catégories, prix, variantes et stocks.", "Nécessaire pour vendre avec des données fiables.", "Partenaire · Admin", Boxes],
  ["Scanner", "Lecture des codes-barres ou QR selon la configuration.", "Nécessaire pour accélérer préparation et contrôle.", "Partenaire · Chauffeur", ScanLine],
  ["Dispatching", "Attribution des missions et suivi de disponibilité.", "Nécessaire pour réduire les temps d'affectation.", "Admin · Chauffeur", Radar],
  ["Zones", "Secteurs, rayons de service et couverture géographique.", "Nécessaire pour contrôler les marchés desservis.", "Admin", Globe2],
  ["Promotions", "Codes, campagnes, offres et visibilité commerciale.", "Nécessaire pour stimuler acquisition et rétention.", "Partenaire · Admin", BadgeCheck],
  ["Commandes", "Validation, préparation, attribution, livraison et historique.", "Nécessaire pour tracer chaque étape opérationnelle.", "Tous les rôles", Layers3],
  ["Paiements", "Moyens de paiement, transactions et remboursements configurés.", "Nécessaire pour sécuriser le parcours financier.", "Client · Admin", CreditCard],
  ["Rapports", "Activité, commandes, courses, ventes et indicateurs.", "Nécessaire pour décider avec des données opérationnelles.", "Admin · Partenaire", BarChart3],
  ["Sécurité", "Accès, rôles, permissions, journalisation et activation.", "Nécessaire pour protéger comptes et déploiements.", "Tous les rôles", ShieldCheck],
] as const;

const pageData: Record<PageKind, PageData> = {
  about: {
    eyebrow: "BENNICOM / À PROPOS",
    title: "Un logiciel pour construire votre propre réseau.",
    intro: "Benniscom développe des produits numériques, applications et systèmes intégrés pour les entreprises qui veulent opérer avec leur propre marque et leurs propres règles.",
    icon: Globe2,
    accent: "cyan",
    sections: [
      { title: "Notre position", body: "DepXpreS n'est pas une franchise et ne vous impose pas un partage de revenus. C'est un système logiciel licencié que vous déployez, configurez et exploitez selon votre marché.", icon: ShieldCheck },
      { title: "Notre mission", body: "Rendre accessibles les briques opérationnelles nécessaires à la mobilité, la livraison, le commerce local et la supervision multi-zones.", icon: Radar },
      { title: "Notre méthode", body: "Audit du produit, configuration des intégrations, activation de licence, tests de bout en bout et accompagnement selon la formule choisie.", icon: Settings2 },
    ],
  },
  platform: {
    eyebrow: "DEPXPRES / PLATEFORME",
    title: "Un système connecté de bout en bout.",
    intro: "Chaque rôle travaille dans son application, tandis que le centre de contrôle garde une vision commune des comptes, zones, commandes, missions et événements.",
    icon: Layers3,
    accent: "cyan",
    sections: [
      { title: "La demande", body: "Le client sélectionne un service, renseigne son adresse, confirme sa commande ou sa course et reçoit les informations disponibles.", bullets: ["Recherche par service, commerce ou produit", "Adresse, panier, réservation et confirmation", "Suivi, reçus, historique et assistance"], icon: UsersRound },
      { title: "L'exécution", body: "Le partenaire prépare, le chauffeur reçoit une mission compatible et l'administration supervise les changements de statut.", bullets: ["Disponibilité et affectation", "Navigation et preuve de service", "Incidents, retards et annulations"], icon: Truck },
      { title: "Le contrôle", body: "Les opérations sont regroupées dans un centre de contrôle avec rôles, permissions, zones, rapports et paramètres d'activation.", bullets: ["Dispatching et supervision", "Paiements et indicateurs", "Licences et domaines autorisés"], icon: Radar },
    ],
  },
  applications: {
    eyebrow: "DEPXPRES / 4 APPLICATIONS",
    title: "Quatre expériences, une infrastructure.",
    intro: "Le système est composé de quatre environnements spécialisés qui partagent une même logique opérationnelle.",
    icon: Layers3,
    accent: "violet",
    sections: [
      { title: "Des rôles séparés", body: "Chaque utilisateur voit les outils nécessaires à son travail : le client commande, le chauffeur exécute, le partenaire prépare et l'administration coordonne.", icon: UsersRound },
      { title: "Des événements partagés", body: "Les changements de statut, notifications, affectations et mises à jour sont synchronisés entre les applications selon les permissions.", icon: Radar },
    ],
  },
  modules: {
    eyebrow: "DEPXPRES / MODULES",
    title: "Les modules qui rendent l'opération possible.",
    intro: "Le site décrit chaque module avec son rôle, sa nécessité et les applications qui le synchronisent. Les fonctions dépendantes d'une intégration externe sont à confirmer au déploiement.",
    icon: Boxes,
    accent: "lime",
    sections: [{ title: "Cartographie opérationnelle", body: "Une lecture structurée des modules réellement nécessaires pour lancer et piloter un réseau de mobilité et livraison.", icon: BarChart3 }],
  },
  technology: {
    eyebrow: "DEPXPRES / TECHNOLOGIE & SÉCURITÉ",
    title: "Configurer sans exposer vos secrets.",
    intro: "Les clés privées, jetons d'administration et identifiants de paiement restent protégés côté serveur et ne doivent jamais apparaître dans le navigateur ou la documentation publique.",
    icon: LockKeyhole,
    accent: "amber",
    sections: [
      { title: "Intégrations", body: "Cartographie, géolocalisation, paiements, notifications, authentification, stockage et licence sont configurés selon votre environnement.", bullets: ["Variables d'environnement protégées", "Webhooks vérifiés côté serveur", "Clés API séparées par environnement"], icon: Code2 },
      { title: "Accès et rôles", body: "Les utilisateurs, permissions et actions administratives doivent être vérifiés côté serveur avec journalisation des opérations sensibles.", bullets: ["Contrôle par rôle", "Journal d'activation", "Limitation des domaines autorisés"], icon: ShieldCheck },
    ],
  },
  installation: {
    eyebrow: "DEPXPRES / INSTALLATION",
    title: "De l'achat à la mise en production.",
    intro: "Une procédure guidée pour préparer l'hébergement, connecter les services et valider le système avant son lancement public.",
    icon: Wrench,
    accent: "cyan",
    sections: [
      { title: "01 — Préparer", body: "Choisissez l'hébergement, le domaine, le certificat HTTPS, la base de données et les gestionnaires de secrets.", icon: Settings2 },
      { title: "02 — Configurer", body: "Renseignez les paramètres d'application, l'authentification, les cartes, les paiements, les notifications et le stockage.", icon: Code2 },
      { title: "03 — Activer", body: "Associez le code unique au domaine autorisé et vérifiez les droits correspondant à la licence achetée.", icon: BadgeCheck },
      { title: "04 — Tester", body: "Testez les comptes, commandes, courses, paiements, notifications, dispatching, permissions et scénarios d'incident.", icon: Check },
    ],
  },
  licenses: {
    eyebrow: "DEPXPRES / TARIFS & LICENCES",
    title: "Une licence adaptée à votre ambition.",
    intro: "Les trois formules incluent le code source des quatre applications. Les droits de déploiement, domaines, support et modifications sont définis dans le contrat.",
    icon: BadgeCheck,
    accent: "amber",
    sections: [
      { title: "1 000 $ US — Independent", body: "Licence mono-domaine sans soutien technique. Installation, configuration et maintenance à la charge de l'acheteur.", bullets: ["Code source complet", "4 applications", "1 domaine autorisé", "1 activation"], icon: FileText },
      { title: "2 000 $ US — Assisted", body: "Licence mono-domaine avec six mois de soutien technique et assistance à l'installation.", bullets: ["Tout Independent", "Configuration APIs et variables", "Six mois de soutien", "Dépannage selon contrat"], icon: Headphones },
      { title: "10 000 $ US — Multi-domain", body: "Licence pour plusieurs domaines autorisés, marques ou marchés, avec soutien sur demande selon les conditions convenues.", bullets: ["Code source complet", "Plusieurs domaines", "Gestion des activations", "Soutien sur demande"], icon: Globe2 },
    ],
  },
  purchase: {
    eyebrow: "DEPXPRES / ACHETER",
    title: "Un parcours d'achat clair et sécurisé.",
    intro: "Le site public présente les formules. La licence n'est délivrée qu'après confirmation côté serveur du paiement et validation des informations contractuelles.",
    icon: CreditCard,
    accent: "cyan",
    sections: [
      { title: "1 — Choisir la formule", body: "Sélectionnez le niveau de code, de domaines et de support correspondant à votre marché.", icon: BadgeCheck },
      { title: "2 — Renseigner le projet", body: "Indiquez l'acheteur, le domaine autorisé, les informations de facturation et les besoins d'installation.", icon: FileText },
      { title: "3 — Payer et confirmer", body: "Le paiement est vérifié par le fournisseur et la licence n'est émise qu'après confirmation sécurisée.", icon: CreditCard },
      { title: "4 — Recevoir et activer", body: "Vous recevez les accès prévus, la documentation et le code d'activation selon votre contrat.", icon: Send },
    ],
  },
  support: {
    eyebrow: "DEPXPRES / SUPPORT TECHNIQUE",
    title: "Une assistance organisée par priorité.",
    intro: "Le soutien dépend de la licence choisie et des conditions contractuelles. Les demandes sont classées pour accélérer le diagnostic et la résolution.",
    icon: Headphones,
    accent: "violet",
    sections: [
      { title: "Installation & configuration", body: "Déploiement, domaine, variables d'environnement, intégrations, authentification et activation.", icon: Wrench },
      { title: "Bug & problème technique", body: "Application inaccessible, comportement incorrect, erreurs de données ou régression d'un module.", icon: LifeBuoy },
      { title: "Urgence critique", body: "Indisponibilité complète ou incident qui bloque une opération essentielle. La priorité et le délai sont définis au contrat.", icon: ShieldCheck },
    ],
  },
  faq: {
    eyebrow: "DEPXPRES / FAQ",
    title: "Les réponses avant le déploiement.",
    intro: "Les droits exacts, la configuration et les intégrations sont confirmés avant la signature et le paiement.",
    icon: CircleHelp,
    accent: "cyan",
    sections: [
      { title: "Le code source est-il inclus ?", body: "Oui. Les trois offres incluent le code source des quatre applications. La licence définit les droits d'utilisation, de modification et de déploiement.", icon: Check },
      { title: "Puis-je utiliser ma propre marque ?", body: "Oui. Le système est conçu pour être exploité sous votre marque et votre domaine autorisé.", icon: Check },
      { title: "La licence est-elle une franchise ?", body: "Non. Il s'agit d'une licence logicielle indépendante. Aucun partenariat obligatoire ni partage automatique de revenus n'est inclus.", icon: Check },
      { title: "Les paiements et cartes sont-ils inclus ?", body: "Les intégrations dépendent de l'environnement livré. Les clés, comptes fournisseurs et conditions d'utilisation sont configurés au déploiement.", icon: Check },
    ],
  },
  contact: {
    eyebrow: "DEPXPRES / CONTACT",
    title: "Parlons de votre marché.",
    intro: "Décrivez votre pays, votre domaine, le nombre d'opérations visé et le niveau d'accompagnement souhaité. Nous pourrons orienter la formule et les prochaines étapes.",
    icon: Send,
    accent: "cyan",
    sections: [
      { title: "Informations à préparer", body: "Marché cible, marque, domaine, services souhaités, nombre de villes, intégrations prévues et niveau de support.", bullets: ["Mobilité, livraison ou les deux", "Une marque ou plusieurs domaines", "Installation autonome ou accompagnée"], icon: FileText },
      { title: "Réponse commerciale", body: "Après réception de votre demande, les droits, limites de domaine, calendrier et conditions de support sont précisés avant tout paiement.", icon: Headphones },
    ],
  },
};

function LogoMark() {
  return <span className="logo-mark" aria-hidden="true"><span /><span /><span /></span>;
}

export default function InfoPage({ kind }: { kind: PageKind }) {
  const data = pageData[kind];
  const Icon = data.icon;
  const [open, setOpen] = useState<number | null>(kind === "faq" ? 0 : null);

  return (
    <div className="info-page">
      <header className="info-header"><Link href="/" className="brand"><LogoMark /><span className="brand-word">DepXpreS<span>.</span></span></Link><nav><Link href="/platform">Plateforme</Link><Link href="/applications">Applications</Link><Link href="/modules">Modules</Link><Link href="/licenses">Licences</Link><Link href="/contact" className="info-header-cta">Parler à un spécialiste <ArrowRight size={14} /></Link></nav></header>
      <main>
        <section className={`info-hero info-accent-${data.accent}`}><div className="page-width info-hero-grid"><div><Link href="/" className="back-link"><ArrowLeft size={14} /> Retour à l'accueil</Link><div className="eyebrow"><span className="eyebrow-dot" />{data.eyebrow}</div><h1>{data.title}</h1><p>{data.intro}</p></div><div className="info-hero-icon"><Icon size={58} strokeWidth={1.2} /><span>DEPXPRES<br />SYSTEM LAYER</span></div></div></section>
        {kind === "applications" && <section className="page-width info-app-grid">{appCards.map((app) => { const AppIcon = app.icon; return <article className="info-app-card" key={app.name}><div className="info-card-icon"><AppIcon size={21} /></div><span>{app.label}</span><h2>{app.name}</h2><p>{app.body}</p><Link href="/platform">Voir le workflow <ArrowRight size={14} /></Link></article>; })}</section>}
        {kind === "modules" && <section className="page-width module-table-page"><div className="module-table-head"><span>Module</span><span>Explication</span><span>Nécessité</span><span>Synchronisation</span></div>{moduleRows.map(([name, explanation, necessity, sync, ModuleIcon]) => <article className="module-table-row" key={name}><div className="module-name"><ModuleIcon size={18} /><strong>{name}</strong></div><p>{explanation}</p><p>{necessity}</p><span className="module-sync">{sync}</span></article>)}</section>}
        <section className={`page-width info-sections ${kind === "modules" ? "info-sections-after-table" : ""}`}>{data.sections.map((section, index) => { const SectionIcon = section.icon || Icon; const isFaq = kind === "faq"; const expanded = open === index; return <article className={`info-section-card ${isFaq ? "info-faq-card" : ""}`} key={section.title}><button className="info-section-trigger" onClick={() => isFaq ? setOpen(expanded ? null : index) : undefined}><span className="info-section-title"><span className="info-section-icon"><SectionIcon size={18} /></span><strong>{section.title}</strong></span>{isFaq ? <ChevronDown size={18} className={expanded ? "faq-chevron-open" : ""} /> : <span className="info-section-number">0{index + 1}</span>}</button>{(!isFaq || expanded) && <div className="info-section-body"><p>{section.body}</p>{section.bullets && <ul>{section.bullets.map((bullet) => <li key={bullet}><Check size={15} />{bullet}</li>)}</ul>}</div>}</article>; })}</section>
        <section className="page-width info-bottom-cta"><div><span className="eyebrow"><span className="eyebrow-dot" />DEPXPRES / NEXT STEP</span><h2>Prêt à définir votre déploiement ?</h2></div><Link href="/contact" className="button-primary">Parler à un spécialiste <ArrowRight size={16} /></Link></section>
      </main>
      <footer className="site-footer info-footer"><div className="page-width footer-bottom"><span>© 2026 Benniscom / DepXpreS</span><span>Licence indépendante · Code source inclus</span><Link href="/support">Support technique <ArrowRight size={13} /></Link></div></footer>
    </div>
  );
}
