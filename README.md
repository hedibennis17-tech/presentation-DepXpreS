# presentation-DepXpreS

Site officiel de présentation commerciale de DepXpreS par Benniscom.

## Positionnement

DepXpreS est un logiciel de mobilité, livraison et commerce vendu sous licence indépendante. Les trois formules incluent le code source des quatre applications. Le client déploie sa propre opération, sa marque et son domaine selon les droits de la licence. Le produit n'est pas présenté comme une franchise et aucun partage obligatoire de revenus n'est inclus.

Site trilingue : français, anglais et arabe (avec vraie disposition RTL) sur toutes les pages, formulaires compris.

## Pages

- `/` — accueil et proposition de valeur
- `/about` — Benniscom et positionnement
- `/platform` — fonctionnement de la plateforme
- `/applications` — Client, Chauffeur, Entreprise et Administration
- `/applications/client`, `/applications/chauffeur`, `/applications/commerce`, `/applications/admin` — fiche détaillée par application (fonctions, utilisateurs, avantages, workflow complet, lien démo)
- `/fonctionnement` — les 4 workflows en diagrammes et le schéma d'interactions entre applications
- `/terms` — conditions générales de vente (modèle à valider par un professionnel)
- `/license` — contrat de licence logicielle (modèle à valider par un professionnel)
- `/refund` — politique de remboursement (modèle à valider par un professionnel)
- `/privacy` — politique de confidentialité (modèle à valider par un professionnel)
- `/cookies` — politique de cookies (modèle à valider par un professionnel)
- `/security` — politique de sécurité (modèle à valider par un professionnel)
- `/ip` — propriété intellectuelle (modèle à valider par un professionnel)
- `/support-terms` — conditions du support technique (modèle à valider par un professionnel)
- `/client` — espace client (page de structure, à venir)
- `/admin-portal` — espace administrateur commercial (page de structure, à venir)
- `/modules` — module / explication / nécessité / synchronisation
- `/technology-security` — intégrations, secrets et rôles
- `/installation` — préparation, configuration, activation et tests
- `/licenses` — licences 1 000 $, 2 000 $ et 10 000 $ US
- `/purchase` — parcours d'achat et validation
- `/support` — catégories de support et priorités
- `/faq` — questions commerciales et techniques
- `/contact` — informations à préparer pour une demande

## Déploiement Vercel

Le projet utilise Vite et génère le site statique dans `dist/public`. Le fichier `vercel.json` définit le build et le répertoire de sortie.

Dans Vercel : importer `hedibennis17-tech/presentation-DepXpreS`, branche `main`, puis conserver les paramètres définis par `vercel.json`. Le domaine `depxpres-presentation.vercel.app` doit être associé à ce projet et non à l'ancien projet DepXpreS.

## API serverless (formulaires et achat)

Les formulaires de `/purchase` (demande de licence), `/support` (ticket) et
`/contact` appellent des fonctions serverless Vercel dans `api/` :

- `api/license-request.ts` — demande de licence → courriel à l'administrateur (Resend)
- `api/support.ts` — ticket de support → courriel à l'administrateur (Resend)
- `api/contact.ts` — demande commerciale → courriel à l'administrateur (Resend)
- `api/checkout.ts` — session Stripe Checkout (redirection vers Stripe)
- `api/stripe-webhook.ts` — réception des événements Stripe (signature vérifiée, journalisation uniquement)
- `api/paypal-create-order.ts` — commande PayPal (redirection vers l'URL d'approbation)
- `api/paypal-capture.ts` — capture d'une commande PayPal approuvée

Les règles de validation sont partagées entre le client et le serveur
(`shared/form-schemas.ts`) : mêmes champs, mêmes messages d'erreur.

Le dossier `api/` est détecté automatiquement par Vercel. Le serveur
Express local (`server/index.ts`) ne sert **pas** `/api` — c'est normal.
En local, utilisez `vercel dev` pour tester les formulaires et l'achat.

## Variables d'environnement

À configurer dans Vercel → Project Settings → Environment Variables
(ne jamais les écrire dans le code ni les commiter).

| Variable | Rôle | Requis pour |
|---|---|---|
| `RESEND_API_KEY` | Clé API Resend (envoi des courriels) | Formulaires licence / support / contact |
| `ADMIN_EMAIL` | Courriel de l'administrateur qui reçoit les demandes | Formulaires licence / support / contact |
| `FROM_EMAIL` | Courriel expéditeur des messages (ex. `contact@benniscom.com`) | Formulaires licence / support / contact |
| `STRIPE_SECRET_KEY` | Clé secrète Stripe (création des sessions Checkout, vérification webhook) | Paiement Stripe |
| `STRIPE_PUBLISHABLE_KEY` | Clé publique Stripe (réservée à un usage futur côté client, ex. Stripe.js) | Paiement Stripe (futur) |
| `STRIPE_WEBHOOK_SECRET` | Secret de signature du webhook Stripe (endpoint `/api/stripe-webhook`) | Webhook Stripe |
| `PAYPAL_CLIENT_ID` | Identifiant client PayPal (REST) | Paiement PayPal |
| `PAYPAL_CLIENT_SECRET` | Secret client PayPal (REST) | Paiement PayPal |
| `PAYPAL_MODE` | `sandbox` (défaut) ou `live` | Paiement PayPal |

