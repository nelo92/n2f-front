# N2F-FRONT

Application de gestion de notes de frais : saisie des dépenses, visualisation par mois/année (graphiques), export.

**Auteur :** MAU

## Stack technique

- Angular 12 (Angular Material, Angular Flex Layout, Bootstrap)
- Firebase (auth, hosting, données) via `@angular/fire`
- Chart.js / ng2-charts pour les graphiques

## Démarrage

### Pré-requis

Créer le fichier `src/environments/firebase.config.ts` (non versionné, contient la config Firebase du projet) :

```ts
export const firebaseConfig = {
  apiKey: '...',
  authDomain: '...',
  projectId: '...',
  // ...
};
```

### Installation et lancement

```bash
npm install
npm start        # lance le serveur de dev (ng serve)
```

### Scripts disponibles

| Commande         | Description                              |
|------------------|-------------------------------------------|
| `npm start`      | Serveur de dev local                      |
| `npm run build`  | Build de production                       |
| `npm test`       | Tests unitaires (Karma/Jasmine)           |
| `npm run lint`   | Lint du code                              |
| `npm run e2e`    | Tests end-to-end (Protractor)             |
| `npm run deploy` | Build prod + déploiement Firebase         |

## Environnements déployés

| Environnement | URL |
|---|---|
| Production | https://note2frais.web.app / https://note2frais.firebaseapp.com |
| Legacy / ancien domaine | https://nodedefrais.web.app / https://nodedefrais.firebaseapp.com |

## Suivi de projet

Board Trello : https://trello.com/b/OOIcPt5F/n2f-notedefrais

## TODO

**Authentification**
- [x] Email & mot de passe (v2.1.0)
- [ ] Facebook
- [ ] Twitter
- [ ] Microsoft
- [ ] GitHub
- [ ] Mot de passe oublié

**Fonctionnalités**
- [ ] Ajouter un libellé à la saisie
- [ ] Graphiques : chargement des données mois par mois (plus efficient que le chargement complet par année, actuellement en place)

## [Notes de version](./release-notes.md)
