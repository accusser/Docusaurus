const { execSync } = require('child_process');
const locales = ['ru', 'uk', 'sl', 'de', 'es', 'it', 'pl', 'tr'];

console.log('Starting translations generation...');
locales.forEach(locale => {
  console.log(`Generating translations for ${locale}...`);
  execSync(`npm run write-translations -- --locale ${locale}`, { stdio: 'inherit' });
});
console.log('Translations generated successfully for all languages'); 