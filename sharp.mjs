import sharp from 'sharp';
import glob from 'glob';
import path from 'path';
import fs from 'fs';
import pMap from 'p-map'; // Nouvelle importation

// Définition des dossiers source et de destination
const sourceFolder = 'dist/images/webp/*.webp';
const destinationFolder = 'dist/images/resized/';

// Fonction pour redimensionner une seule image
async function resizeImage(image) {
  const filename = path.basename(image, '.webp');
  await sharp(image)
    .resize(270,200)
    .toFile(`${destinationFolder}${filename}-resized.webp`);
  console.log(`Image ${filename} redimensionnée avec succès.`);
}

// Fonction principale pour le redimensionnement des images
async function resizeImages() {
  // Créer le dossier de destination s'il n'existe pas
  if (!fs.existsSync(destinationFolder)) {
    fs.mkdirSync(destinationFolder, { recursive: true });
  }

  // Récupérer la liste des images à traiter
  const images = glob.sync(sourceFolder);

  // Redimensionner chaque image
  await pMap(images, resizeImage, { concurrency: 10 }); // Ici, nous utilisons pMap pour redimensionner les images 10 par 10
}

// Lancer le processus de redimensionnement des images
resizeImages().catch(console.error); // Attraper et afficher les erreurs éventuelles
