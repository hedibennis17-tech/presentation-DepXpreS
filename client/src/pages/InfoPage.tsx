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

function LogoMark() {
  return <span className="logo-mark" aria-hidden="true"><span /><span /><span /></span>;
}

// ─── App cards ────────────────────────────────────────────────────────────────
const appCards = [
  { name: "DepXpreS Client", label: "Client", body: "Création de compte, recherche de services, commandes, courses, paiements, suivi en temps réel et historique. L'application mobile que l'utilisateur final télécharge.", icon: UsersRound },
  { name: "DepXpreS Chauffeur", label: "Chauffeur", body: "Profil, vérification des documents, disponibilité, réception des missions, navigation GPS, preuve de service, gestion des incidents et tableau des revenus.", icon: Truck },
  { name: "DepXpreS Entreprise", label: "Partenaire", body: "Catalogue produits, images, prix, variantes, gestion des stocks, réception des commandes, statuts, coordination chauffeur et rapports de vente.", icon: Store },
  { name: "DepXpreS Administration", label: "Administration", body: "Centre de contrôle complet : comptes, dispatching, zones, commandes, courses, paiements, notifications, licences, supervision et configuration système.", icon: Radar },
];

// ─── Workflow detaillé ─────────────────────────────────────────────────────────
const workflowClient = [
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
];

const workflowRideshare = [
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
];

const workflowChauffeur = [
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
];

const workflowEntreprise = [
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
];

// ─── Module rows ────────────────────────────────────────────────────────────────
const moduleRows = [
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
] as const;

