# Commandes Firebase

Documentation officielle : https://firebase.google.com/docs/cli?hl=fr#mac-linux-npm

## Prérequis

| Outil | Version |
|---|---|
| Node.js | 18 |
| firebase-tools | via npm (voir installation) |

## Installation

```bash
npm install -g firebase-tools
```

## Aide

```bash
firebase help
```

## Authentification

```bash
firebase login
firebase logout
```

## Projets

```bash
# Lister les projets Firebase disponibles
firebase projects:list

# Sélectionner le projet actif
firebase use nodedefrais
```

## Déploiement

```bash
# Déployer tout le hosting
firebase deploy --only hosting

# Déployer uniquement la cible "note2frais"
firebase deploy --only hosting:note2frais
```
