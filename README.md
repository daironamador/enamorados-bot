# 💘 Emparejados - Bot de Discord para el amor

**Emparejados** (también llamado *Cupido*) es un bot de Discord hecho con [discord.js](https://discord.js.org/) y [Firebase Firestore](https://firebase.google.com/products/firestore) que permite emparejar usuarios, subir su nivel de amor y ¡casarse! 💍

Ideal para servidores sociales, de rol, comunidades de amigos o simplemente para divertirse.

---

## 🚀 Funcionalidades

- 💌 Proponer y aceptar pareja
- 💞 Subir el amor con `!daramor` (cooldown de 6h)
- 📈 Ver estado de la relación con barra de progreso
- 💍 Casarse al alcanzar el máximo nivel
- 🔒 Base de datos segura en Firebase

---

## 📦 Requisitos

- Node.js 18+
- Cuenta y servidor de Discord
- Proyecto en Firebase con credenciales de servicio

---

## 🔧 Instalación

1. **Clona el repositorio:**

```bash
git clone https://github.com/tu-usuario/emparejados-bot.git
cd emparejados-bot
```

2. **Instala dependencias:**

```bash
npm install
```

3. **Crea el archivo `.env`:**

```env
DISCORD_TOKEN=tu_token_de_discord
CLIENT_ID=tu_client_id
```

4. **Configura Firebase:**

- Crea un proyecto en [Firebase Console](https://console.firebase.google.com/)
- Activa Firestore en modo producción
- Genera una clave de servicio y colócala como `src/firebase/firebase-key.json`

---

## 🧠 Estructura

```
emparejados-bot/
│
├─ src/
│  ├─ commands/           # Slash commands
│  ├─ firebase/           # Configuración de Firestore
│  └─ index.js            # Main bot file
├─ .env
├─ package.json
├─ README.md
```

---

## ✅ Comandos disponibles

| Comando      | Descripción                                  |
|--------------|----------------------------------------------|
| `/proponer`  | Envía una propuesta de amor a otro usuario   |
| `/aceptar`   | Acepta una propuesta pendiente               |
| `/daramor`   | Sube el nivel de amor con tu pareja          |
| `/pareja`    | Muestra el estado actual de la relación      |
| `/casarse`   | Cásate al llegar al máximo nivel de amor     |

---

## 📊 Niveles de amor

| Nivel | Estado           | Emoji |
|-------|------------------|-------|
| 0     | Conociéndose     | 💛    |
| 1     | Enamorados       | 💚    |
| 2     | Súper novios     | ❤️    |
| 3     | Casados          | 💍    |

---

## 📡 Despliegue

Puedes subir el bot a cualquier servidor Node.js o usar servicios como:
- [Railway](https://railway.app/)
- [Render](https://render.com/)
- [VPS personal o Heroku (limitado)](https://heroku.com/)

---

## ❤️ Autor

Creado por **Dairon Amador**  
Web: [daironamador.com](https://daironamador.com)

---

## 📝 Licencia

MIT © 2025 - Puedes modificar y usar libremente el proyecto.