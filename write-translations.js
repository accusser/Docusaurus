const fs = require('fs');
const path = require('path');

const languages = ['ru', 'uk', 'sl', 'de', 'es', 'it', 'pl', 'tr'];

// Create base structure for each language
languages.forEach((lang) => {
  const dirPath = path.join(__dirname, 'i18n', lang);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
});

// Run translation extraction
require('@docusaurus/core').write({
  locale: languages,
});