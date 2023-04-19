# GULP Devstack

Základní devstack s použitím preprocessoru SASS a GULP task runneru.

### Gulp řeší automatizaci úkolů jako jsou:

* převedení SASS souborů do CSS
* spojování CSS do jednoho souboru
* promazání nepoužitých CSS stylů
* přidání prefixů na základě definování podporovaných prohlížečů pomocí Browserlistu
* minifikaci CSS a JS souborů
* optimalizaci obrázků
* spuštění projektu v prohlížeči na localhostu
* sledování změn v souborech SASS a JS a reloading v prohlížeči


## Gulp - instalace

* ověřit jestli je počítači nainstalovaný Node.js a NPM pomocí příkazů `node -v` a `npm -v`, případně upgradovat
* pokud není nainstalovaný Node.js, tak stáhnout a nainstalovat - https://nodejs.org/en/ (nutný restart počítače po první instalaci)
* spustit konzoli a najít cestu k projektu
* zadat `npm install -g gulp-cli`
* zadat `npm install`
* vytvoří se adresář "node_modules" který neverzovat do Gitu a nezasahovat do něj
* v souboru `package.json` v "devDependencies" jsou vypsané NPM balíčky, které je potřeba případně nainstalovat
* po instalaci otestovat nastavení Gulpu příkazem `gulp`

### Gulp - použití

V souboru Gulpu `gulpfile.js` jsou nastaveny dva módy
* Vývojový - obsahuje jen úkoly pro převedení SASS do CSS a spuštění v prohlížeči
spouští se příkazem `gulp`

* Produkční - obsahuje i další úkoly pro minifikaci CSS, JS souborů a obrázků
spouští se příkazem `gulp prod`
