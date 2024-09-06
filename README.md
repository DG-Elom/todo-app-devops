# Application Web de Gestion de Tâches - Projet DevOps

Ce projet démontre la mise en place d'une application de gestion de tâches en utilisant des pratiques DevOps.

## Partie 1 : Gestion du dépôt Git

1. Création du dépôt :

```bash
git clone https://github.com/votre-nom-utilisateur/todo-app-devops.git
cd todo-app-devops
```

2. Initialisation du projet et premier commit :

```bash
mkdir -p backend/src frontend/src
touch backend/src/index.js frontend/src/App.js
touch backend/package.json frontend/package.json
git add .
git commit -m "Initial commit: Set up project structure for todo app"
```

3. Ajout du .gitignore :

```bash
echo "node_modules/
*.log
.env
build/
dist/" > .gitignore
git add .gitignore
git commit -m "Add .gitignore file"
```

4. Push vers GitHub :

```bash
git push origin main
```

## Partie 2 : Création du Dockerfile

1. Dockerfile pour le backend (backend/Dockerfile) :

```dockerfile
FROM node:14
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["node", "src/index.js"]
```

2. Dockerfile pour le frontend (frontend/Dockerfile) :

```dockerfile
FROM node:14
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

3. Création du fichier docker-compose.yml :

```yaml	
services:
  backend:
    build: ./backend 
    image: dgelom/todo-backend-image:latest 
    env_file: 
      - .env-docker
    ports:
      - 3000:3000 

  frontend:
    build: ./frontend 
    image: dgelom/todo-frontend-image:latest
    ports:
      - 3001:3000 
    depends_on: 
      - backend
```

4. Construction et lancement des conteneurs :

```bash
docker-compose build
docker-compose up
```

## Comment utiliser ce projet

* Clonez le dépôt
* Assurez-vous d'avoir Docker et docker-compose installés
* Exécutez docker-compose up à la racine du projet
* Accédez à l'application via http://localhost:3001