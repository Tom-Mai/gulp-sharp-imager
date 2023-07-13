//List dependencies
import gulp from 'gulp';
const {src, dest, watch, series} = gulp;
import imagemin from 'gulp-imagemin';
import imageminMozjpeg from 'imagemin-mozjpeg';
import imageminOptipng from 'imagemin-optipng';
import imagewebp from 'gulp-webp';
import { exec } from 'child_process'; //permet d'exécuter une commande node.
//Create function

// recuperer sharp
export function runSharp(cb) {
    exec('node sharp.mjs', function(err, stdout, stderr) {
      console.log(stdout);
      console.error(stderr);
      cb(err);
    });
  }

//images
export function optimizeImg() {
// Write in V3 because it is not possible to write in V4 in Version 8.0.0 of imagemin
    return src(['src/images/*.{jpg,png}'])
    // test Ok avec une ensuite deux photos.
        .pipe(imagemin([
            imageminMozjpeg({quality:70, progressive:true}),
            imageminOptipng({optimizationLevel:2}),
        ]))
        .pipe(dest('dist/images'))
}
//webp
export function webpImage (){
    // Test ok depuis src : src/images
    // Test 2 ok depuis dist : dist/images vers dist/images/webp avec deux images.
    return src('dist/images/*.{jpg,png}')
    .pipe(imagewebp())
    .pipe(dest('dist/images/webp'))
};
//Create Whatchtasks
export function watchTask(){
    watch('src/images/*.{jpg,png}', optimizeImg);
    watch('src/images/*.{jpg,png}', optimizeImg);
};
//Default gulp

export default series(optimizeImg, webpImage, runSharp)
// , watchTask