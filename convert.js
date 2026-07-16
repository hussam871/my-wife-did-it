const fs = require('fs');
const path = require('path');

let html = fs.readFileSync('index.html', 'utf-8');

const regex = /(?:src|url)\(['"]?(\/[^'"]+\.(?:png|jpg|jpeg))['"]?\)/g;
const matches = [...html.matchAll(regex)];

for (const match of matches) {
    const filePath = path.join(__dirname, match[1]);
    if (fs.existsSync(filePath)) {
        console.log('Converting', match[1]);
        const ext = path.extname(filePath).toLowerCase();
        let mime = 'image/jpeg';
        if (ext === '.png') mime = 'image/png';
        const base64 = fs.readFileSync(filePath).toString('base64');
        const dataUri = `data:${mime};base64,${base64}`;
        
        // Replace in HTML
        html = html.replace(new RegExp(`['"]?${match[1]}['"]?`, 'g'), `"${dataUri}"`);
    } else {
        console.log('Not found:', filePath);
    }
}

fs.writeFileSync('index.html', html);
console.log('Done.');
