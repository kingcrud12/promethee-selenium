# Promethee Selenium Website

Site de documentation et exemples pour Promethee + Selenium.

## Description

Ce dépôt contient une série de pages HTML, un petit script de génération de documentation, et des ressources CSS/JS pour une documentation sur l'utilisation de Promethee avec Selenium.

## Contenu du dépôt

- `index.html` - page d'accueil du site de documentation.
- `bilingual-support.html` - notes sur le support bilingue.
- `built-in-utilities.html` - utilitaires intégrés et exemples.
- `cli-commands.html` - commandes CLI documentées.
- `environment-mgmt.html` - gestion des environnements.
- `page-object-model.html` - exemples et explications du POM.
- `scaffolding.html` - scaffolding et structure des tests.
- `generate_docs.py` - script Python pour (re)générer la documentation/statique.
- `script.js` - scripts front-end pour le site.
- `styles.css` - styles CSS du site.
- `assets/fire.svg` - logo flamme (SVG) utilisé dans la topbar.

## Prérequis

- Navigateur web pour ouvrir les fichiers HTML.
- (Optionnel) Python 3.x si vous souhaitez exécuter `generate_docs.py`.

## Installation & exécution

1. Cloner le dépôt:

```bash
git clone <url-du-depot>
cd promethee-selenium-website
```

2. Ouvrir localement la page d'accueil dans un navigateur:

```bash
open index.html
```

3. (Optionnel) Lancer un serveur HTTP simple pour tester les ressources relatives:

```bash
python3 -m http.server 8000
# puis ouvrir http://localhost:8000
```

4. (Optionnel) Regénérer la documentation avec le script Python:

```bash
python3 generate_docs.py
```

## Développement

- Modifier les fichiers HTML/CSS/JS directement.
- Tester les changements via le serveur HTTP local.

## Contribuer

- Ouvrir une issue pour discuter d'une fonctionnalité ou d'un bug.
- Soumettre une pull request avec une description claire des changements.

## Licence

Licence non spécifiée — ajouter un fichier `LICENSE` si nécessaire.

---

Si vous voulez, je peux:

- Commiter `README.md` pour vous.
- Ajouter un modèle de `LICENSE` (MIT, Apache, ...).
- Mettre à jour le `generate_docs.py` pour intégrer un usage plus clair.
