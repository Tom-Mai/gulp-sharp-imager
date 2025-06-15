import express from 'express';
import multer from 'multer';
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import archiver from 'archiver';

const app = express();
const upload = multer({ dest: 'uploads/' });
const outputDir = 'public/output';

if (!fs.existsSync('uploads')) fs.mkdirSync('uploads');
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

app.use(express.static('public'));

app.post('/upload', upload.array('images'), async (req, res) => {
  const format = req.body.format || 'jpg';
  const width = parseInt(req.body.width) || null;
  const height = parseInt(req.body.height) || null;

  const results = [];
  for (const file of req.files) {
    const name = path.parse(file.originalname).name + '.' + format;
    const outputPath = path.join(outputDir, name);
    let image = sharp(file.path);
    if (width || height) image = image.resize(width || null, height || null);
    if (format === 'webp') {
      await image.toFormat('webp').toFile(outputPath);
    } else {
      await image.toFormat('jpeg').toFile(outputPath);
    }
    fs.unlinkSync(file.path);
    results.push({ name, url: '/output/' + name });
  }
  res.json(results);
});

app.get('/download-all', (req, res) => {
  res.setHeader('Content-Type', 'application/zip');
  res.setHeader('Content-Disposition', 'attachment; filename=images.zip');
  const archive = archiver('zip', { zlib: { level: 9 } });
  archive.on('error', err => res.status(500).send({ error: err.message }));
  archive.pipe(res);
  archive.directory(outputDir, false);
  archive.finalize();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
