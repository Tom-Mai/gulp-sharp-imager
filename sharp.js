// eu besoin de changer en format import et non const = ..
// du fait que gulpfile necessite avec 'imagemin' de mettre type:module dans pkg.json je dois changer ici mon js en mjs.
import sharp from'sharp';
import glob from 'glob';
import path from 'path';
import fs from 'fs';

const sourceFolder = 'dist/images/webp/*.webp';
const destinationFolder = 'dist/images/resized/';

// Fonction pour redimensionner les images avec Sharp
function resizeImages() {
  // créé fichier s'il n'existe pas
  if (!fs.existsSync(destinationFolder)) {
    fs.mkdirSync(destinationFolder);
  }
  // Récupérer la liste des images à traiter
  const images = glob.sync(sourceFolder);

  // Parcourir les images et les redimensionner
  images.forEach(image => {
    const filename = path.basename(image, '.webp');
    sharp(image)
      .resize(200, 200)
      .toFile(`${destinationFolder}${filename}-resized.webp`, (err, info) => {
        if (err) {
          console.error(err);
        } else {
          console.log(`Image ${filename} redimensionnée avec succès.`);
        }
      });
  });
}

// Appeler la fonction pour redimensionner les images
resizeImages();
