#!/bin/sh
npm pkg set scripts.prepare="husky install"
npm run prepare
npx husky add .husky/pre-commit "yarn lint:fix"
git add .husky/pre-commit
