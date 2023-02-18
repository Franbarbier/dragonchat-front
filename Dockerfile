# Utilizamos la imagen de Node.js 16 en Alpine Linux como base para la imagen de producción
FROM node:16-alpine

# Establecemos el directorio de trabajo
WORKDIR /app

# Copiamos el archivo package.json y package-lock.json
COPY package*.json ./

# Instalamos las dependencias necesarias para la aplicación
RUN npm ci --only=production

# Copiamos la aplicación
COPY . .

# Establecemos las variables de entorno necesarias para la aplicación en producción
ENV NODE_ENV=production

# Generamos los archivos necesarios para la aplicación
RUN npm run build

# Iniciamos la aplicación
CMD ["npm", "start"]
