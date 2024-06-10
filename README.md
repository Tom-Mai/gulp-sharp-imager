# PROJET EN COURS

# Optimisation d'images avec Gulp et Sharp

Ce projet propose une chaîne de traitement d'optimisation d'images à l'aide de Gulp pour la minification et la conversion en WebP, et Sharp pour le redimensionnement.

## Prérequis

Node.js et npm doivent être installés sur votre machine. Vous pouvez les télécharger depuis [https://nodejs.org/](https://nodejs.org/).

## Installation

Suivez les étapes ci-dessous pour installer les dépendances nécessaires :

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

    > **Note :** À partir de la version 8.0.0, gulp-imagemin utilise la syntaxe ESM, vous devez donc utiliser `import` plutôt que `require` pour importer vos dépendances. Assurez-vous d'ajouter `"type": "module"` à votre fichier `package.json`.

4. Pour le redimensionnement des images, nous utilisons Sharp. Vous pouvez l'installer avec la commande suivante :

    ```bash
    npm install sharp
    ```

    > **Note :** En raison de l'utilisation de la syntaxe ESM, vous devez renommer votre fichier `sharp.js` en `sharp.mjs`.

## Usage

1. Ajoutez un fichier `gulpfile.js` à la racine de votre projet.

2. Configurez votre tâche gulp en définissant les fonctions, les tâches de surveillance, et les tâches par défaut.

    > **Note :** Un script d'observation est inclus dans `gulpfile.js` pour surveiller automatiquement les modifications apportées à vos images et réexécuter les tâches appropriées.

3. Exécutez la tâche gulp avec la commande suivante :

    ```bash
    npx gulp
    ```

La chaîne de traitement d'optimisation des images fonctionne comme suit : Gulp minifie d'abord les images et les convertit en WebP, puis Sharp redimensionne les images et les enregistre dans un dossier séparé.

Nous utilisons `import { exec } from 'child_process';` dans notre fichier `gulpfile.js` pour exécuter une commande Node.js. Cette commande est utilisée pour exécuter notre fichier `sharp.mjs` comme une tâche gulp, permettant une fluidité dans l'enchaînement des tâches d'optimisation d'images.

## Limitation de compatibilité ESM

À partir de la version 8.0.0, `gulp-imagemin` utilise le format ESM qui n'est pas encore entièrement pris en charge par tous les environnements ou outils de construction, comme Eleventy par exemple. Si vous rencontrez des problèmes avec l'usage du format ESM dans votre projet, vous pouvez envisager les options suivantes :

1. Utilisez une version antérieure de `gulp-imagemin` qui utilise la syntaxe CommonJS (`require`). Assurez-vous alors de réécrire les fichiers concernés en conséquence.

2. Explorez d'autres outils ou plugins d'optimisation d'images qui sont compatibles avec votre environnement de projet.

Ces solutions peuvent aider à surmonter les problèmes de compatibilité potentiels avec l'usage du format ESM.
