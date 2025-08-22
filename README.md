# Teste Técnico – Sistema de Gestão de Equipamentos e Reservas

Este projeto é uma solução para o teste técnico proposto, com o objetivo de desenvolver uma API REST para gerenciar o uso de equipamentos por funcionários de uma empresa. A aplicação permite cadastrar e gerenciar **equipamentos**, **funcionários** e **reservas**, seguindo regras específicas de negócio para garantir o uso adequado dos recursos.

## Funcionalidades Implementadas

- **Cadastro de Equipamentos**  
  - Criar, atualizar, excluir e listar equipamentos  
  - Filtro por categoria e status (disponível, em manutenção, emprestado)

- **Cadastro de Funcionários**  
  - Criar, atualizar, excluir e listar funcionários  
  - Filtro por nome

- **Reserva e Uso de Equipamentos**  
  - Registrar reservas com data de início  
  - Finalizar uso com data de término  
  - Listar registros de uso, exibindo dados do funcionário e equipamento

## Regras de Negócio

- Um equipamento só pode estar reservado por **um funcionário por vez**
- Um funcionário **não pode reservar múltiplos equipamentos simultaneamente**

---

## 📑 Sumário

- [Funcionalidades Implementadas](#funcionalidades-implementadas)
- [Regras de Negócio](#regras-de-negócio)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Arquitetura](#Arquitetura)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Como Executar o Projeto](#como-executar-o-projeto)
- [Alternativa: Rodar via Docker](#alternativa-rodar-via-docker)
- [Documentação da API](#documentação-da-api)
- [Testes](#testes)


## 📂 Estrutura do Projeto

```plaintext

├── prisma/                          # Configurações do Prisma ORM (schemas e migrations)
├── src/                             # Código-fonte da aplicação
│   ├── app.module.ts                # Módulo raiz da aplicação
│   ├── main.ts                      # Arquivo de inicialização da aplicação
│   ├── Enums/                       # Enums utilizados globalmente (status, categorias, etc.)
│   ├── utils/                       # Funções utilitárias reutilizáveis
│   ├── Domain/                      # Camada de domínio da aplicação (DDD)
│   │   ├── Dtos/                    # Data Transfer Objects (validação e transporte de dados)
│   │   │   └── exampleDto.ts
│   │   ├── Mapper/                  # Conversão entre entidades e DTOs
│   │   │   └── exampleMapper.ts
│   │   ├── Repositories/            # Interfaces e implementações de repositórios
│   │   │   ├── prisma/              # Implementações usando Prisma ORM
│   │   │   │   └── prismaExampleRepository.ts
│   │   │   └── exampleRepository.ts
│   │   ├── Service/                 # Lógica de negócio e testes unitários
│   │   │   ├── example.service.ts
│   │   │   └── example.service.spec.ts
├── .gitignore                       # Arquivos/pastas a serem ignorados pelo Git
├── .prettierrc                      # Configurações do Prettier (formatação de código)
├── eslint.config.mjs                # Configurações do ESLint (padronização de código)
├── nest-cli.json                    # Configurações do Nest CLI
├── package.json                     # Dependências e scripts npm do projeto
├── package-lock.json                # Lockfile das dependências
├── tsconfig.json                    # Configurações principais do TypeScript
└── tsconfig.build.json              # Configurações de build para produção
```

---

## 🏗 Arquitetura

A aplicação segue a **arquitetura modular do NestJS** com conceitos de **DDD** para organizar o domínio do negócio e também princípios da **Clean Architecture**, garantindo inversão de dependências e isolamento da lógica de negócio das implementações externas,

### Estrutura de cada módulo (ex: \`Employee\`, \`Equipment\`, \`Reservation\`):

- **Controller** → Define as rotas e lida com as requisições HTTP.
- **DTOs** → Validação e formatação de entrada/saída de dados.
- **Mapper** → Conversão entre entidades (banco) e DTOs.
- **Repository** → Interfaces e implementações de acesso ao banco via Prisma.
- **Service** → Contém a lógica de negócio e testes unitários.
- **Module** → Configura a injeção de dependências do módulo.

### Diretórios comuns:

- **Database** → Configurações do Prisma ORM.
- **Utils** → Funções reutilizáveis.
- **Enums** → Constantes de status e categorias de produtos.

---

## 🛠 Tecnologias Utilizadas

- **NestJS** → Framework para aplicações Node.js.
- **TypeScript** → Superset do JavaScript com tipagem estática.
- **Prisma** → ORM para Node.js e TypeScript.
- **PostgreSQL** → Banco de dados relacional.
- **ESLint** → Padronização e análise de código.
- **Prettier** → Formatador de código.

---

## ▶️ Como Executar o Projeto

### Pré-requisitos

- Node.js (versão LTS recomendada)
- npm, yarn ou pnpm
- Banco de dados PostgreSQL configurado
- Docker (opcional, caso queira rodar via container)

### Passos para rodar localmente (considerando que o banco de dados já está configurado)
### 1. Clone o repositório:
```bash
git clone https://github.com/AlmostZF/Teste-Tecnico-Tellus.git
cd Teste-Tecnico-Tellus
```

### 2. Copie o arquivo de variáveis de ambiente de exemplo:
```bash
cp .env.example .env
```
### 3. Instale as dependências:
```bash
npm install
```

### 4. Configure o banco de dados no arquivo \.env \:
```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/nome_banco?schema=public"
PORT=3000
```

### 5. Execute as migrações do Prisma:
```bash
npx prisma migrate dev
```

### 6. Inicie o servidor:
```bash
npm run start
# ou
npm run start:dev
```

### Acesse a API no navegador:
```
http://localhost:3000/api
```

> (ou na porta definida no \`.env\`).

---

## ⚡ Alternativa: Rodar via Docker
### 1. Buildar as imagens:
```bash
docker compose build
```

### 2. Subir os containers:
```bash
docker compose up -d
```

### 3. O Docker já aplica as migrations automaticamente e inicia o NestJS.
### Acesse a API no navegador:
```
http://localhost:3000/api
```

> Assim você não precisa instalar Node.js ou PostgreSQL localmente — o Docker cuida de tudo.


## 📖 Documentação da API

A API está documentada com **Swagger**.  
Após iniciar o servidor, acesse:

👉 **[http://localhost:3000/api](http://localhost:3000/api)**

Lá você poderá visualizar e testar todos os endpoints diretamente pelo navegador.


## 🧪 Testes

Para rodar os testes unitários:

```bash
npm run test
```

ou caso queira rodar os testes pearamadente 
```bash
npm run test -- reservation.service.spec.ts
npm run test -- employee.service.spec.ts
npm run test -- equipment.service.spec.ts
```
