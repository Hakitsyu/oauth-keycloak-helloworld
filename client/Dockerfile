FROM node:22.11.0-alpine As builder

WORKDIR /usr/src/app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build --prod

FROM nginx:1.15.8-alpine

COPY --from=builder /usr/src/app/dist/oauth-keycloak-helloworld-client/browser /usr/share/nginx/html

COPY config.json /usr/share/nginx/html/assets/config.json

COPY nginx.conf /etc/nginx/conf.d/default.conf
