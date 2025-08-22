# Etapa 1 - Build
FROM node:18 AS build
WORKDIR /usr/src/app

# Copiar arquivos de dependência e instalar
COPY package*.json ./
RUN npm install

# Copiar código e gerar Prisma
COPY . .
RUN npx prisma generate

# Build da aplicação
RUN npm run build

# Etapa 2 - Runtime
FROM node:18
WORKDIR /usr/src/app

# Copiar tudo do build
COPY --from=build /usr/src/app ./

# Expor porta
EXPOSE 3000

# Rodar migrations e iniciar NestJS
CMD ["sh", "-c", "npx prisma migrate deploy && npm run start:prod"]