// ─── Page data ──────────────────────────────────────────────────────────────────
const pageData: Record<PageKind, PageData> = {
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
      {
        title: "Client — commande, mobilité et suivi",
        body: "L'application mobile que vos utilisateurs finaux téléchargent. Elle couvre l'intégralité du cycle client : de la création de compte jusqu'au reçu et à l'historique.",
        bullets: workflowClient.slice(0, 7),
        icon: UsersRound,
      },
      {
        title: "Client — rideshare et transport",
        body: "Le workflow de réservation de course est intégré à l'application client. L'utilisateur accède aux deux services depuis la même interface.",
        bullets: workflowRideshare.slice(0, 6),
        icon: Navigation,
      },
      {
        title: "Chauffeur — missions et opérations",
        body: "L'application chauffeur gère l'intégralité du cycle opérationnel, depuis l'inscription jusqu'à la clôture de chaque mission et la consultation des revenus.",
        bullets: workflowChauffeur.slice(0, 7),
        icon: Truck,
      },
      {
        title: "Partenaire — catalogue et commandes",
        body: "L'interface dédiée aux commerces et restaurants partenaires. Elle centralise la gestion du catalogue, la réception des commandes et la coordination avec les chauffeurs.",
        bullets: workflowEntreprise.slice(0, 7),
        icon: Store,
      },
      {
        title: "Administration — centre de contrôle",
        body: "L'interface d'administration supervise l'ensemble des opérations : comptes, dispatching, zones, paiements, rapports et paramètres système.",
        bullets: [
          "Utilisateurs : clients, chauffeurs, entreprises et admins",
          "Vérification des profils et documents d'inscription",
          "Dispatching : missions, affectations et suivi en temps réel",
          "Commandes et courses : statuts, retards et historique",
          "Zones géographiques et règles de service",
          "Rapports, indicateurs et tableau de bord",
          "Configuration des APIs, licences et domaines autorisés",
        ],
        icon: Gauge,
      },
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
        body: "Le paiement est traité via Stripe ou PayPal. La licence n'est émise qu'après confirmation sécurisée du serveur. Une facture est générée automatiquement.",
        bullets: ["Stripe ou PayPal selon la disponibilité", "Confirmation serveur avant émission de la licence", "Facture téléchargeable dans votre tableau de bord"],
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

export default function InfoPage({ kind }: { kind: PageKind }) {
  const data = pageData[kind];
  const Icon = data.icon;
  const [open, setOpen] = useState<number | null>(kind === "faq" ? 0 : null);

  return (
    <div className="info-page">
      <header className="info-header">
        <Link href="/" className="brand"><LogoMark /><span className="brand-word">DepXpreS<span>.</span></span></Link>
        <nav>
          <Link href="/platform">Plateforme</Link>
          <Link href="/applications">Applications</Link>
          <Link href="/modules">Modules</Link>
          <Link href="/licenses">Licences</Link>
          <Link href="/contact" className="info-header-cta">Parler à un spécialiste <ArrowRight size={14} /></Link>
        </nav>
      </header>

      <main>
        <section className={`info-hero info-accent-${data.accent}`}>
          <div className="page-width info-hero-grid">
            <div>
              <Link href="/" className="back-link"><ArrowLeft size={14} /> Retour à l'accueil</Link>
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
            {appCards.map((app) => {
              const AppIcon = app.icon;
              return (
                <article className="info-app-card" key={app.name}>
                  <div className="info-card-icon"><AppIcon size={21} /></div>
                  <span>{app.label}</span>
                  <h2>{app.name}</h2>
                  <p>{app.body}</p>
                  <Link href="/platform">Voir le workflow <ArrowRight size={14} /></Link>
                </article>
              );
            })}
          </section>
        )}

        {/* Modules: table */}
        {kind === "modules" && (
          <section className="page-width module-table-page">
            <div className="module-table-head">
              <span>Module</span>
              <span>Explication</span>
              <span>Nécessité</span>
              <span>Synchronisation</span>
            </div>
            {moduleRows.map(([name, explanation, necessity, sync, ModuleIcon]) => (
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
                { step: "01", label: "Choisir", icon: BadgeCheck },
                { step: "02", label: "Renseigner", icon: FileText },
                { step: "03", label: "Payer", icon: CreditCard },
                { step: "04", label: "Recevoir", icon: Download },
                { step: "05", label: "Activer", icon: Key },
                { step: "06", label: "Déployer", icon: Zap },
              ].map(({ step, label, icon: StepIcon }) => (
                <div className="purchase-step" key={step}>
                  <div className="purchase-step-icon"><StepIcon size={20} /></div>
                  <span className="purchase-step-num">{step}</span>
                  <span className="purchase-step-label">{label}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Licenses: pricing cards */}
        {kind === "licenses" && (
          <section className="page-width licenses-cards-visual">
            <div className="pricing-grid">
              {[
                { name: "Independent", price: "1,000", accent: "neutral", icon: FileText, domains: "1 domaine", support: "Aucun support" },
                { name: "Assisted", price: "2,000", accent: "featured", icon: Headphones, domains: "1 domaine", support: "6 mois de support" },
                { name: "Multi-domain", price: "10,000", accent: "gold", icon: Globe2, domains: "Multi-domaines", support: "Support sur demande" },
              ].map((plan) => {
                const PlanIcon = plan.icon;
                return (
                  <article className={`pricing-card pricing-${plan.accent}`} key={plan.name}>
                    {plan.accent === "featured" && <div className="featured-ribbon">La plus choisie</div>}
                    <div className="plan-top"><PlanIcon size={19} /></div>
                    <span className="plan-name">{plan.name}</span>
                    <div className="plan-price"><span>$</span>{plan.price}<small>USD</small></div>
                    <div className="plan-rule" />
                    <ul>
                      <li><Check size={15} />Code source complet — 4 apps</li>
                      <li><Check size={15} />{plan.domains}</li>
                      <li><Check size={15} />{plan.support}</li>
                    </ul>
                    <Link href="/purchase" className={`plan-button ${plan.accent === "featured" ? "plan-button-bright" : ""}`}>
                      Choisir cette licence <ArrowRight size={16} />
                    </Link>
                  </article>
                );
              })}
            </div>
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
            <h2>Prêt à définir votre déploiement ?</h2>
          </div>
          <Link href="/contact" className="button-primary">Parler à un spécialiste <ArrowRight size={16} /></Link>
        </section>
      </main>

      <footer className="site-footer info-footer">
        <div className="page-width footer-bottom">
          <span>© 2026 Benniscom / DepXpreS</span>
          <span>Licence indépendante · Code source inclus</span>
          <Link href="/support">Support technique <ArrowRight size={13} /></Link>
        </div>
      </footer>
    </div>
  );
}
