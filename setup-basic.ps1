# Создаем базовую структуру для переводов
$languages = @("ru", "uk", "sl", "de", "es", "it", "pl", "tr")

foreach ($lang in $languages) {
    # Создаем путь для документации
    $docsPath = "i18n\$lang\docusaurus-plugin-content-docs\current"
    
    # Проверяем существование директории docs
    if (Test-Path "docs") {
        # Копируем все файлы из docs в соответствующую языковую директорию
        Copy-Item "docs\*" -Destination $docsPath -Recurse -Force
        
        # Создаем файл с переводом, если его еще нет
        if (Test-Path "docs\intro.md") {
            $content = @"
---
sidebar_position: 1
---

# Welcome to $lang Documentation

This is the translated version of the documentation.

[Translate this page into $lang]
"@
            Set-Content -Path "$docsPath\intro.md" -Value $content -Encoding UTF8
        }
    }
}

Write-Host "Translation structure created successfully!" -ForegroundColor Green