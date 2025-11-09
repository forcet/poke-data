# 🧩 POKE-DATA

**POKE-DATA** es un servicio backend desarrollado en **Node.js (TypeScript)** que se conecta a una base de datos **MongoDB** para registrar y consultar información sobre Pokémon, sus tipos, habilidades y debilidades.  

Cuenta con un flujo **CI/CD automatizado en GitHub Actions** que construye la imagen Docker, la publica en Docker Hub y despliega la aplicación en un clúster de **OpenShift** usando Helm.

---

## 📁 Estructura del Proyecto

```
POKE-DATA/
├── .github/workflows/
│   └── docker-image-poke-data.yml     # Workflow de CI/CD
├── helm/                              # Configuración Helm (values.yml)
├── src/
│   ├── config/
│   │   └── Database.ts                # Configuración de conexión a MongoDB
│   ├── model/                         # Modelos Mongoose
│   │   ├── Ability.ts
│   │   ├── Pokemon.ts
│   │   ├── Species.ts
│   │   ├── Types.ts
│   │   └── Weakness.ts
│   ├── routes/                        # Endpoints REST
│   │   ├── HealthRoute.ts
│   │   ├── PokemonRoute.ts
│   │   ├── ReadinessRoute.ts
│   │   └── StartupRoute.ts
│   ├── init.ts
│   └── server.ts                      # Punto de entrada del servidor
├── Dockerfile
├── package.json
├── tsconfig.json
├── .env                               # Variables de entorno locales
└── README.md
```

---

## ⚙️ Tecnologías

- **Node.js + TypeScript**
- **Express.js**
- **Mongoose (MongoDB ODM)**
- **Docker**
- **Helm / OpenShift**
- **GitHub Actions**

---

## 🚀 Ejecución local

### 1️⃣ Requisitos

- Node.js 18+
- MongoDB local o remoto
- Docker (opcional)
- Archivo `.env` con tus credenciales de base de datos

Ejemplo de `.env`:
```bash
MONGO_URI=mongodb://usuario:contraseña@localhost:27017/poke-data
PORT=3000
```

---

### 2️⃣ Instalación

```bash
npm install
```

### 3️⃣ Compilación TypeScript

```bash
npm run build
```

### 4️⃣ Ejecución

Modo producción:
```bash
npm start
```

Servidor disponible en:  
👉 `http://localhost:3000`

---

## 🐳 Construcción con Docker

```bash
docker build -t poke-data .
docker run -d -p 3000:3000 --env-file .env poke-data
```

---

## 🧾 Licencia

Este proyecto se distribuye bajo la licencia **MIT**.