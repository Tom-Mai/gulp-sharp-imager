// Import des dépendances
import gulp from 'gulp';
const {src, dest, watch, series} = gulp;
import imagemin from 'gulp-imagemin';
import imageminMozjpeg from 'imagemin-mozjpeg';
import imageminOptipng from 'imagemin-optipng';
import imagewebp from 'gulp-webp';
import { exec } from 'child_process';

// Fonction pour exécuter sharp
export function runSharp(cb) {
    exec('node sharp.mjs', function(err, stdout, stderr) {
        console.log(stdout);
        console.error(stderr);
        cb(err);
    });
}

// Optimisation des images
export function optimizeImg() {
    return src(['src/images/*.{jpg,png}'])
        .pipe(imagemin([
            imageminMozjpeg({quality:70, progressive:true}),
            imageminOptipng({optimizationLevel:2}),
        ]))
        .pipe(dest('dist/images'));
}

// Conversion des images en webp
export function webpImage() {
    return src('dist/images/*.{jpg,png}')
        .pipe(imagewebp())
        .pipe(dest('dist/images/webp'));
}

// Tâche d'observation
export function watchTask() {
    watch('src/images/*.{jpg,png}', series(optimizeImg, webpImage));
}

// Tâche par défaut
export default series(optimizeImg, webpImage, runSharp, watchTask);
