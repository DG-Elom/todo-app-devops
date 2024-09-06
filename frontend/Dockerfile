# Étape de construction (nommée 'build')
FROM node:14 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Étape de production (utilisez une image plus légère comme base)
FROM nginx:alpine 
COPY --from=build /app/build /usr/share/nginx/html 
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]