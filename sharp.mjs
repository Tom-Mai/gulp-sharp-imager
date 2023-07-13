// Importations nécessaires
import sharp from 'sharp';
import glob from 'glob';
import path from 'path';
import fs from 'fs';

// Définition des dossiers source et de destination
const sourceFolder = 'dist/images/webp/*.webp';
const destinationFolder = 'dist/images/resized/';

// Fonction principale pour le redimensionnement des images
function resizeImages() {
  // Créer le dossier de destination s'il n'existe pas
  if (!fs.existsSync(destinationFolder)) {
    fs.mkdirSync(destinationFolder);
  }

  // Récupérer la liste des images à traiter
  const images = glob.sync(sourceFolder);

  // Redimensionner chaque image
  images.forEach(image => {
    const filename = path.basename(image, '.webp');
    sharp(image)
      .resize(200, 200)
      .toFile(`${destinationFolder}${filename}-resized.webp`, (err, info) => {
        // Gérer les erreurs
        if (err) {
          console.error(err);
        } else {
          // Afficher un message de succès pour chaque image redimensionnée
          console.log(`Image ${filename} redimensionnée avec succès.`);
        }
      });
  });
}

// Lancer le processus de redimensionnement des images
resizeImages();
