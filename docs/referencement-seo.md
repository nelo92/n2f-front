# Référencement (SEO) — Google et Bing

Ce document décrit comment Note2Frais est référencé sur les moteurs de recherche Google et Microsoft Bing : fichiers techniques, déclaration des sites, vérification et suivi.

- **Site de production** : https://note2frais.web.app
- **Outils** : [Google Search Console](https://search.google.com/search-console) et [Bing Webmaster Tools](https://www.bing.com/webmasters)

---

## 1. Fichiers techniques du site

### `src/robots.txt`

Servi à la racine : https://note2frais.web.app/robots.txt

```
User-agent: *
Allow: /
Disallow: /n2f/

Sitemap: https://note2frais.web.app/sitemap.xml
```

| Directive | Effet |
|---|---|
| `User-agent: *` | Règles valables pour tous les robots (Googlebot, Bingbot…). |
| `Allow: /` | Tout le site peut être exploré. |
| `Disallow: /n2f/` | La partie privée de l'application (après connexion) n'est pas explorée. |
| `Sitemap:` | Indique l'emplacement du sitemap. L'URL doit être **absolue**. |

### `src/sitemap.xml`

Servi à la racine : https://note2frais.web.app/sitemap.xml

Il liste les pages publiques à indexer. Pour ajouter une page :

```xml
<url>
  <loc>https://note2frais.web.app/chemin/de/la/page</loc>
  <lastmod>2026-11-18</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.8</priority>
</url>
```

Règles à respecter :

- URL absolues, en `https`, sur le domaine `note2frais.web.app` uniquement.
- Fichier encodé en UTF-8 **sans BOM**, sans caractère avant `<?xml`.
- Ne lister que des pages publiques (jamais de pages sous `/n2f/`).
- `<lastmod>` est utilisé par Google et Bing s'il est exact ; `<changefreq>` et `<priority>` sont ignorés par Google.

### Publication par le build Angular

Les deux fichiers sont copiés à la racine de `dist/n2f` grâce aux `assets` de `angular.json` :

```json
"assets": [
  "src/favicon.ico",
  "src/robots.txt",
  "src/sitemap.xml",
  "src/assets"
]
```

> La règle de réécriture Firebase (`"source": "**"` → `/index.html`) ne pose pas de problème : Firebase Hosting sert en priorité les fichiers réellement présents dans `dist/n2f`.

### Balises dans `src/index.html`

```html
<html lang="fr">
<meta name="google-site-verification" content="..." />   <!-- vérification Google -->
<meta name="msvalidate.01" content="..." />              <!-- vérification Bing -->
<title>Note2Frais - Solution de gestion des notes de frais</title>
<meta name="description" content="Note2Frais, la solution en ligne pour gérer vos notes de frais : ...">
```

- **Ne jamais supprimer** les balises de vérification : la propriété serait perdue dans l'outil concerné.
- `title` : environ 50 à 60 caractères. `description` : environ 150 à 160 caractères. Ce sont les textes affichés dans les résultats de recherche.

---

## 2. Google Search Console

### Déclarer le site

1. Ouvrir https://search.google.com/search-console.
2. **Ajouter une propriété** → type **Préfixe d'URL** → `https://note2frais.web.app/`.
   - La propriété « Domaine » n'est pas utilisable : `web.app` appartient à Google (Firebase), on ne peut pas y ajouter d'enregistrement DNS.
3. Méthode de vérification : **Balise HTML**. Copier la valeur dans `<meta name="google-site-verification">` de `src/index.html`, déployer, puis cliquer sur **Valider**.

### Envoyer le sitemap

1. Menu **Sitemaps**.
2. Saisir `sitemap.xml` (le champ est déjà préfixé par l'URL du site) → **Envoyer**.
3. L'état attendu est **Opération effectuée**.

> **« Impossible de récupérer » (*Couldn't fetch*)** : ce statut s'affiche souvent pendant plusieurs jours après un premier envoi, même si le fichier est correct. Avant de chercher une erreur :
> - vérifier dans un navigateur que https://note2frais.web.app/sitemap.xml affiche bien le XML ;
> - utiliser **Inspection de l'URL** sur l'URL du sitemap → **Tester l'URL en direct** ;
> - vérifier que la propriété correspond exactement au domaine des URL du sitemap ;
> - attendre quelques jours, puis renvoyer le sitemap si besoin.

### Demander l'indexation d'une page

**Inspection de l'URL** → saisir l'URL complète → **Demander une indexation**. Utile après l'ajout ou la modification importante d'une page publique.

### Suivi

| Rapport | Utilité |
|---|---|
| **Pages** | Pages indexées / non indexées, avec la raison. |
| **Performances** | Clics, impressions, position moyenne, requêtes tapées. |
| **Signaux Web essentiels** | Performance perçue (LCP, INP, CLS). |
| **Ergonomie / HTTPS** | Problèmes d'affichage ou de sécurité. |

---

## 3. Bing Webmaster Tools

Bing alimente aussi les résultats de **DuckDuckGo**, **Ecosia**, **Qwant** (en partie), **Yahoo** et **Copilot**.

### Déclarer le site

Deux possibilités sur https://www.bing.com/webmasters :

- **Importer depuis Google Search Console** (le plus simple) : connexion avec le compte Google, Bing récupère la propriété vérifiée et les sitemaps.
- **Ajout manuel** : saisir `https://note2frais.web.app/`, choisir la vérification par **balise meta**, copier la valeur dans `<meta name="msvalidate.01">` de `src/index.html`, déployer, puis **Vérifier**.

### Envoyer le sitemap

Menu **Sitemaps** → **Envoyer le sitemap** → `https://note2frais.web.app/sitemap.xml` (URL complète cette fois).

Bing lit aussi la ligne `Sitemap:` du `robots.txt`.

### Demander l'indexation d'une page

- **Inspection d'URL** → **Demander l'indexation**.
- **Soumission d'URL** : envoi manuel d'une liste d'URL (quota quotidien).
- **IndexNow** (optionnel) : protocole qui notifie Bing (et Yandex, Seznam…) dès qu'une page change. Il faut héberger un fichier clé à la racine du site (par exemple `src/<clé>.txt` ajouté aux `assets`), puis appeler `https://api.indexnow.org/indexnow?url=<url>&key=<clé>` après chaque déploiement.

### Suivi

| Rapport | Utilité |
|---|---|
| **Performances de recherche** | Clics, impressions, position moyenne. |
| **Explorateur de site** | Pages connues de Bing et leur état. |
| **Analyse SEO** | Problèmes détectés (titre, description, balises manquantes…). |
| **Outils et améliorations → Tester robots.txt** | Vérifie qu'une URL n'est pas bloquée. |

---

## 4. Points d'attention propres à Note2Frais

- **Application Angular (SPA)** : le contenu est généré en JavaScript. Google l'exécute, Bing plus difficilement. Pour les pages publiques importantes, mettre le texte essentiel dans le HTML initial (ou envisager le pré-rendu / SSR Angular).
- **Plusieurs domaines** : le même site répond sur `note2frais.web.app`, `note2frais.firebaseapp.com` et sur l'ancien domaine `nodedefrais.*`. Pour éviter le contenu dupliqué :
  - ne déclarer et ne mettre dans le sitemap que `https://note2frais.web.app` ;
  - ajouter une balise canonique dans `src/index.html` : `<link rel="canonical" href="https://note2frais.web.app/">` (à adapter par page si le site en contient plusieurs publiques) ;
  - idéalement, rediriger l'ancien domaine vers le nouveau (redirection 301 dans le `firebase.json` du site legacy).
- **Pages indexables** : actuellement, le sitemap ne liste que `/auth/sign-in` et `/auth/sign-up`. Une page d'accueil ou de présentation publique, avec un vrai texte décrivant le service, améliorerait nettement le référencement.

---

## 5. Checklist après un déploiement

- [ ] https://note2frais.web.app/robots.txt s'affiche correctement (type `text/plain`).
- [ ] https://note2frais.web.app/sitemap.xml s'affiche correctement (type `application/xml`).
- [ ] Les balises `google-site-verification` et `msvalidate.01` sont toujours présentes dans le code source de la page.
- [ ] Si des pages publiques ont été ajoutées ou supprimées : `sitemap.xml` mis à jour et renvoyé dans Google Search Console et Bing Webmaster Tools.
- [ ] Après quelques jours : aucune nouvelle erreur dans les rapports **Pages** (Google) et **Explorateur de site** (Bing).

Vérification rapide en ligne de commande :

```bash
curl -I https://note2frais.web.app/robots.txt
curl -I https://note2frais.web.app/sitemap.xml
```

---

## Liens utiles

- [Google Search Central — Documentation SEO](https://developers.google.com/search/docs?hl=fr)
- [Google — Créer et envoyer un sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap?hl=fr)
- [Google — Présentation du fichier robots.txt](https://developers.google.com/search/docs/crawling-indexing/robots/intro?hl=fr)
- [Bing Webmaster Guidelines](https://www.bing.com/webmasters/help/webmaster-guidelines-30fba23a)
- [IndexNow](https://www.indexnow.org/fr_fr/index)
- [Protocole Sitemaps](https://www.sitemaps.org/fr/protocol.html)
