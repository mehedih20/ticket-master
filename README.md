# BHC Jobs (Expo + React Native)

A modern mobile job portal application built with **Expo (Prebuild / Dev Client)**. This app allows users to browse jobs, apply, and manage their profiles with a smooth and scalable architecture.

---

## 📥 Download & Demo

- 📦 **APK Download:** [LINK](https://drive.google.com/file/d/1_t73-Q03Tpq63RcSHlm2P57RfXb08F6p/view?usp=sharing)
- 🎥 **Video Demonstartion:** [LINK](https://drive.google.com/file/d/1sRyQNK_BrnpPhMDGv4qQkX1bLT0s7COl/view?usp=sharing)

---

## 🚀 Tech Stack

- **React Native (Expo Prebuild)**
- **Expo Dev Client**
- **Redux Toolkit + RTK Query**
- **TypeScript**
- **AsyncStorage (Caching)**
- **Environment-based configuration**
- **React Native Google Signin**
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
EXPO_PUBLIC_IMAGE_API=your-image-api-url
EXPO_PUBLIC_GOOGLE_CLIENT_ID=your-google-web-client-id
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

---

## ⚙️ Key Features

- 🔍 Job browsing
- 👤 User authentication
- 📄 Apply to jobs
- ⚡ Optimized API fetching with RTK Query
- 💾 Persistent auth using Redux Persist

---

## 🛠 Troubleshooting

### ❌ Metro bundler issues

```bash
npx expo start -c
```

### ❌ Android build issues

```bash
cd android
./gradlew clean
cd ..
```

### ❌ Dependency mismatch

```bash
rm -rf node_modules
npm install
```

---

## 📌 Notes

- This project uses **Expo Dev Client**, not Expo Go
- Native changes require rebuilding the app
- Ensure backend API is running and accessible

---

## 👨‍💻 Author

**Mehedi Hasan**

---

If you face any issues during setup, feel free to reach out or open an issue 🚀
