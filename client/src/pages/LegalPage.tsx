// Pages juridiques — 8 pages, trilingues FR / EN / AR (Lot 4).
// Modèle i18n : celui de Home.tsx — objet de traductions par langue,
// `documentElement.dir` + attribut `dir` (RTL pour l'arabe), sélecteur
// de langue. Ces textes sont des modèles à valider par un professionnel
// avant toute commercialisation (mention traduite dans les 3 langues).

import { Link } from "wouter";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Check,
  Cookie,
  FileText,
  Headphones,
  Key,
  LockKeyhole,
  Menu,
  Scale,
  ShieldCheck,
  X,
} from "lucide-react";
import { useState } from "react";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { COMMON, FOOTER_LABELS, NAV_LABELS, NAV_ROUTES, useSiteLanguage, type Language } from "@/lib/i18n";

export type LegalKind =
  | "terms"
  | "license"
  | "refund"
  | "privacy"
  | "cookies"
  | "security"
  | "ip"
  | "support-terms";

const DISCLAIMER_I18N: Record<Language, string> = {
  fr: "Ces textes sont des modèles fournis à titre informatif et doivent être validés par un professionnel compétent avant toute commercialisation.",
  en: "These texts are templates provided for information purposes and must be validated by a qualified professional before any commercial use.",
  ar: "هذه النصوص نماذج مقدمة لأغراض إعلامية ويجب أن يتحقق منها مهني مختص قبل أي استخدام تجاري.",
};

