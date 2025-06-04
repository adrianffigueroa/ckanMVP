# Usa una imagen oficial de Node para construir la app
FROM node:18 AS build

# Crea y entra al directorio de la app
WORKDIR /app

# Copia package.json y package-lock.json
COPY package*.json ./

# Instala dependencias
RUN npm install

# Copia el resto del código fuente
COPY . .

# Compila la app para producción
RUN npm run build

# Usa una imagen de Nginx para servir la app compilada
FROM nginx:alpine

# Copia el build de React a la carpeta pública de Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Expone el puerto 80
EXPOSE 80

# Comando por defecto (levanta Nginx)
CMD ["nginx", "-g", "daemon off;"]
