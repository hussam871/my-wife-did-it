const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf-8');

html = html.replace(/src="\/?data:/g, 'src="data:');
html = html.replace(/url\('\/?data:/g, "url('data:");
html = html.replace(/url\(\/?data:/g, "url(data:");

fs.writeFileSync('index.html', html);
console.log('Fixed.');