Comportement quand une variable est absente (aucun succès simulé) :

- Formulaires : le serveur répond **503** « service d'envoi d'e-mails non
  configuré » et le formulaire affiche cette raison — la demande n'est pas
  enregistrée, aucun courriel n'est prétendu envoyé.
- Achat Stripe / PayPal : le serveur répond **503** « paiement en ligne non
  configuré » et aucun paiement n'a lieu.
- Webhook Stripe : sans `STRIPE_WEBHOOK_SECRET`, la signature ne peut pas
  être vérifiée et l'événement est refusé (**503**).

Autres règles d'honnêteté :

- La licence n'est émise qu'après confirmation réelle du paiement côté
  serveur ; la facture est générée après cette confirmation.
- Le webhook Stripe journalise uniquement les événements : l'émission de
  licence et la génération de facture après `checkout.session.completed`
  sont une étape ultérieure à brancher dans `api/stripe-webhook.ts`
  (même principe côté PayPal après capture `COMPLETED`).
- Pièce jointe des tickets de support : **5 Mo maximum**. Au-delà, le
  formulaire invite l'utilisateur à envoyer le fichier par courriel.
- Le montant d'un achat est validé côté serveur : il doit correspondre
  exactement au tarif public de la formule (1 000 / 2 000 / 10 000 USD).

## Espaces client et admin — backend à brancher (Lot 3)

Les pages `/client` et `/admin-portal` sont des pages de structure honnêtes :
aucune authentification factice, aucun formulaire de connexion, aucune donnée
simulée. Chaque module y est listé avec son statut (« à venir — nécessite
backend et authentification » côté client, « à brancher — nécessite
authentification et base de données » côté admin).

### Recommandation : Supabase

Pour rendre ces espaces fonctionnels, la recommandation est **Supabase**
(Postgres hébergé + Auth + Storage + API REST auto-générée) :

- **Auth** : Supabase Auth (courriel + mot de passe, avec réinitialisation)
  pour les comptes clients et administrateurs ; rôles `customer` / `admin`
  stockés dans une table `profiles` et appliqués par Row Level Security.
- **Base de données** (tables à créer) : `customers`, `orders`, `invoices`,
  `licenses` (formule, domaines autorisés, code d'activation, statut),
  `activations`, `downloads` (historique), `support_tickets`,
  `contact_requests`, `source_versions`, `contents` (textes du site),
  `translations` (FR/EN/AR).
- **Storage** : buckets privés pour le code source et la documentation,
  avec URLs signées à durée limitée — jamais de lien public direct.
- **Branchement avec l'existant** : les fonctions `api/` actuelles (Resend,
  Stripe, PayPal) restent en place ; le webhook Stripe (`api/stripe-webhook.ts`)
  est l'endroit où créer la licence, la facture et le compte client après
  `checkout.session.completed` (même principe côté PayPal après capture
  `COMPLETED`).

### Alternative : Firebase Auth + Firestore

Alternative viable si l'équipe préfère rester sur la pile déjà citée dans la
documentation produit (Firebase) : Firebase Auth pour les comptes, Firestore
pour les collections ci-dessus (règles de sécurité par rôle), Firebase
Storage pour les téléchargements privés. Inconvénient par rapport à Supabase :
les relations (licence ↔ domaines ↔ activations ↔ factures) et les requêtes
d'administration sont plus lourdes à exprimer en NoSQL, et la facturation /
les rapports demandent davantage de code applicatif.

### Ce qui reste à brancher (dans l'ordre)

1. Projet Supabase (ou Firebase) + variables d'environnement
   (`SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` côté
   serveur uniquement — jamais exposée au client).
2. Schéma de base de données + RLS (un client ne voit que ses propres
   licences, factures et téléchargements ; un admin voit tout).
3. Authentification réelle sur `/client` et `/admin-portal` (connexion,
   session, déconnexion, réinitialisation du mot de passe).
4. Création du compte client et de la licence dans `api/stripe-webhook.ts`
   après paiement confirmé ; génération de la facture.
5. Téléchargements protégés (URLs signées) + historique des téléchargements.
6. Tickets de support et demandes de contact persistés en base (en plus du
   courriel Resend actuel) et suivis depuis les deux portails.

## Vérification locale

```bash
pnpm install --frozen-lockfile
pnpm check
pnpm build
```
