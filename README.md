# Proyecto integrador Full Stack

Aplicación full stack de tareas con autenticación y un chat con IA que responde preguntas sobre tus tareas (RAG básico).

## Stack

- **Frontend:** Next.js (App Router), React, TypeScript, Tailwind CSS
- **Backend:** Node.js, Express, TypeScript
- **Base de datos:** PostgreSQL (Neon) con Prisma
- **Autenticación:** JWT en cookie HttpOnly, contraseñas con bcrypt
- **IA:** API de Anthropic (Claude Haiku)
- **Infraestructura:** Docker y Docker Compose

## Estructura

```
.
├── backend/              API con Express + Prisma
├── nextjs/               Frontend con Next.js
└── docker-compose.yml    Levanta backend y frontend juntos
```

## Requisitos

- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- Una base de datos PostgreSQL (por ejemplo, un proyecto gratuito en [Neon](https://neon.tech))
- Una API key de Anthropic (solo para el chat), desde [console.anthropic.com](https://console.anthropic.com)

## Puesta en marcha

1. Copia las variables de entorno del backend y rellena tus valores:

   ```
   cp backend/.env.example backend/.env
   ```

   En Windows (PowerShell): `Copy-Item backend\.env.example backend\.env`

   | Variable            | Para qué sirve                                   |
   | ------------------- | ------------------------------------------------ |
   | `DATABASE_URL`      | Cadena de conexión a PostgreSQL                  |
   | `JWT_SECRET`        | Secreto con el que se firman los tokens          |
   | `ANTHROPIC_API_KEY` | API key de Anthropic, usada por el endpoint /chat |

2. Levanta todo con un solo comando:

   ```
   docker compose up --build
   ```

3. Abre la aplicación:

   - Frontend: http://localhost:3001
   - Backend: http://localhost:3000

4. Para parar los contenedores:

   ```
   docker compose down
   ```

## Cómo funciona con Docker

- Cada servicio (`backend` y `frontend`) tiene su propio `Dockerfile` y su `.dockerignore`.
- Compose los conecta en una red interna. Desde el contenedor del frontend, el backend es accesible como `http://backend:3000`; el frontend lo recibe en la variable de entorno `API_URL`.
- Los `fetch` que ejecuta el navegador (login, crear tareas, chat) usan `http://localhost:3000`, porque el backend publica ese puerto en tu máquina.
- El archivo `.env` nunca entra en la imagen: se inyecta al arrancar el contenedor con `env_file`.

## Endpoints del backend

| Método | Ruta            | Protegida | Descripción                              |
| ------ | --------------- | --------- | ---------------------------------------- |
| POST   | `/registro`     | No        | Crea un usuario                          |
| POST   | `/login`        | No        | Inicia sesión y guarda el token en cookie |
| GET    | `/tareas`       | Sí        | Lista las tareas del usuario logueado    |
| POST   | `/tareas`       | Sí        | Crea una tarea para el usuario logueado  |
| PUT    | `/tareas/:id`   | Sí        | Actualiza una tarea                      |
| DELETE | `/tareas/:id`   | Sí        | Elimina una tarea                        |
| POST   | `/chat`         | Sí        | Pregunta a la IA sobre tus propias tareas (RAG) |
| GET    | `/usuarios`     | Sí        | Lista los usuarios (sin contraseñas)     |

## Desarrollo sin Docker

Cada carpeta se puede arrancar por separado (con las dependencias instaladas y el `.env` del backend configurado):

```
# backend (puerto 3000)
cd backend
npm install
npx prisma generate
npm run dev

# frontend (puerto 3001)
cd nextjs
npm install
npm run dev
```

## Modelo de datos

Cada tarea pertenece a un usuario (`Tarea.usuarioId`, relación con `Usuario`). `/tareas` y `/chat` filtran siempre por el usuario del token: nadie puede ver ni preguntar por las tareas de otra persona.
