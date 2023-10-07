# Templiteer
___

Backend для сервиса хранения сниппетов кода.

# Requirements:
___

[Node.js 18.14](https://nodejs.org/en/download)

[Yarn](https://yarnpkg.com/)

[Docker & Docker-compose](https://www.docker.com/)

# TL;DR
___

Старт приложения для разработки
```
cp .env.example .env

docker-compose --file docker-compose.dev.yml up 

yarn

yarn build && yarn start:prod 
(или)
yarn start:dev
```

Запуск тестов
```
yarn test (юниты)
yarn test:e2e (интеграционные)
```
# Commands
___

Команды для запуска описаны в package.json. Команды вызываются через `yarn ${command}`

+ `build`: собрать приложение, результат в `/dist`
+ `start:dev`: запустить в дев-режиме
+ `start:debug`: запустить в дев-режиме с дебаггером
+ `start:prod`: запустить собранное приложение. Обычно употребляется вместе с `build`
+ `lint`: запустить линтер
+ `lint:fix`: запустить линтер с исправлением ошибок 
+ `migration:run`: запустить миграции. [Подробнее о миграциях](https://orkhan.gitbook.io/typeorm/docs/migrations)
+ `migration:revert`: откатить последнюю миграцию
+ `migration:generate`: автоматически генерирует новую миграцию из разницы схем
+ `migration:create`: создает новую пустую миграцию
+ `test`: запуск юнит-тестов
+ `test:watch`: запуск юнит-тестов с вотчером
+ `test:cov`: запуск юнит-тестов с подсчетом покрытия
+ `test:debug`: запуск юнит-тестов с дебаггером
+ `test:e2e`: запуск интеграционных тестов
+ `test:e2e:debugger`: запуск интеграционных тестов с дебаггером

# Config
___

ПО конфигурируется с помощью `env-файлов`. 

Пример файла лежит в `.env.example`.

Templiteer при старте подгружает переменные из `.env` файла, тесты подгружают `.env-test`
