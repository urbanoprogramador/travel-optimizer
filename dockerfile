# Usa una imagen de Node.js como base
FROM node:16

# Establece el directorio de trabajo en /app
WORKDIR /app

# Copia los archivos package.json y package-lock.json al directorio de trabajo
COPY package*.json ./

# Instala las dependencias del proyecto
RUN npm install

# Copia el resto del código de la aplicación al directorio de trabajo
COPY . .

# Compila la aplicación
RUN npm run build

# Expone el puerto 3000
EXPOSE 3000

# Define el comando para iniciar la aplicación
CMD ["node", "dist/main"]
