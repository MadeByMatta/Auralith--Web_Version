const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'data', 'topAlbumsSpain.js');
let content = fs.readFileSync(filePath, 'utf8');

// Replace standard tracks object pattern
content = content.replace(/({\s*id:\s*['"][^'"]+['"],\s*title:\s*['"][^'"]+['"],\s*duration:\s*['"][^'"]+['"]\s*})/g, (match) => {
    // Inject audioUrl before the closing brace
    return match.replace(/}$/, `, audioUrl: '/audio/sample.mp3' }`);
});

fs.writeFileSync(filePath, content, 'utf8');
console.log('Successfully updated topAlbumsSpain.js');
