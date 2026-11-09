# presentation-DepXpreS

Site officiel de présentation commerciale de DepXpreS par Benniscom.

## Positionnement

DepXpreS est un logiciel de mobilité, livraison et commerce vendu sous licence indépendante. Les trois formules incluent le code source des quatre applications. Le client déploie sa propre opération, sa marque et son domaine selon les droits de la licence. Le produit n'est pas présenté comme une franchise et aucun partage obligatoire de revenus n'est inclus.

## Pages

- `/` — accueil et proposition de valeur
- `/about` — Benniscom et positionnement
- `/platform` — fonctionnement de la plateforme
- `/applications` — Client, Chauffeur, Entreprise et Administration
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

## Vérification locale

```bash
pnpm install --frozen-lockfile
pnpm check
pnpm build
```
