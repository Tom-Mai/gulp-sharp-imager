# Optimisation d'images avec Gulp et Sharp

Ce projet fournit un pipeline d'optimisation d'images en utilisant Gulp pour la minification et la conversion en WebP, et Sharp pour le redimensionnement.

## Prérequis

Node.js et npm doivent être installés sur votre machine. Vous pouvez les télécharger à partir de [https://nodejs.org/](https://nodejs.org/).

## Installation

Suivez les étapes suivantes pour installer les dépendances nécessaires :

1. Initialisez votre projet Node.js avec la commande suivante :

    ```bash
    npm init
    ```

2. Installez Gulp globalement et localement en utilisant les commandes suivantes :

    ```bash
    npm install -g gulp
    npm install --save-dev gulp
    ```

    > **Note :** Si Gulp est installé localement, vous devrez utiliser `npx gulp` pour exécuter vos tâches gulp.

3. Installez les plugins nécessaires pour l'optimisation des images et la conversion en WebP :

    ```bash
    npm install --save-dev gulp-webp
    npm install --save-dev gulp-imagemin imagemin-mozjpeg imagemin-optipng
    ```

    > **Note :** À partir de la version 8.0.0, gulp-imagemin utilise la syntaxe ESM, ce qui signifie que vous devez utiliser `import` au lieu de `require` pour importer vos dépendances. Assurez-vous d'ajouter `"type": "module"` dans votre fichier `package.json`.

4. Pour le redimensionnement des images, nous utilisons Sharp. Vous pouvez l'installer avec la commande suivante :

    ```bash
    npm install sharp
    ```

    > **Note :** En raison de l'utilisation de la syntaxe ESM, vous devez renommer votre fichier `sharp.js` en `sharp.mjs`.

## Usage

1. Ajoutez un fichier `gulpfile.js` à la racine de votre projet.

2. Configurez votre tâche gulp en définissant les fonctions, les tâches de surveillance, et les tâches par défaut.

    > **Note :** Un script de surveillance est inclus dans `gulpfile.js` pour observer automatiquement les changements dans vos images et réexécuter les tâches correspondantes.

3. Exécutez la tâche gulp avec la commande suivante :

    ```bash
    npx gulp
    ```

Le pipeline d'optimisation des images fonctionne comme suit : Gulp minifie d'abord les images et les convertit en WebP, puis Sharp redimensionne les images et les enregistre dans un dossier séparé.

Dans ce processus, nous utilisons `import { exec } from 'child_process';` dans notre fichier `gulpfile.js` pour exécuter une commande Node.js. Cette commande est utilisée pour exécuter notre fichier `sharp.mjs` comme une tâche gulp, ce qui permet un enchaînement fluide des tâches d'optimisation des images.
