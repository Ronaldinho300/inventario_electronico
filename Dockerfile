# ── Etapa base ────────────────────────────────────────────
FROM node:20-alpine

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar dependencias primero (mejor uso de caché)
COPY package*.json ./

# Instalar dependencias de producción
RUN npm install --omit=dev

# Copiar el resto del código
COPY . .

# Puerto que expone la app
EXPOSE 3000

# Comando de inicio
CMD ["node", "app.js"]