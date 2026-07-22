# N2F-FRONT

Application de gestion de notes de frais : saisie des dépenses, visualisation par mois/année (graphiques), export.

**Auteur :** MAU

## Stack technique

- Angular 12 (Angular Material, Angular Flex Layout, Bootstrap)
- Firebase (auth, hosting, données) via `@angular/fire`
- Chart.js / ng2-charts pour les graphiques

## Démarrage

### Pré-requis

- Node.js 16
- `@angular/cli` installé globalement : `npm install -g @angular/cli`

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

## [Commandes Firebase](./docs/firebase-command.md)

## [Notes de version](./docs/release-notes.md)

## [Suivi de projet Trello](https://trello.com/b/OOIcPt5F/n2f-notedefrais)
