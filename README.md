# Ticket Master (Expo + React Native)

A modern mobile job portal application built with **Expo (Prebuild / Dev Client)**. This app allows users to browse jobs, apply, and manage their profiles with a smooth and scalable architecture.

---

## 📥 Download & Demo

- 📦 **APK Download:** [LINK]
- 🎥 **Video Demonstartion:** [LINK]

---

## 🚀 Tech Stack

- **React Native (Expo Prebuild)**
- **Expo Dev Client**
- **Redux Toolkit + RTK Query**
- **TypeScript**
- **MMKV Storage (Caching)**
- **Environment-based configuration**
- **Nativewind**

---

## 📁 Project Setup Guide

Follow these steps to get the project running locally.

---

## 1️⃣ Clone the Repository

```bash
git clone <your-repo-url>
cd <your-project-folder>
```

---

## 2️⃣ Install Dependencies

```bash
npm install
# or
yarn install
```

---

## 3️⃣ Environment Variables Setup

Create a `.env.local` file in the root of your project:

```env
EXPO_PUBLIC_BASE_API=https://your-api-url.com
EXPO_PUBLIC_API_KEY=your-image-api-key
```

### ⚠️ Important Notes:

- Always prefix Expo environment variables with `EXPO_PUBLIC_`
- Never commit `.env.local` to version control
- Ensure values match your backend configuration

---

## 4️⃣ Prebuild the Project

Since this project uses **Expo Prebuild**, you must generate native code:

```bash
npx expo prebuild
```

### This will:

- Generate `android/` and `ios/` folders
- Apply config plugins
- Sync native dependencies

---

## 5️⃣ Run on Android

Make sure you have:

- Android Studio installed
- Emulator running OR physical device connected

```bash
npx expo run:android
```

---

## 6️⃣ Run on iOS (Mac Only)

```bash
npx expo run:ios
```

---

## 🔄 Common Workflow

Whenever you:

- Install a new native dependency
- Change `app.json` / `app.config.js`
- Modify config plugins

👉 Run:

```bash
npx expo prebuild
```

---

## 🧪 Clearing Cache (Recommended if issues occur)

```bash
npx expo start -c
```

---

## 🔐 Environment Switching (Optional)

If using multiple environments:

```bash
.env.local
.env.development
.env.production
```

## 📦 Build APK / AAB (EAS)

Login to Expo:

```bash
npx expo login
```

Configure EAS:

```bash
npx eas build:configure
```

Build Android:

```bash
npx eas build --platform android
```

## \

## ⚙️ Key Features

- 🔍 Browse events from all over the world and see their details
- 📄 Get event location and link to buy ticket
- ⚡ Optimized API fetching with RTK Query
- 💾 Persist favourite events using MMKV

---

## 🛠 App Preview

![Splash Screen](./assets/screenshots/ss-1.png)
![Home/Event List Screen](./assets/screenshots/ss-2.png)
![Home/Event List Screen (Dark Mode)](./assets/screenshots/ss-3.png)
![Favourites Screen](./assets/screenshots/ss-4.png)
![Event Searching By City](./assets/screenshots/ss-5.png)
![Event Details Screen](./assets/screenshots/ss-6.png)

---

## 👨‍💻 Author

**Mehedi Hasan**

---

Thank you! If you face any issues during setup, feel free to reach out or open an issue 🚀
