# Namaz Tracking System

![Namaz Tracker Banner](Images/namaz5.jpg)

## Overview

**Namaz Tracking System** is a modern, mobile-friendly Progressive Web App (PWA) designed to help users track their daily prayers (Namaz), view their prayer history, and manage their Islamic routine with ease. Built with Firebase Auth & Firestore, it ensures secure login, beautiful UI, and a seamless user experience in both English and Urdu.

---

## ✨ Features

- **User Authentication:** Secure signup/login with Firebase Auth
- **Prayer Tracking:** Mark daily Namaz as offered/missed
- **History View:** Filter Namaz history by last 7 or 30 days
- **Profile Management:** View and update user info
- **SweetAlert2 Feedback:** Modern, attractive alerts for all actions
- **Responsive Design:** Works great on mobile, tablet, and desktop
- **PWA Ready:** Installable on mobile, with manifest and offline support (service worker ready)
- **Urdu & English UI:** Beautiful Urdu headings and support for Urdu fonts
- **Session Security:** Auto-logout and localStorage cleared on sign out

---

## 📂 Project Structure

```
Namaz Tracking System/
│
├── index.html
├── manifest.json
├── CSS/
│   ├── style.css
│   └── utilities.css
├── HTML/
│   ├── dashboard.html
│   ├── history.html
│   ├── profile.html
│   └── register.html
├── Images/
│   ├── namaz (1).png
│   ├── namaz1.jpg
│   └── ...
├── JS/
│   ├── app.js
│   ├── firebase.js
│   ├── history.js
│   ├── logIn.js
│   ├── profile.js
│   └── signup.js
└── ...
```

---

## 🚀 Getting Started

1. **Clone the Repository**
   ```bash
   git clone https://github.com/umairansari92/Namaz-Tracking-App.git
   ```
2. **Open in VS Code or your favorite editor**
3. **Firebase Setup:**
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Authentication (Email/Password)
   - Create a Firestore database
   - Copy your Firebase config to `JS/firebase.js`
4. **Run Locally:**
   - Open `index.html` in your browser
   - Or use a local server (e.g. Live Server extension in VS Code)

---

## 🖼️ Screenshots

| Dashboard | History | Profile |
|-----------|---------|---------|
| ![Dashboard](Images/namaz1.jpg) | ![History](Images/namaz2.jpg) | ![Profile](Images/namaz3.jpg) |

---

## 🛠️ Tech Stack

- **Frontend:** HTML5, CSS3 (Glassmorphism, Urdu fonts), JavaScript (ES6)
- **Backend:** Firebase Auth, Firestore
- **UI/UX:** SweetAlert2, Responsive Design, PWA Manifest

---

## 📱 PWA & Offline Support

- `manifest.json` included for installability
- Ready for service worker integration for offline use
- Add to Home Screen on mobile for app-like experience

---

## 🔒 Security

- Auth required for all protected pages
- Session cleared on logout (localStorage + Firebase sign out)
- No access to dashboard/history/profile after logout

---

## 🙏 Credits & Fonts

- Urdu fonts: [Noto Nastaliq Urdu](https://fonts.google.com/specimen/Noto+Nastaliq+Urdu), [Jameel Noori Nastaleeq](https://www.fontmirror.com/jameel-noori-nastaleeq)
- SweetAlert2: [sweetalert2.github.io](https://sweetalert2.github.io/)
- Images: Unsplash, custom graphics

---

## 📧 Contact

For feedback, suggestions, or contributions:
- GitHub: [umairansari92/Namaz-Tracking-App](https://github.com/umairansari92/Namaz-Tracking-App)
- Email: [Your Email Here]

---

## 🕋 جزاک اللہ خیراً

**May Allah accept your prayers and efforts!**
