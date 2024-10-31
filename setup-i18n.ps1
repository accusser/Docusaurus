# Создаем основную директорию i18n, если её нет
New-Item -ItemType Directory -Force -Path "i18n"

# Массив с кодами языков
$languages = @("ru", "uk", "sl", "de", "es", "it", "pl", "tr")

# Создаем структуру для каждого языка
foreach ($lang in $languages) {
    # Создаем основные директории для каждого языка
    New-Item -ItemType Directory -Force -Path "i18n\$lang\docusaurus-plugin-content-docs\current"
    
    # Создаем базовый code.json для каждого языка
    $jsonContent = @'
{
    "theme.NotFound.title": {
        "message": "Page Not Found",
        "description": "The title of the 404 page"
    },
    "theme.NavBar.navAriaLabel": {
        "message": "Main",
        "description": "The ARIA label for the main navigation"
    },
    "theme.navbar.documentation": {
        "message": "Documentation",
        "description": "Navbar item with label Documentation"
    },
    "theme.footer.link.documentation": {
        "message": "Documentation",
        "description": "The label of footer link with label=Documentation"
    }
}
'@
    
    $jsonContent | Out-File -FilePath "i18n\$lang\code.json" -Encoding UTF8

    # Копируем оригинальные markdown файлы для перевода, если есть директория docs
    if (Test-Path "docs") {
        Copy-Item "docs\*" -Destination "i18n\$lang\docusaurus-plugin-content-docs\current\" -Recurse -Force
    }
}

# Создаем write-translations.js
$writeTranslationsContent = @'
const fs = require("fs");
const path = require("path");

const languages = ["ru", "uk", "sl", "de", "es", "it", "pl", "tr"];

// Создаем базовую структуру для каждого языка
languages.forEach((lang) => {
  const dirPath = path.join(__dirname, "i18n", lang);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
});

// Запускаем команду для извлечения переводов
require("@docusaurus/core").write({
  locale: languages,
});
'@

$writeTranslationsContent | Out-File -FilePath "write-translations.js" -Encoding UTF8

# Обновляем package.json
if (Test-Path "package.json") {
    $packageJson = Get-Content "package.json" -Raw | ConvertFrom-Json
    
    if (-not $packageJson.scripts) {
        $packageJson | Add-Member -Type NoteProperty -Name "scripts" -Value @{}
    }
    
    $packageJson.scripts | Add-Member -Type NoteProperty -Name "write-translations" -Value "node write-translations.js" -Force
    foreach ($lang in $languages) {
        $packageJson.scripts | Add-Member -Type NoteProperty -Name "write-translations:$lang" -Value "docusaurus write-translations --locale $lang" -Force
    }
    
    $packageJson | ConvertTo-Json -Depth 10 | Out-File "package.json" -Encoding UTF8
}

Write-Host "Структура i18n создана успешно!" -ForegroundColor Green
Write-Host "Теперь вы можете:" -ForegroundColor Yellow
Write-Host "1. Запустить 'npm run write-translations' для генерации всех файлов переводов" -ForegroundColor Yellow
Write-Host "2. Запустить 'npm run write-translations:ru' (или другой язык) для конкретного языка" -ForegroundColor Yellow
Write-Host "3. Перевести содержимое в i18n/[язык]/docusaurus-plugin-content-docs/current/" -ForegroundColor Yellow