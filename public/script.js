const dropZone = document.getElementById('drop-zone');
const uploadBtn = document.getElementById('upload-btn');
const imagesDiv = document.getElementById('images');
const fileList = document.getElementById('file-list');
let files = [];

function updateFileList() {
  fileList.innerHTML = '';
  files.forEach(f => {
    const div = document.createElement('div');
    div.textContent = f.name;
    fileList.appendChild(div);
  });
}

function preview(data) {
  data.forEach(item => {
    const card = document.createElement('div');
    card.className = 'card';

    const img = document.createElement('img');
    img.src = item.url;

    const link = document.createElement('a');
    link.href = item.url;
    link.download = item.name;
    link.textContent = 'Télécharger';

    card.appendChild(img);
    card.appendChild(link);
    imagesDiv.appendChild(card);

let files = [];

function preview(data) {
  data.forEach(item => {
    const div = document.createElement('div');
    div.className = 'image-item';
    const link = document.createElement('a');
    link.href = item.url;
    link.download = item.name;
    link.textContent = 'Télécharger ' + item.name;
    const img = document.createElement('img');
    img.src = item.url;
    img.style.maxWidth = '200px';
    div.appendChild(img);
    div.appendChild(document.createElement('br'));
    div.appendChild(link);
    imagesDiv.appendChild(div);
  });
}

function send() {
  if (!files.length) return;
  const format = document.getElementById('format').value;
  const width = document.getElementById('width').value;
  const height = document.getElementById('height').value;
  const formData = new FormData();
  files.forEach(f => formData.append('images', f));
  formData.append('format', format);
  if (width) formData.append('width', width);
  if (height) formData.append('height', height);
  fetch('/upload', {method: 'POST', body: formData})
    .then(r => r.json())
    .then(data => {
      preview(data);
      files = [];

      updateFileList();

    })
    .catch(err => console.error(err));
}

dropZone.addEventListener('dragover', e => {
  e.preventDefault();
});

dropZone.addEventListener('drop', e => {
  e.preventDefault();
  files = Array.from(e.dataTransfer.files);

  updateFileList();

});

dropZone.addEventListener('click', () => {
  const input = document.createElement('input');
  input.type = 'file';
  input.multiple = true;
  input.onchange = e => {
    files = Array.from(e.target.files);

    updateFileList();

  };
  input.click();
});

uploadBtn.addEventListener('click', send);
