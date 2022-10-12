![](https://github.com/sky-distribution/beesafe-theme/tree/master/src/images/logo.jpg)

# dl-theme

## Konfiguracja

Kopiujemy `.env-example` do `.env `

```bash
$ cp .env-example .env
```

Wchodzimy do `.env` i wprowadzamy sciezke do szablonu WP, pamietajac, by na koncu znajdowala sie nazwa naszego nowego szablonu

```ini
DEST_PATH=/Applications/MAMP/htdocs/beesafe-blog/wp-content/themes/beesafe-theme
```

## Instalacja projektu
```bash
$ npm install -g yarn
$ yarn install
```

### Problem z instalacją na macOS
Jeśli instalacja `node-sass` na macOS nie powiodła się, wtedy dodajesz:
```bash
$ yarn add node-sass
```