// Import des dépendances
import gulp from 'gulp';
const {src, dest, watch, series} = gulp;
import imagemin from 'gulp-imagemin';
import imageminMozjpeg from 'imagemin-mozjpeg';
import imageminOptipng from 'imagemin-optipng';
import imagewebp from 'gulp-webp';
import { spawn } from 'child_process';

// Fonction pour exécuter sharp
export function runSharp(cb) {
    const sharpProcess = spawn('node', ['sharp.mjs']);

    sharpProcess.on('close', (code) => {
        if (code !== 0) {
            cb(new Error("sharp.mjs process failed."));
        } else {
            cb();
        }
    });
}
// Optimisation des images
export function optimizeImg() {
    return src(['src/images/*.{jpg,JPG,jpeg,JPEG,png,PNG}'])
        .pipe(imagemin([
            imageminMozjpeg({quality:70, progressive:true}),
            imageminOptipng({optimizationLevel:2}),
        ]))
        .pipe(dest('dist/images'));
}

// Conversion des images en webp
export function webpImage() {
    return src('dist/images/*.{jpg,JPG,jpeg,JPEG,png,PNG}')
        .pipe(imagewebp())
        .pipe(dest('dist/images/webp'));
}

// Tâche d'observation
export function watchTask() {
    watch(
        'src/images/*.{jpg,JPG,jpeg,JPEG,png,PNG}',
        series(optimizeImg, webpImage, runSharp)
    );
}

// Tâche par défaut
export default series(optimizeImg, webpImage, runSharp, watchTask);