type LegalData = {
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

// ─── Données — français (langue source) ──────────────────────────────────────
const legalDataFr: Record<LegalKind, LegalData> = {
  terms: {
    eyebrow: "BENNISCOM / CONDITIONS GÉNÉRALES DE VENTE",
    title: "Conditions générales de vente.",
    intro:
      "Les présentes conditions encadrent la vente des licences logicielles DepXpreS par Benniscom à des acheteurs professionnels, au Canada et à l'international. Elles s'appliquent avec le contrat de licence signé avant tout paiement.",
    icon: Scale,
    accent: "cyan",
    sections: [
      { title: "Objet", body: "Les présentes conditions régissent la vente de licences d'utilisation du logiciel DepXpreS, comprenant le code source des quatre applications (Client, Chauffeur, Entreprise et Administration), selon la formule choisie. Aucune vente n'est conclue sans acceptation du contrat de licence.", icon: FileText },
      { title: "Prix et devises", body: "Les prix sont affichés en dollars américains (USD) : Independent 1 000 $, Assisted 2 000 $, Multi-domain 10 000 $. Les taxes applicables, les frais bancaires et les frais de conversion sont à la charge de l'acheteur, sauf mention contraire dans le contrat signé.", bullets: ["Independent — 1 000 $ USD, 1 domaine autorisé", "Assisted — 2 000 $ USD, 1 domaine autorisé, 6 mois de support", "Multi-domain — 10 000 $ USD, multi-domaines selon contrat"], icon: BadgeCheck },
      { title: "Commande et paiement", body: "La commande est passée via le formulaire de demande de licence, puis confirmée par écrit. Le paiement est traité via Stripe ou PayPal, une fois les moyens de paiement configurés. La licence n'est émise qu'après confirmation réelle du paiement côté serveur.", icon: Check },
      { title: "Livraison de la licence", body: "Après confirmation du paiement, l'acheteur reçoit un accès sécurisé au téléchargement du code source, un code d'activation unique et la documentation d'installation. L'activation lie la licence au domaine déclaré lors de l'achat.", icon: Key },
      { title: "Droits de l'acheteur", body: "L'acheteur exploite le logiciel sous sa propre marque et son propre domaine, selon les droits de sa formule. Les droits de modification, de redistribution et de revente sont définis dans le contrat de licence ; aucun transfert de propriété intellectuelle n'est automatique.", icon: ShieldCheck },
      { title: "Responsabilités de l'opérateur", body: "L'acheteur, en tant qu'opérateur indépendant, est responsable de la conformité légale dans son territoire : protection des données, règles de transport, fiscalité et toute réglementation locale applicable. Benniscom ne saurait être tenu responsable de l'exploitation faite du logiciel par l'acheteur.", icon: Scale },
      { title: "Droit applicable et litiges", body: "Le droit applicable et la juridiction compétente sont précisés dans le contrat de licence signé entre les parties. En l'absence de stipulation contraire, les lois applicables sont celles du lieu d'établissement du vendeur, tel qu'indiqué au contrat.", icon: FileText },
    ],
  },
  license: {
    eyebrow: "BENNISCOM / CONTRAT DE LICENCE LOGICIELLE",
    title: "Contrat de licence logicielle.",
    intro:
      "Ce document présente les termes types de la licence DepXpreS. Le contrat définitif est signé entre Benniscom et l'acheteur avant tout paiement ; il seul fait foi.",
    icon: FileText,
    accent: "cyan",
    sections: [
      { title: "Objet de la licence", body: "Benniscom concède à l'acheteur une licence d'utilisation du logiciel DepXpreS — code source des quatre applications : Client, Chauffeur, Entreprise et Administration — pour déployer et exploiter sa propre opération sous sa propre marque.", icon: FileText },
      { title: "Formules et domaines autorisés", body: "Trois formules sont proposées. Le nombre de domaines autorisés et le nombre d'activations sont fixés par formule et confirmés au contrat.", bullets: ["Independent (1 000 $ USD) : 1 domaine autorisé, 1 activation", "Assisted (2 000 $ USD) : 1 domaine autorisé, 1 activation, 6 mois de support", "Multi-domain (10 000 $ USD) : plusieurs domaines, selon les conditions définies au contrat"], icon: BadgeCheck },
      { title: "Code d'activation", body: "Un code d'activation unique est remis après confirmation du paiement. Il est associé au domaine déclaré lors de l'achat et vérifié au premier démarrage du système. Toute activation sur un domaine non autorisé est refusée.", icon: Key },
      { title: "Droits concédés", body: "La licence autorise l'utilisation, le déploiement et la modification du code source dans les limites de la formule choisie et pour les besoins de l'opération de l'acheteur. La marque blanche est autorisée : l'acheteur exploite le logiciel sous son propre nom.", icon: Check },
      { title: "Limites : pas de transfert de propriété intellectuelle", body: "La licence ne transfère aucune propriété intellectuelle : Benniscom conserve l'intégralité des droits sur le logiciel DepXpreS. La redistribution, la revente, la sous-licence et la mise à disposition du code source à des tiers sont soumises à l'autorisation écrite préalable de Benniscom, sauf stipulation contraire au contrat.", icon: LockKeyhole },
      { title: "Mises à jour", body: "Aucune promesse de mises à jour illimitées n'est faite. Les conditions de mise à jour — contenu, fréquence, durée — sont définies dans le contrat de licence selon la formule choisie.", icon: ShieldCheck },
      { title: "Support", body: "La licence Independent n'inclut aucun support technique. La licence Assisted inclut six mois de soutien technique. La licence Multi-domain inclut un soutien sur demande, selon les conditions convenues au contrat. Les modalités détaillées figurent dans les conditions du support technique.", icon: Headphones },
      { title: "Durée et résiliation", body: "La durée de la licence, les conditions de renouvellement et les motifs de résiliation (notamment en cas de non-respect des conditions d'utilisation ou de tentative de contournement de l'activation) sont fixés au contrat signé.", icon: Scale },
    ],
  },
  refund: {
    eyebrow: "BENNISCOM / POLITIQUE DE REMBOURSEMENT",
    title: "Politique de remboursement.",
    intro:
      "Le logiciel DepXpreS est un bien numérique livré avec son code source. Les conditions de remboursement tiennent compte de cette nature : une fois le code source téléchargé, le retour du produit n'est plus possible.",
    icon: Scale,
    accent: "cyan",
    sections: [
      { title: "Principe", body: "En raison de la nature numérique du produit et de la remise du code source complet, aucun remboursement n'est accordé une fois le code source téléchargé ou le code d'activation utilisé, sauf dans les cas prévus ci-dessous ou au contrat signé.", icon: FileText },
      { title: "Avant la livraison", body: "Tant que le code source n'a pas été téléchargé et que le code d'activation n'a pas été utilisé, l'acheteur peut demander l'annulation de sa commande et le remboursement du montant payé, déduction faite des frais bancaires ou de traitement effectivement supportés.", icon: Check },
      { title: "Produit non conforme ou non livré", body: "Si le code source livré est incomplet, corrompu ou inutilisable malgré l'assistance fournie, ou si la licence n'a pas été délivrée après confirmation du paiement, l'acheteur peut demander une nouvelle livraison ou un remboursement. La demande doit être faite par écrit, avec les éléments permettant de constater le problème.", icon: ShieldCheck },
      { title: "Comment demander un remboursement", body: "La demande se fait via le formulaire de support, en précisant le numéro de commande ou de licence, le domaine concerné et le motif. Chaque demande est examinée au cas par cas, dans les délais indiqués au contrat.", icon: Headphones },
      { title: "Frais et délais", body: "Lorsqu'un remboursement est accordé, il est effectué par le même moyen de paiement que l'achat initial, dans un délai raisonnable après acceptation de la demande. Les frais bancaires liés au remboursement peuvent être déduits, selon les conditions du contrat.", icon: Scale },
      { title: "Cas exclus", body: "Ne donnent pas lieu à remboursement : le changement d'avis après téléchargement du code source, l'incompatibilité avec un hébergement ou un environnement non conforme à la documentation, et l'abandon du projet par l'acheteur après activation.", icon: FileText },
    ],
  },
  privacy: {
    eyebrow: "BENNISCOM / POLITIQUE DE CONFIDENTIALITÉ",
    title: "Politique de confidentialité.",
    intro:
      "Cette politique décrit les données personnelles collectées par Benniscom dans le cadre de la vente des licences DepXpreS et de l'utilisation de ce site de présentation, ainsi que les droits des personnes concernées.",
    icon: ShieldCheck,
    accent: "cyan",
    sections: [
      { title: "Données collectées", body: "Nous collectons les informations que vous fournissez dans les formulaires du site : nom, courriel, téléphone, entreprise, pays, domaine prévu et contenu de votre demande. Les données de paiement sont traitées directement par Stripe ou PayPal ; elles ne transitent pas par nos serveurs et ne sont pas conservées par Benniscom.", bullets: ["Identité et coordonnées professionnelles", "Informations de commande et de facturation", "Contenu des demandes de support et de contact"], icon: FileText },
      { title: "Finalités", body: "Vos données servent à traiter votre demande de licence, émettre et activer votre licence, vous facturer, assurer le support technique convenu au contrat et répondre à vos demandes. Elles ne sont pas vendues ni louées à des tiers.", icon: Check },
      { title: "Conservation", body: "Les données sont conservées pendant la durée nécessaire aux finalités ci-dessus et aux obligations légales applicables (notamment comptables et fiscales). Elles sont ensuite supprimées ou anonymisées.", icon: LockKeyhole },
      { title: "Partage avec des tiers", body: "Vos données peuvent être partagées uniquement avec les prestataires nécessaires au traitement de votre demande : prestataire de paiement (Stripe, PayPal), prestataire d'envoi de courriels, hébergeur. Aucun autre partage n'a lieu sans votre consentement, sauf obligation légale.", icon: ShieldCheck },
      { title: "Données des opérateurs et de leurs utilisateurs", body: "Lorsque vous exploitez DepXpreS, vous êtes responsable des données personnelles collectées par votre propre opération (clients, chauffeurs, partenaires). Vous devez respecter la législation applicable dans votre territoire et informer vos utilisateurs en conséquence.", icon: Scale },
      { title: "Vos droits", body: "Vous pouvez demander l'accès, la rectification ou la suppression de vos données personnelles, ainsi que la limitation de leur traitement, en écrivant à contact@benniscom.com. Les modalités exactes dépendent de la législation applicable dans votre territoire.", icon: Headphones },
      { title: "Sécurité", body: "Les données sont protégées par des mesures techniques et organisationnelles raisonnables : accès restreint, chiffrement des échanges (HTTPS) et séparation des environnements. Aucun système n'est infaillible ; en cas d'incident, les personnes concernées sont informées selon les obligations légales applicables.", icon: LockKeyhole },
    ],
  },
  cookies: {
    eyebrow: "BENNISCOM / POLITIQUE DE COOKIES",
    title: "Politique de cookies.",
    intro:
      "Ce site de présentation utilise un nombre limité de cookies et de technologies similaires. Cette page explique lesquels, pourquoi, et comment les gérer.",
    icon: Cookie,
    accent: "cyan",
    sections: [
      { title: "Ce que nous utilisons", body: "Ce site utilise des cookies strictement nécessaires à son fonctionnement (par exemple la mémorisation de la langue choisie et du thème d'affichage) et, le cas échéant, des mesures d'audience anonymisées. Aucun cookie publicitaire n'est déposé par ce site.", bullets: ["Cookies fonctionnels : langue, thème, préférences d'affichage", "Mesure d'audience : statistiques de visite anonymisées, le cas échéant"], icon: Check },
      { title: "Cookies tiers", body: "Les démos des applications (depxpres.vercel.app) et les services de paiement (Stripe, PayPal) peuvent déposer leurs propres cookies lorsque vous les utilisez. Leurs politiques s'appliquent alors : consultez-les directement sur leurs sites.", icon: FileText },
      { title: "Durée de conservation", body: "Les cookies de préférence sont conservés pendant une durée limitée, généralement douze mois au maximum, puis supprimés automatiquement. Les cookies de session sont supprimés à la fermeture du navigateur.", icon: LockKeyhole },
      { title: "Gérer vos cookies", body: "Vous pouvez refuser ou supprimer les cookies depuis les paramètres de votre navigateur. Le refus des cookies fonctionnels peut empêcher la mémorisation de votre langue ou de votre thème, sans bloquer la navigation.", icon: ShieldCheck },
    ],
  },
  security: {
    eyebrow: "BENNISCOM / POLITIQUE DE SÉCURITÉ",
    title: "Politique de sécurité.",
    intro:
      "Cette page décrit les mesures de sécurité du logiciel DepXpreS et de ce site de présentation, ainsi que les responsabilités de l'opérateur une fois le système déployé.",
    icon: LockKeyhole,
    accent: "cyan",
    sections: [
      { title: "Principes", body: "La sécurité repose sur le contrôle des accès par rôle, la vérification des permissions côté serveur, la journalisation des actions sensibles et l'activation de licence liée au domaine autorisé. Les secrets (clés API, mots de passe) ne doivent jamais figurer dans le code source : ils sont fournis par variables d'environnement.", icon: ShieldCheck },
      { title: "Accès et rôles", body: "Chaque utilisateur opère dans son espace de rôle (client, chauffeur, partenaire, administrateur). Les permissions croisées sont bloquées par défaut et les actions administratives sensibles sont journalisées.", bullets: ["Authentification par rôle (client, chauffeur, partenaire, administrateur)", "Permissions granulaires par module", "Journal des opérations critiques"], icon: LockKeyhole },
      { title: "Activation et domaines", body: "Le code d'activation unique est associé au domaine déclaré lors de l'achat et vérifié au premier démarrage. Toute tentative d'activation sur un domaine non autorisé est refusée et journalisée.", icon: Key },
      { title: "Responsabilités de l'opérateur", body: "Une fois le système déployé, l'opérateur est responsable de la sécurité de son hébergement, de la protection de ses clés API, de la gestion des comptes administrateurs et de l'application des mises à jour de sécurité. Benniscom ne peut pas sécuriser un déploiement dont il ne contrôle pas l'infrastructure.", icon: Scale },
      { title: "Signalement d'une vulnérabilité", body: "Toute vulnérabilité suspectée dans le logiciel DepXpreS ou sur ce site peut être signalée via le formulaire de contact, en décrivant le problème sans l'exploiter. Les signalements responsables sont examinés en priorité.", icon: Headphones },
      { title: "Limites", body: "Aucune mesure de sécurité ne garantit une protection absolue. Cette politique décrit des moyens mis en œuvre, non une garantie d'invulnérabilité. Les conditions contractuelles précisent les engagements applicables à chaque formule.", icon: FileText },
    ],
  },
  ip: {
    eyebrow: "BENNISCOM / PROPRIÉTÉ INTELLECTUELLE",
    title: "Propriété intellectuelle.",
    intro:
      "Le logiciel DepXpreS, sa marque et ses contenus appartiennent à Benniscom. Cette page précise ce que la licence autorise — et ce qu'elle n'autorise pas.",
    icon: BadgeCheck,
    accent: "cyan",
    sections: [
      { title: "Titularité", body: "DepXpreS, son code source, sa marque, son logo et sa documentation sont la propriété exclusive de Benniscom. L'achat d'une licence ne transfère aucun droit de propriété intellectuelle : il concède seulement un droit d'utilisation, dans les limites du contrat signé.", icon: ShieldCheck },
      { title: "Ce que la licence autorise", body: "L'acheteur peut utiliser, déployer et modifier le code source pour les besoins de sa propre opération, et exploiter le logiciel sous sa propre marque (marque blanche), dans les limites de sa formule.", icon: Check },
      { title: "Ce que la licence n'autorise pas", body: "Sauf stipulation contraire au contrat, l'acheteur ne peut pas : revendre ou redistribuer le code source, le sous-licencier, le mettre à disposition de tiers, retirer les mentions de propriété, ni présenter DepXpreS comme sa propre création.", bullets: ["Pas de revente ou de redistribution du code source sans autorisation écrite", "Pas de sous-licence à des tiers", "Pas de retrait des mentions de propriété"], icon: LockKeyhole },
      { title: "Marque de l'opérateur", body: "L'opérateur déploie le système sous sa propre marque. Il est responsable de vérifier que sa marque, son nom de domaine et ses contenus ne portent pas atteinte aux droits de tiers.", icon: FileText },
      { title: "Contenus de tiers", body: "Les marques, noms et contenus de tiers mentionnés dans la documentation (Stripe, PayPal, Google Maps, Firebase, Vercel) appartiennent à leurs titulaires respectifs. Leur mention ne constitue ni une affiliation ni une approbation.", icon: Scale },
      { title: "Recours", body: "Toute atteinte aux droits de propriété intellectuelle de Benniscom peut donner lieu aux recours prévus par le contrat de licence et par la loi applicable.", icon: FileText },
    ],
  },
  "support-terms": {
    eyebrow: "BENNISCOM / CONDITIONS DU SUPPORT TECHNIQUE",
    title: "Conditions du support technique.",
    intro:
      "Le support technique dépend de la formule de licence choisie. Ces conditions précisent ce qui est couvert, les canaux à utiliser et les délais applicables.",
    icon: Headphones,
    accent: "violet",
    sections: [
      { title: "Support par formule", body: "Le niveau de support est fixé par la licence. Aucun support n'est dû au-delà de ce que prévoit le contrat signé.", bullets: ["Independent (1 000 $ USD) : aucun support technique inclus — documentation fournie, assistance payante selon contrat", "Assisted (2 000 $ USD) : six mois de soutien technique inclus", "Multi-domain (10 000 $ USD) : soutien sur demande, selon les conditions convenues au contrat"], icon: BadgeCheck },
      { title: "Ce que couvre le support Assisted", body: "Pendant les six mois inclus, le support couvre l'assistance à l'installation, la configuration des APIs et des variables d'environnement, le dépannage technique et les incidents courants, dans les limites du contrat.", icon: Check },
      { title: "Ce qui n'est pas couvert", body: "Ne sont pas couverts : le développement de fonctionnalités sur mesure, la modification du code source à la demande, la formation complète des équipes, l'hébergement et l'infrastructure de l'opérateur, ni les problèmes causés par des modifications non documentées du code.", icon: FileText },
      { title: "Comment ouvrir un ticket", body: "Les demandes passent par le formulaire de support, avec le numéro de commande ou de licence, le domaine concerné, l'application concernée, la catégorie, la priorité et une description permettant de reproduire le problème. Les demandes incomplètes peuvent être renvoyées pour complément.", icon: Headphones },
      { title: "Priorités et délais", body: "Les demandes sont classées par priorité (normale, haute, critique). Les délais de première réponse et d'intervention sont définis dans le contrat. Une panne critique — indisponibilité complète ou blocage d'une opération essentielle — est traitée en priorité.", icon: ShieldCheck },
      { title: "Après les six mois", body: "À l'expiration du support inclus de la formule Assisted, l'opérateur peut demander une extension payante. Les modalités et tarifs sont définis au moment de la demande de renouvellement.", icon: Scale },
    ],
  },
};

// ─── Données — English ───────────────────────────────────────────────────────
const legalDataEn: Record<LegalKind, LegalData> = {
  terms: {
    eyebrow: "BENNISCOM / TERMS OF SALE",
    title: "Terms of sale.",
    intro:
      "These terms govern the sale of DepXpreS software licenses by Benniscom to professional buyers, in Canada and internationally. They apply together with the license agreement signed before any payment.",
    icon: Scale,
    accent: "cyan",
    sections: [
      { title: "Purpose", body: "These terms govern the sale of licenses to use the DepXpreS software, including the source code of the four applications (Customer, Driver, Business, and Administration), according to the chosen plan. No sale is concluded without acceptance of the license agreement.", icon: FileText },
      { title: "Prices and currencies", body: "Prices are shown in US dollars (USD): Independent $1,000, Assisted $2,000, Multi-domain $10,000. Applicable taxes, bank fees, and conversion fees are borne by the buyer, unless stated otherwise in the signed contract.", bullets: ["Independent — $1,000 USD, 1 authorized domain", "Assisted — $2,000 USD, 1 authorized domain, 6 months of support", "Multi-domain — $10,000 USD, multiple domains per contract"], icon: BadgeCheck },
      { title: "Order and payment", body: "The order is placed through the license request form, then confirmed in writing. Payment is processed via Stripe or PayPal, once the payment methods are configured. The license is issued only after real server-side confirmation of payment.", icon: Check },
      { title: "License delivery", body: "After payment confirmation, the buyer receives secure access to the source code download, a unique activation code, and the installation documentation. Activation ties the license to the domain declared at purchase.", icon: Key },
      { title: "Buyer's rights", body: "The buyer operates the software under its own brand and domain, according to the rights of its plan. Modification, redistribution, and resale rights are defined in the license agreement; no transfer of intellectual property is automatic.", icon: ShieldCheck },
      { title: "Operator responsibilities", body: "The buyer, as an independent operator, is responsible for legal compliance in its territory: data protection, transport rules, taxation, and any applicable local regulation. Benniscom cannot be held responsible for the buyer's operation of the software.", icon: Scale },
      { title: "Governing law and disputes", body: "The governing law and competent jurisdiction are stated in the license agreement signed between the parties. Absent any stipulation to the contrary, the applicable laws are those of the seller's place of establishment, as stated in the contract.", icon: FileText },
    ],
  },
  license: {
    eyebrow: "BENNISCOM / SOFTWARE LICENSE AGREEMENT",
    title: "Software license agreement.",
    intro:
      "This document presents the standard terms of the DepXpreS license. The final agreement is signed between Benniscom and the buyer before any payment; it alone is binding.",
    icon: FileText,
    accent: "cyan",
    sections: [
      { title: "Purpose of the license", body: "Benniscom grants the buyer a license to use the DepXpreS software — source code of the four applications: Customer, Driver, Business, and Administration — to deploy and operate its own business under its own brand.", icon: FileText },
      { title: "Plans and authorized domains", body: "Three plans are offered. The number of authorized domains and activations is set per plan and confirmed in the contract.", bullets: ["Independent ($1,000 USD): 1 authorized domain, 1 activation", "Assisted ($2,000 USD): 1 authorized domain, 1 activation, 6 months of support", "Multi-domain ($10,000 USD): multiple domains, under the terms defined in the contract"], icon: BadgeCheck },
      { title: "Activation code", body: "A unique activation code is delivered after payment confirmation. It is linked to the domain declared at purchase and verified on first startup of the system. Any activation on an unauthorized domain is refused.", icon: Key },
      { title: "Rights granted", body: "The license allows the use, deployment, and modification of the source code within the limits of the chosen plan and for the buyer's operational needs. White label is allowed: the buyer operates the software under its own name.", icon: Check },
      { title: "Limits: no transfer of intellectual property", body: "The license transfers no intellectual property: Benniscom retains all rights to the DepXpreS software. Redistribution, resale, sub-licensing, and making the source code available to third parties require Benniscom's prior written authorization, unless stated otherwise in the contract.", icon: LockKeyhole },
      { title: "Updates", body: "No promise of unlimited updates is made. Update terms — content, frequency, duration — are defined in the license agreement according to the chosen plan.", icon: ShieldCheck },
      { title: "Support", body: "The Independent license includes no technical support. The Assisted license includes six months of technical support. The Multi-domain license includes support on demand, under the terms agreed in the contract. Detailed terms are in the technical support terms.", icon: Headphones },
      { title: "Term and termination", body: "The license term, renewal terms, and grounds for termination (in particular in case of breach of the terms of use or attempted circumvention of activation) are set in the signed contract.", icon: Scale },
    ],
  },
  refund: {
    eyebrow: "BENNISCOM / REFUND POLICY",
    title: "Refund policy.",
    intro:
      "DepXpreS software is a digital product delivered with its source code. The refund terms reflect this: once the source code has been downloaded, the product can no longer be returned.",
    icon: Scale,
    accent: "cyan",
    sections: [
      { title: "Principle", body: "Due to the digital nature of the product and the delivery of the full source code, no refund is granted once the source code has been downloaded or the activation code used, except in the cases below or in the signed contract.", icon: FileText },
      { title: "Before delivery", body: "As long as the source code has not been downloaded and the activation code has not been used, the buyer may request cancellation of the order and a refund of the amount paid, less any bank or processing fees actually incurred.", icon: Check },
      { title: "Non-conforming or undelivered product", body: "If the delivered source code is incomplete, corrupted, or unusable despite the assistance provided, or if the license was not issued after payment confirmation, the buyer may request a new delivery or a refund. The request must be made in writing, with the evidence needed to establish the problem.", icon: ShieldCheck },
      { title: "How to request a refund", body: "Requests are made through the support form, stating the order or license number, the domain concerned, and the reason. Each request is reviewed case by case, within the timelines stated in the contract.", icon: Headphones },
      { title: "Fees and timelines", body: "When a refund is granted, it is made using the same payment method as the original purchase, within a reasonable time after the request is accepted. Bank fees related to the refund may be deducted, according to the contract terms.", icon: Scale },
      { title: "Excluded cases", body: "No refund is given for: a change of mind after downloading the source code, incompatibility with hosting or an environment that does not comply with the documentation, and abandonment of the project by the buyer after activation.", icon: FileText },
    ],
  },
  privacy: {
    eyebrow: "BENNISCOM / PRIVACY POLICY",
    title: "Privacy policy.",
    intro:
      "This policy describes the personal data collected by Benniscom in connection with the sale of DepXpreS licenses and the use of this presentation website, as well as the rights of the people concerned.",
    icon: ShieldCheck,
    accent: "cyan",
    sections: [
      { title: "Data collected", body: "We collect the information you provide in the site's forms: name, email, phone, company, country, planned domain, and the content of your request. Payment data is processed directly by Stripe or PayPal; it does not pass through our servers and is not kept by Benniscom.", bullets: ["Identity and business contact details", "Order and billing information", "Content of support and contact requests"], icon: FileText },
      { title: "Purposes", body: "Your data is used to process your license request, issue and activate your license, bill you, provide the technical support agreed in the contract, and answer your requests. It is not sold or rented to third parties.", icon: Check },
      { title: "Retention", body: "Data is kept for as long as needed for the above purposes and for applicable legal obligations (including accounting and tax). It is then deleted or anonymized.", icon: LockKeyhole },
      { title: "Sharing with third parties", body: "Your data may be shared only with the providers needed to process your request: payment provider (Stripe, PayPal), email provider, host. No other sharing takes place without your consent, except where required by law.", icon: ShieldCheck },
      { title: "Operator and user data", body: "When you operate DepXpreS, you are responsible for the personal data collected by your own operation (customers, drivers, partners). You must comply with the legislation applicable in your territory and inform your users accordingly.", icon: Scale },
      { title: "Your rights", body: "You may request access, correction, or deletion of your personal data, as well as restriction of its processing, by writing to contact@benniscom.com. The exact terms depend on the legislation applicable in your territory.", icon: Headphones },
      { title: "Security", body: "Data is protected by reasonable technical and organizational measures: restricted access, encryption of exchanges (HTTPS), and separation of environments. No system is infallible; in case of an incident, the people concerned are informed according to applicable legal obligations.", icon: LockKeyhole },
    ],
  },
  cookies: {
    eyebrow: "BENNISCOM / COOKIE POLICY",
    title: "Cookie policy.",
    intro:
      "This presentation website uses a limited number of cookies and similar technologies. This page explains which ones, why, and how to manage them.",
    icon: Cookie,
    accent: "cyan",
    sections: [
      { title: "What we use", body: "This site uses cookies strictly necessary for its operation (for example, remembering the chosen language and display theme) and, where applicable, anonymized audience measurement. No advertising cookie is set by this site.", bullets: ["Functional cookies: language, theme, display preferences", "Audience measurement: anonymized visit statistics, where applicable"], icon: Check },
      { title: "Third-party cookies", body: "The application demos (depxpres.vercel.app) and payment services (Stripe, PayPal) may set their own cookies when you use them. Their policies then apply: consult them directly on their sites.", icon: FileText },
      { title: "Retention period", body: "Preference cookies are kept for a limited period, generally twelve months at most, then deleted automatically. Session cookies are deleted when the browser is closed.", icon: LockKeyhole },
      { title: "Managing your cookies", body: "You can refuse or delete cookies from your browser settings. Refusing functional cookies may prevent your language or theme from being remembered, without blocking navigation.", icon: ShieldCheck },
    ],
  },
  security: {
    eyebrow: "BENNISCOM / SECURITY POLICY",
    title: "Security policy.",
    intro:
      "This page describes the security measures of the DepXpreS software and of this presentation website, as well as the operator's responsibilities once the system is deployed.",
    icon: LockKeyhole,
    accent: "cyan",
    sections: [
      { title: "Principles", body: "Security rests on role-based access control, server-side permission checks, logging of sensitive actions, and license activation tied to the authorized domain. Secrets (API keys, passwords) must never appear in the source code: they are supplied through environment variables.", icon: ShieldCheck },
      { title: "Access and roles", body: "Each user operates in their role space (customer, driver, partner, administrator). Cross-role permissions are blocked by default and sensitive administrative actions are logged.", bullets: ["Role-based authentication (customer, driver, partner, administrator)", "Granular permissions per module", "Audit log of critical operations"], icon: LockKeyhole },
      { title: "Activation and domains", body: "The unique activation code is linked to the domain declared at purchase and verified on first startup. Any activation attempt on an unauthorized domain is refused and logged.", icon: Key },
      { title: "Operator responsibilities", body: "Once the system is deployed, the operator is responsible for the security of its hosting, the protection of its API keys, the management of administrator accounts, and the application of security updates. Benniscom cannot secure a deployment whose infrastructure it does not control.", icon: Scale },
      { title: "Reporting a vulnerability", body: "Any suspected vulnerability in the DepXpreS software or on this site may be reported through the contact form, describing the problem without exploiting it. Responsible reports are reviewed as a priority.", icon: Headphones },
      { title: "Limits", body: "No security measure guarantees absolute protection. This policy describes measures implemented, not a guarantee of invulnerability. The contractual terms state the commitments applicable to each plan.", icon: FileText },
    ],
  },
  ip: {
    eyebrow: "BENNISCOM / INTELLECTUAL PROPERTY",
    title: "Intellectual property.",
    intro:
      "The DepXpreS software, its brand, and its content belong to Benniscom. This page states what the license allows — and what it does not.",
    icon: BadgeCheck,
    accent: "cyan",
    sections: [
      { title: "Ownership", body: "DepXpreS, its source code, brand, logo, and documentation are the exclusive property of Benniscom. Buying a license transfers no intellectual property right: it grants only a right of use, within the limits of the signed contract.", icon: ShieldCheck },
      { title: "What the license allows", body: "The buyer may use, deploy, and modify the source code for the needs of its own operation, and operate the software under its own brand (white label), within the limits of its plan.", icon: Check },
      { title: "What the license does not allow", body: "Unless stated otherwise in the contract, the buyer may not: resell or redistribute the source code, sub-license it, make it available to third parties, remove ownership notices, or present DepXpreS as its own creation.", bullets: ["No resale or redistribution of the source code without written authorization", "No sub-licensing to third parties", "No removal of ownership notices"], icon: LockKeyhole },
      { title: "Operator's brand", body: "The operator deploys the system under its own brand. It is responsible for verifying that its brand, domain name, and content do not infringe the rights of third parties.", icon: FileText },
      { title: "Third-party content", body: "The third-party brands, names, and content mentioned in the documentation (Stripe, PayPal, Google Maps, Firebase, Vercel) belong to their respective owners. Mentioning them is neither an affiliation nor an endorsement.", icon: Scale },
      { title: "Remedies", body: "Any infringement of Benniscom's intellectual property rights may give rise to the remedies provided in the license agreement and by applicable law.", icon: FileText },
    ],
  },
  "support-terms": {
    eyebrow: "BENNISCOM / TECHNICAL SUPPORT TERMS",
    title: "Technical support terms.",
    intro:
      "Technical support depends on the chosen license plan. These terms state what is covered, which channels to use, and the applicable timelines.",
    icon: Headphones,
    accent: "violet",
    sections: [
      { title: "Support by plan", body: "The support level is set by the license. No support is owed beyond what the signed contract provides.", bullets: ["Independent ($1,000 USD): no technical support included — documentation provided, paid assistance per contract", "Assisted ($2,000 USD): six months of technical support included", "Multi-domain ($10,000 USD): support on demand, under the terms agreed in the contract"], icon: BadgeCheck },
      { title: "What Assisted support covers", body: "During the six included months, support covers installation assistance, API and environment variable configuration, technical troubleshooting, and common incidents, within the limits of the contract.", icon: Check },
      { title: "What is not covered", body: "Not covered: custom feature development, on-demand source code modification, full team training, the operator's hosting and infrastructure, and problems caused by undocumented code modifications.", icon: FileText },
      { title: "How to open a ticket", body: "Requests go through the support form, with the order or license number, the domain concerned, the application concerned, the category, the priority, and a description that allows the problem to be reproduced. Incomplete requests may be returned for completion.", icon: Headphones },
      { title: "Priorities and timelines", body: "Requests are ranked by priority (normal, high, critical). First-response and intervention timelines are defined in the contract. A critical outage — complete unavailability or the blocking of an essential operation — is handled as a priority.", icon: ShieldCheck },
      { title: "After the six months", body: "When the Assisted plan's included support expires, the operator may request a paid extension. Terms and prices are defined at renewal time.", icon: Scale },
    ],
  },
};

// ─── Données — العربية ───────────────────────────────────────────────────────
const legalDataAr: Record<LegalKind, LegalData> = {
  terms: {
    eyebrow: "BENNISCOM / شروط البيع العامة",
    title: "شروط البيع العامة.",
    intro:
      "تؤطر هذه الشروط بيع تراخيص برمجيات DepXpreS من طرف Benniscom للمشترين المهنيين، في كندا ودوليا. وتطبق مع عقد الترخيص الموقع قبل أي دفع.",
    icon: Scale,
    accent: "cyan",
    sections: [
      { title: "الموضوع", body: "تنظم هذه الشروط بيع تراخيص استخدام برمجيات DepXpreS، بما فيها الكود المصدري للتطبيقات الأربعة (العميل والسائق والشركة والإدارة)، حسب الخطة المختارة. لا يتم أي بيع دون قبول عقد الترخيص.", icon: FileText },
      { title: "الأسعار والعملات", body: "الأسعار معروضة بالدولار الأمريكي (USD): Independent 1,000 $ وAssisted 2,000 $ وMulti-domain 10,000 $. الضرائب المطبقة والرسوم البنكية ورسوم التحويل على عاتق المشتري، ما لم ينص العقد الموقع على خلاف ذلك.", bullets: ["Independent — 1,000 $ أمريكي، نطاق واحد مصرح به", "Assisted — 2,000 $ أمريكي، نطاق واحد مصرح به، 6 أشهر دعم", "Multi-domain — 10,000 $ أمريكي، نطاقات متعددة حسب العقد"], icon: BadgeCheck },
      { title: "الطلب والدفع", body: "يتم الطلب عبر نموذج طلب الترخيص، ثم يؤكد كتابيا. يعالج الدفع عبر Stripe أو PayPal فور تهيئة وسائل الدفع. لا يصدر الترخيص إلا بعد تأكيد حقيقي للدفع من جهة الخادم.", icon: Check },
      { title: "تسليم الترخيص", body: "بعد تأكيد الدفع، يستلم المشتري وصولا آمنا لتنزيل الكود المصدري ورمز تفعيل فريدا وتوثيق التثبيت. التفعيل يربط الترخيص بالنطاق المعلن عند الشراء.", icon: Key },
      { title: "حقوق المشتري", body: "يشغل المشتري البرمجيات تحت علامته ونطاقه، حسب حقوق خطته. حقوق التعديل وإعادة التوزيع وإعادة البيع محددة في عقد الترخيص؛ ولا يوجد نقل تلقائي للملكية الفكرية.", icon: ShieldCheck },
      { title: "مسؤوليات المشغل", body: "المشتري، بصفته مشغلا مستقلا، مسؤول عن الامتثال القانوني في إقليمه: حماية البيانات وقواعد النقل والضرائب وأي لائحة محلية مطبقة. ولا يمكن تحميل Benniscom مسؤولية تشغيل المشتري للبرمجيات.", icon: Scale },
      { title: "القانون المطبق والنزاعات", body: "القانون المطبق والاختصاص القضائي محددان في عقد الترخيص الموقع بين الطرفين. وفي غياب نص مخالف، تطبق قوانين مكان تأسيس البائع كما هو مذكور في العقد.", icon: FileText },
    ],
  },
  license: {
    eyebrow: "BENNISCOM / عقد الترخيص البرمجي",
    title: "عقد الترخيص البرمجي.",
    intro:
      "تعرض هذه الوثيقة الشروط النموذجية لترخيص DepXpreS. العقد النهائي يوقع بين Benniscom والمشتري قبل أي دفع؛ وهو وحده الملزم.",
    icon: FileText,
    accent: "cyan",
    sections: [
      { title: "موضوع الترخيص", body: "تمنح Benniscom للمشتري ترخيص استخدام برمجيات DepXpreS — الكود المصدري للتطبيقات الأربعة: العميل والسائق والشركة والإدارة — لنشر وتشغيل عمليته الخاصة تحت علامته.", icon: FileText },
      { title: "الخطط والنطاقات المصرح بها", body: "توجد ثلاث خطط. عدد النطاقات المصرح بها وعدد التفعيلات يحدد لكل خطة ويؤكد في العقد.", bullets: ["Independent (1,000 $ أمريكي): نطاق واحد مصرح به، تفعيل واحد", "Assisted (2,000 $ أمريكي): نطاق واحد مصرح به، تفعيل واحد، 6 أشهر دعم", "Multi-domain (10,000 $ أمريكي): عدة نطاقات، حسب الشروط المحددة في العقد"], icon: BadgeCheck },
      { title: "رمز التفعيل", body: "يسلم رمز تفعيل فريد بعد تأكيد الدفع. يرتبط بالنطاق المعلن عند الشراء ويتحقق منه عند أول تشغيل للنظام. أي تفعيل على نطاق غير مصرح به يرفض.", icon: Key },
      { title: "الحقوق الممنوحة", body: "يسمح الترخيص باستخدام الكود المصدري ونشره وتعديله ضمن حدود الخطة المختارة ولحاجات عملية المشتري. العلامة البيضاء مسموح بها: يشغل المشتري البرمجيات باسمه الخاص.", icon: Check },
      { title: "الحدود: لا نقل للملكية الفكرية", body: "الترخيص لا ينقل أي ملكية فكرية: تحتفظ Benniscom بكل الحقوق في برمجيات DepXpreS. إعادة التوزيع وإعادة البيع والترخيص الفرعي وإتاحة الكود المصدري لأطراف ثالثة تخضع لإذن كتابي مسبق من Benniscom، ما لم ينص العقد على خلاف ذلك.", icon: LockKeyhole },
      { title: "التحديثات", body: "لا يوجد وعد بتحديثات غير محدودة. شروط التحديث — المحتوى والتكرار والمدة — محددة في عقد الترخيص حسب الخطة المختارة.", icon: ShieldCheck },
      { title: "الدعم", body: "ترخيص Independent لا يشمل دعما تقنيا. ترخيص Assisted يشمل ستة أشهر من الدعم التقني. ترخيص Multi-domain يشمل دعما عند الطلب، حسب الشروط المتفق عليها في العقد. الشروط المفصلة في شروط الدعم التقني.", icon: Headphones },
      { title: "المدة والإنهاء", body: "مدة الترخيص وشروط التجديد وأسباب الإنهاء (خاصة في حال عدم احترام شروط الاستخدام أو محاولة تجاوز التفعيل) محددة في العقد الموقع.", icon: Scale },
    ],
  },
  refund: {
    eyebrow: "BENNISCOM / سياسة الاسترداد",
    title: "سياسة الاسترداد.",
    intro:
      "برمجيات DepXpreS منتج رقمي يسلم مع كوده المصدري. شروط الاسترداد تأخذ هذه الطبيعة في الحسبان: فور تنزيل الكود المصدري، لا يمكن إرجاع المنتج.",
    icon: Scale,
    accent: "cyan",
    sections: [
      { title: "المبدأ", body: "بسبب الطبيعة الرقمية للمنتج وتسليم الكود المصدري الكامل، لا يمنح أي استرداد بعد تنزيل الكود المصدري أو استخدام رمز التفعيل، إلا في الحالات أدناه أو في العقد الموقع.", icon: FileText },
      { title: "قبل التسليم", body: "ما دام الكود المصدري لم ينزل ورمز التفعيل لم يستخدم، يمكن للمشتري طلب إلغاء طلبه واسترداد المبلغ المدفوع، بعد خصم الرسوم البنكية أو رسوم المعالجة المتكبدة فعلا.", icon: Check },
      { title: "منتج غير مطابق أو غير مسلم", body: "إذا كان الكود المصدري المسلم ناقصا أو تالفا أو غير قابل للاستخدام رغم المساعدة المقدمة، أو إذا لم يصدر الترخيص بعد تأكيد الدفع، يمكن للمشتري طلب تسليم جديد أو استرداد. يجب أن يكون الطلب كتابيا، مع العناصر التي تثبت المشكلة.", icon: ShieldCheck },
      { title: "كيف تطلب استردادا", body: "يتم الطلب عبر نموذج الدعم، مع ذكر رقم الطلب أو الترخيص والنطاق المعني والسبب. كل طلب يدرس حالة بحالة، ضمن الآجال المذكورة في العقد.", icon: Headphones },
      { title: "الرسوم والآجال", body: "عند منح الاسترداد، يتم بوسيلة الدفع نفسها المستخدمة في الشراء الأول، في أجل معقول بعد قبول الطلب. ويمكن خصم الرسوم البنكية المتعلقة بالاسترداد، حسب شروط العقد.", icon: Scale },
      { title: "حالات مستثناة", body: "لا تسترد في هذه الحالات: تغيير الرأي بعد تنزيل الكود المصدري، وعدم التوافق مع استضافة أو بيئة غير مطابقة للتوثيق، والتخلي عن المشروع من طرف المشتري بعد التفعيل.", icon: FileText },
    ],
  },
  privacy: {
    eyebrow: "BENNISCOM / سياسة الخصوصية",
    title: "سياسة الخصوصية.",
    intro:
      "تصف هذه السياسة البيانات الشخصية التي تجمعها Benniscom في إطار بيع تراخيص DepXpreS واستخدام موقع العرض هذا، وحقوق الأشخاص المعنيين.",
    icon: ShieldCheck,
    accent: "cyan",
    sections: [
      { title: "البيانات المجمعة", body: "نجمع المعلومات التي تقدمها في نماذج الموقع: الاسم والبريد والهاتف والشركة والبلد والنطاق المخطط ومحتوى طلبك. بيانات الدفع تعالج مباشرة من طرف Stripe أو PayPal؛ ولا تمر عبر خوادمنا ولا تحتفظ بها Benniscom.", bullets: ["الهوية وبيانات الاتصال المهنية", "معلومات الطلب والفوترة", "محتوى طلبات الدعم والاتصال"], icon: FileText },
      { title: "الأغراض", body: "تستخدم بياناتك لمعالجة طلب الترخيص وإصدار ترخيصك وتفعيله وفوترتك وتقديم الدعم التقني المتفق عليه في العقد والرد على طلباتك. ولا تباع أو تؤجر لأطراف ثالثة.", icon: Check },
      { title: "الاحتفاظ", body: "تحتفظ البيانات للمدة اللازمة للأغراض أعلاه وللالتزامات القانونية المطبقة (خاصة المحاسبية والضريبية). ثم تحذف أو تجهل هويتها.", icon: LockKeyhole },
      { title: "المشاركة مع أطراف ثالثة", body: "يمكن مشاركة بياناتك فقط مع المزودين اللازمين لمعالجة طلبك: مزود الدفع (Stripe وPayPal) ومزود إرسال البريد والمضيف. ولا تتم أي مشاركة أخرى دون موافقتك، إلا بموجب التزام قانوني.", icon: ShieldCheck },
      { title: "بيانات المشغلين ومستخدميهم", body: "عند تشغيلك DepXpreS، أنت مسؤول عن البيانات الشخصية التي تجمعها عمليتك الخاصة (العملاء والسائقون والشركاء). يجب أن تحترم التشريع المطبق في إقليمك وأن تعلم مستخدميك بذلك.", icon: Scale },
      { title: "حقوقك", body: "يمكنك طلب الوصول إلى بياناتك الشخصية أو تصحيحها أو حذفها، وكذلك تقييد معالجتها، بالكتابة إلى contact@benniscom.com. الشروط الدقيقة تعتمد على التشريع المطبق في إقليمك.", icon: Headphones },
      { title: "الأمان", body: "تحمى البيانات بتدابير تقنية وتنظيمية معقولة: وصول مقيد وتشفير التبادلات (HTTPS) وفصل البيئات. لا يوجد نظام معصوم؛ وفي حال وقوع حادث، يعلم الأشخاص المعنيون وفق الالتزامات القانونية المطبقة.", icon: LockKeyhole },
    ],
  },
  cookies: {
    eyebrow: "BENNISCOM / سياسة ملفات تعريف الارتباط",
    title: "سياسة ملفات تعريف الارتباط.",
    intro:
      "يستخدم موقع العرض هذا عددا محدودا من ملفات تعريف الارتباط والتقنيات المشابهة. توضح هذه الصفحة أيها ولماذا وكيف تديرها.",
    icon: Cookie,
    accent: "cyan",
    sections: [
      { title: "ما نستخدمه", body: "يستخدم هذا الموقع ملفات تعريف الارتباط الضرورية جدا لعمله (مثلا تذكر اللغة المختارة وسمة العرض) وعند الاقتضاء قياسات جمهور مجهولة الهوية. ولا يضع هذا الموقع أي ملف إعلاني.", bullets: ["ملفات وظيفية: اللغة والسمة وتفضيلات العرض", "قياس الجمهور: إحصاءات زيارة مجهولة الهوية عند الاقتضاء"], icon: Check },
      { title: "ملفات أطراف ثالثة", body: "قد تضع النسخ التجريبية للتطبيقات (depxpres.vercel.app) وخدمات الدفع (Stripe وPayPal) ملفاتها الخاصة عند استخدامها. وتطبق حينها سياساتها: راجعها مباشرة على مواقعها.", icon: FileText },
      { title: "مدة الاحتفاظ", body: "تحتفظ ملفات التفضيلات لمدة محدودة، اثنا عشر شهرا كحد أقصى عادة، ثم تحذف تلقائيا. وتحذف ملفات الجلسة عند إغلاق المتصفح.", icon: LockKeyhole },
      { title: "إدارة ملفات تعريف الارتباط", body: "يمكنك رفض ملفات تعريف الارتباط أو حذفها من إعدادات متصفحك. رفض الملفات الوظيفية قد يمنع تذكر لغتك أو سمتك، دون منع التصفح.", icon: ShieldCheck },
    ],
  },
  security: {
    eyebrow: "BENNISCOM / سياسة الأمان",
    title: "سياسة الأمان.",
    intro:
      "تصف هذه الصفحة تدابير أمان برمجيات DepXpreS وموقع العرض هذا، ومسؤوليات المشغل بعد نشر النظام.",
    icon: LockKeyhole,
    accent: "cyan",
    sections: [
      { title: "المبادئ", body: "يقوم الأمان على التحكم في الوصول حسب الدور، والتحقق من الصلاحيات من جهة الخادم، وتسجيل الإجراءات الحساسة، وتفعيل الترخيص المرتبط بالنطاق المصرح به. الأسرار (مفاتيح API وكلمات المرور) يجب ألا تظهر أبدا في الكود المصدري: تقدم عبر متغيرات البيئة.", icon: ShieldCheck },
      { title: "الوصول والأدوار", body: "يعمل كل مستخدم في فضاء دوره (عميل أو سائق أو شريك أو مدير). والصلاحيات المتقاطعة محظورة افتراضيا، وتسجل الإجراءات الإدارية الحساسة.", bullets: ["مصادقة حسب الدور (عميل أو سائق أو شريك أو مدير)", "صلاحيات دقيقة لكل وحدة", "سجل العمليات الحرجة"], icon: LockKeyhole },
      { title: "التفعيل والنطاقات", body: "يرتبط رمز التفعيل الفريد بالنطاق المعلن عند الشراء ويتحقق منه عند أول تشغيل. وأي محاولة تفعيل على نطاق غير مصرح به ترفض وتسجل.", icon: Key },
      { title: "مسؤوليات المشغل", body: "بعد نشر النظام، المشغل مسؤول عن أمان استضافته وحماية مفاتيح API وإدارة حسابات المديرين وتطبيق تحديثات الأمان. ولا يمكن لـ Benniscom تأمين نشر لا تتحكم في بنيته التحتية.", icon: Scale },
      { title: "الإبلاغ عن ثغرة", body: "يمكن الإبلاغ عن أي ثغرة مشتبه بها في برمجيات DepXpreS أو في هذا الموقع عبر نموذج الاتصال، بوصف المشكلة دون استغلالها. وتدرس البلاغات المسؤولة بأولوية.", icon: Headphones },
      { title: "الحدود", body: "لا يضمن أي تدبير أمني حماية مطلقة. تصف هذه السياسة وسائل مطبقة، وليست ضمانا للمناعة. الشروط التعاقدية تحدد الالتزامات المطبقة على كل خطة.", icon: FileText },
    ],
  },
  ip: {
    eyebrow: "BENNISCOM / الملكية الفكرية",
    title: "الملكية الفكرية.",
    intro:
      "برمجيات DepXpreS وعلامتها ومحتوياتها ملك لـ Benniscom. توضح هذه الصفحة ما يسمح به الترخيص — وما لا يسمح به.",
    icon: BadgeCheck,
    accent: "cyan",
    sections: [
      { title: "الملكية", body: "DepXpreS وكوده المصدري وعلامته وشعاره وتوثيقه ملك حصري لـ Benniscom. شراء ترخيص لا ينقل أي حق ملكية فكرية: يمنح فقط حق استخدام، ضمن حدود العقد الموقع.", icon: ShieldCheck },
      { title: "ما يسمح به الترخيص", body: "يمكن للمشتري استخدام الكود المصدري ونشره وتعديله لحاجات عمليته الخاصة، وتشغيل البرمجيات تحت علامته (علامة بيضاء)، ضمن حدود خطته.", icon: Check },
      { title: "ما لا يسمح به الترخيص", body: "ما لم ينص العقد على خلاف ذلك، لا يمكن للمشتري: إعادة بيع الكود المصدري أو إعادة توزيعه، أو ترخيصه فرعيا، أو إتاحته لأطراف ثالثة، أو إزالة إشعارات الملكية، أو تقديم DepXpreS كإبداع خاص به.", bullets: ["لا إعادة بيع أو إعادة توزيع للكود المصدري دون إذن كتابي", "لا ترخيص فرعي لأطراف ثالثة", "لا إزالة لإشعارات الملكية"], icon: LockKeyhole },
      { title: "علامة المشغل", body: "ينشر المشغل النظام تحت علامته. وهو مسؤول عن التحقق من أن علامته واسم نطاقه ومحتوياته لا تنتهك حقوق أطراف ثالثة.", icon: FileText },
      { title: "محتويات أطراف ثالثة", body: "العلامات والأسماء والمحتويات الخاصة بأطراف ثالثة المذكورة في التوثيق (Stripe وPayPal وGoogle Maps وFirebase وVercel) ملك لأصحابها. وذكرها لا يشكل انتماء ولا تأييدا.", icon: Scale },
      { title: "السبل القانونية", body: "أي انتهاك لحقوق الملكية الفكرية لـ Benniscom قد يؤدي إلى السبل المنصوص عليها في عقد الترخيص والقانون المطبق.", icon: FileText },
    ],
  },
  "support-terms": {
    eyebrow: "BENNISCOM / شروط الدعم التقني",
    title: "شروط الدعم التقني.",
    intro:
      "الدعم التقني يعتمد على خطة الترخيص المختارة. توضح هذه الشروط ما يغطيه والقنوات المستخدمة والآجال المطبقة.",
    icon: Headphones,
    accent: "violet",
    sections: [
      { title: "الدعم حسب الخطة", body: "مستوى الدعم يحدد بالترخيص. لا يستحق أي دعم يتجاوز ما ينص عليه العقد الموقع.", bullets: ["Independent (1,000 $ أمريكي): بدون دعم تقني مشمول — التوثيق مسلم، والمساعدة مدفوعة حسب العقد", "Assisted (2,000 $ أمريكي): ستة أشهر من الدعم التقني مشمولة", "Multi-domain (10,000 $ أمريكي): دعم عند الطلب، حسب الشروط المتفق عليها في العقد"], icon: BadgeCheck },
      { title: "ما يغطيه دعم Assisted", body: "خلال الستة أشهر المشمولة، يغطي الدعم المساعدة في التثبيت وضبط واجهات API ومتغيرات البيئة وحل المشاكل التقنية والحوادث الشائعة، ضمن حدود العقد.", icon: Check },
      { title: "ما لا يغطيه", body: "لا يغطي: تطوير وظائف مخصصة، وتعديل الكود المصدري عند الطلب، والتدريب الكامل للفرق، واستضافة المشغل وبنيته التحتية، والمشاكل الناتجة عن تعديلات غير موثقة في الكود.", icon: FileText },
      { title: "كيف تفتح طلبا", body: "تتم الطلبات عبر نموذج الدعم، مع رقم الطلب أو الترخيص والنطاق المعني والتطبيق المعني والفئة والأولوية ووصف يسمح بإعادة إنتاج المشكلة. والطلبات الناقصة قد تعاد لاستكمالها.", icon: Headphones },
      { title: "الأولويات والآجال", body: "تصنف الطلبات حسب الأولوية (عادية أو عالية أو حرجة). آجال الرد الأول والتدخل محددة في العقد. والعطل الحرج — تعطل كامل أو منع عملية أساسية — يعالج بأولوية.", icon: ShieldCheck },
      { title: "بعد الستة أشهر", body: "عند انتهاء الدعم المشمول في خطة Assisted، يمكن للمشغل طلب تمديد مدفوع. الشروط والأسعار تحدد عند التجديد.", icon: Scale },
    ],
  },
};

const legalData: Record<Language, Record<LegalKind, LegalData>> = {
  fr: legalDataFr,
  en: legalDataEn,
  ar: legalDataAr,
};

const legalHeroLabelI18n: Record<Language, string> = {
  fr: "DOCUMENT LÉGAL",
  en: "LEGAL DOCUMENT",
  ar: "مستند قانوني",
};

const legalCtaI18n: Record<Language, string> = {
  fr: "Une question sur ces conditions ?",
  en: "A question about these terms?",
  ar: "سؤال حول هذه الشروط؟",
};

export default function LegalPage({ kind }: { kind: LegalKind }) {
  const [lang, setLang] = useSiteLanguage("fr");
  const data = legalData[lang][kind];
  const Icon = data.icon;
  const t = COMMON[lang];
  const footer = FOOTER_LABELS[lang];
  const nav = NAV_LABELS[lang];
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
              <Link href="/" className="back-link"><ArrowLeft size={14} /> {t.backHome}</Link>
              <div className="eyebrow"><span className="eyebrow-dot" />{data.eyebrow}</div>
              <h1>{data.title}</h1>
              <p>{data.intro}</p>
              <p className="legal-disclaimer">{DISCLAIMER_I18N[lang]}</p>
            </div>
            <div className="info-hero-icon"><Icon size={58} strokeWidth={1.2} /><span>DEPXPRES<br />{legalHeroLabelI18n[lang]}</span></div>
          </div>
        </section>

        <section className="page-width info-sections">
          {data.sections.map((section, index) => {
            const SectionIcon = section.icon || Icon;
            return (
              <article className="info-section-card" key={section.title}>
                <div className="info-section-trigger">
                  <span className="info-section-title">
                    <span className="info-section-icon"><SectionIcon size={18} /></span>
                    <strong>{section.title}</strong>
                  </span>
                  <span className="info-section-number">0{index + 1}</span>
                </div>
                <div className="info-section-body">
                  <p>{section.body}</p>
                  {section.bullets && (
                    <ul>{section.bullets.map((bullet) => <li key={bullet}><Check size={15} />{bullet}</li>)}</ul>
                  )}
                </div>
              </article>
            );
          })}
        </section>

        <section className="page-width info-bottom-cta">
          <div>
            <span className="eyebrow"><span className="eyebrow-dot" />DEPXPRES / NEXT STEP</span>
            <h2>{legalCtaI18n[lang]}</h2>
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
