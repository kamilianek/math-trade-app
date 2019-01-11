FROM tiangolo/node-frontend:10 as build-stage
WORKDIR /math-trade-frontend
COPY package*.json /math-trade-frontend/
RUN npm install
COPY ./ /math-trade-frontend/
RUN npm run build

FROM nginx:1.15
COPY --from=build-stage /math-trade-frontend/build/ /usr/share/nginx/html
COPY --from=build-stage /nginx.conf /etc/nginx/conf.d/default.conf
