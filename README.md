<div align="center">

# 🎟️ Ticket Master

A modern mobile event discovery application built with **Expo + React Native**.  
Browse worldwide events, search by city, view details, and save favourites with a fast and smooth experience.

![Platform](https://img.shields.io/badge/Platform-Android-green)
![Expo](https://img.shields.io/badge/Expo-Prebuild-black)
![React Native](https://img.shields.io/badge/React%20Native-Mobile-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue)

</div>

---

## 📥 Download & Demo

- 📦 **APK Download:** [LINK](https://drive.google.com/file/d/1GqA_2zOqXgKh4wSBSHSUbO8FFIz-HZ4y/view?usp=sharing)
- 🎥 **Video Demonstration:** [LINK](https://drive.google.com/file/d/1xGjqF6V272do2ZeYZZw8Tv9uGCHTaquo/view?usp=sharing)

---

## ✨ Features

- 🌍 Browse live events from around the world
- 🔍 Search events by city
- 📄 View full event details
- 🎟️ Direct ticket purchase links
- ❤️ Save favourite events
- ⚡ Fast API caching with RTK Query
- 🌙 Dark mode support
- 📱 Smooth mobile-first UI

---

## 🛠 Tech Stack

- **React Native**
- **Expo Prebuild**
- **Expo Dev Client**
- **TypeScript**
- **Redux Toolkit**
- **RTK Query**
- **MMKV Storage**
- **Nativewind**

---

## 📱 App Preview

<table>
<tr>
<td align="center">
<img src="./assets/screenshots/ss-1.png" width="180"/><br/>
<sub><b>Splash Screen</b></sub>
</td>

<td align="center">
<img src="./assets/screenshots/ss-2.png" width="180"/><br/>
<sub><b>Home Screen</b></sub>
</td>

<td align="center">
<img src="./assets/screenshots/ss-3.png" width="180"/><br/>
<sub><b>Dark Mode</b></sub>
</td>
</tr>

<tr>
<td align="center">
<img src="./assets/screenshots/ss-4.png" width="180"/><br/>
<sub><b>Favourites</b></sub>
</td>

<td align="center">
<img src="./assets/screenshots/ss-5.png" width="180"/><br/>
<sub><b>Search by City/Text</b></sub>
</td>

<td align="center">
<img src="./assets/screenshots/ss-6.png" width="180"/><br/>
<sub><b>Event Details</b></sub>
</td>
</tr>
</table>

---

## 🚀 Getting Started

## 1️⃣ Clone Repository

```bash
git clone https://github.com/mehedih20/ticket-master.git
cd ticket-master
```

## 2️⃣ Install Dependencies

```bash
npm install
```

## 3️⃣ Setup Environment Variables

Create `.env.local`

```env
EXPO_PUBLIC_BASE_API=https://your-api-url.com
EXPO_PUBLIC_API_KEY=your-api-key
```

## 4️⃣ Generate Native Folders

```bash
npx expo prebuild
```

## 5️⃣ Run Android

```bash
npx expo run:android
```

## 6️⃣ Run iOS (Mac)

```bash
npx expo run:ios
```

---

## 📦 Build APK / AAB

```bash
npx expo login
npx eas build:configure
npx eas build --platform android
```

---

## 🔄 Common Commands

### Clear Cache

```bash
npx expo start -c
```

### Rebuild Native Code

```bash
npx expo prebuild
```

---

## 👨‍💻 Author

**Mehedi Hasan**

---

<div align="center">

Made with ❤️ using React Native + Expo

</div>
```
