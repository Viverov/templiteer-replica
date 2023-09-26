# --- Installing stage
FROM node:18.14 as installer

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json yarn.lock nest-cli.json ./

RUN yarn install
RUN yarn global add @nestjs/cli

# ---

# Installing prod node_modules
FROM installer AS prod_installer
## Workdir is shared between the stage so let's reuse it as we neeed the packages
WORKDIR /usr/src/app_prod

COPY package.json yarn.lock nest-cli.json ./

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

RUN yarn install --prod

# ---

# Building stage
FROM installer AS builder

## Workdir is shared between the stage so let's reuse it as we neeed the packages
WORKDIR /usr/src/app

COPY src ./src/
COPY libs ./libs/
COPY ./tsconfig.json ./tsconfig.build.json ./.eslintrc.js ./nest-cli.json ./

RUN yarn build

RUN ls -1a /usr/src/app

# ---

FROM node:18.14-slim

WORKDIR /app

COPY --from=builder --chown=node:node /usr/src/app/dist build
COPY --from=prod_installer --chown=node:node /usr/src/app_prod/node_modules node_modules

EXPOSE 3000
