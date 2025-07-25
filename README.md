# محاسبۂ نماز (Namaz Tracker)

A web-based prayer tracking application that helps Muslims track their daily prayers (Namaz) with real-time prayer timings and historical data tracking.

## ✨ Features

### 🔐 User Authentication
- User registration and login system
- Firebase Authentication integration
- Secure user sessions with local storage
- Protected routes for authenticated users

### 📿 Prayer Tracking
- Track 5 daily prayers (Fajr, Dhuhr, Asr, Maghrib, Isha)
- Real-time prayer timings from AlAdhan API
- Visual status indicators (✅/❌) for each prayer
- Time-based validation (can only mark prayers after their scheduled time)
- Automatic backfill of prayer data from signup date to current date

### 📊 Data Management
- Cloud-based storage using Firebase Firestore
- Historical prayer tracking
- User profile management
- Date-wise prayer completion records

### 🌐 Multi-language Support
- Urdu/Arabic text for Islamic greetings and prayers
- English interface for navigation and forms
- Beautiful typography with multiple Google Fonts

### 📱 Responsive Design
- Modern, clean UI design
- Mobile-friendly responsive layout
- Islamic-themed styling with beautiful background images

## 🏗️ Project Structure

```
├── index.html              # Login page (entry point)
├── firebase.js             # Firebase configuration and exports
├── CSS/
│   ├── style.css          # Main stylesheet
│   └── utilities.css      # Utility classes
├── HTML/
│   ├── dashboard.html     # Main dashboard for prayer tracking
│   ├── register.html      # User registration page
│   ├── history.html       # Prayer history page
│   └── profile.html       # User profile page
├── JS/
│   ├── app.js            # Main application logic
│   ├── logIn.js          # Login functionality
│   ├── signup.js         # Registration functionality
│   ├── history.js        # History page logic
│   └── profile.js        # Profile page logic
└── Images/               # Prayer-themed background images
    ├── namaz1.jpg
    ├── namaz2.jpg
    └── ... (more images)
```

## 🛠️ Technologies Used

- **Frontend**: HTML5, CSS3, Vanilla JavaScript (ES6 Modules)
- **Backend**: Firebase (Authentication + Firestore Database)
- **API**: AlAdhan API for prayer timings
- **Fonts**: Google Fonts (Inter, Lato, Montserrat, Open Sans, Oswald, Poppins, Roboto)
- **Notifications**: SweetAlert2 for beautiful alerts
- **Styling**: Custom CSS with responsive design

## 🚀 Setup Instructions

### Prerequisites
- A modern web browser
- Internet connection (for Firebase and API calls)
- Firebase project setup

### Installation

1. **Clone or download the project**
   ```bash
   git clone <repository-url>
   cd namaz-tracker
   ```

2. **Firebase Setup**
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com)
   - Enable Authentication (Email/Password)
   - Create a Firestore Database
   - Update the Firebase configuration in `firebase.js` with your project credentials

3. **Configure Firebase**
   ```javascript
   const firebaseConfig = {
     apiKey: "your-api-key",
     authDomain: "your-project.firebaseapp.com",
     projectId: "your-project-id",
     storageBucket: "your-project.appspot.com",
     messagingSenderId: "your-sender-id",
     appId: "your-app-id"
   };
   ```

4. **Serve the application**
   - Use a local web server (e.g., Live Server in VS Code)
   - Or use Python: `python -m http.server 8000`
   - Or use Node.js: `npx serve .`

5. **Access the application**
   - Open your browser and navigate to `http://localhost:8000` (or your server URL)

## 📋 Database Structure

### Users Collection (`users`)
```javascript
{
  uid: "user-unique-id",
  firstName: "User First Name",
  lastName: "User Last Name",
  email: "user@example.com",
  signupDate: "2024-01-01"
}
```

### Namaz Tracker Collection (`namazTracker`)
```javascript
{
  userId: {
    "2024-01-01": {
      Fajr: true,
      Dhuhr: false,
      Asr: true,
      Maghrib: true,
      Isha: false
    },
    "2024-01-02": {
      // ... prayer status for another date
    }
  }
}
```

## 🔧 Key Features Explained

### Authentication Flow
1. Users can register with email/password
2. Login redirects to dashboard
3. Protected routes check authentication status
4. Logout clears session and redirects to login

### Prayer Tracking Logic
1. Fetches real-time prayer timings for Karachi, Pakistan
2. Users can only mark prayers as completed after their scheduled time
3. Visual feedback with checkmarks and X marks
4. Data is automatically saved to Firestore

### Historical Data
- Automatically creates prayer records for all dates from signup to current date
- Users can view their prayer completion history
- Data persistence ensures no prayer tracking data is lost

## 🌍 API Integration

**AlAdhan API**: Provides accurate prayer timings
- Endpoint: `https://api.aladhan.com/v1/timingsByCity`
- Location: Karachi, Pakistan
- Method: ISNA (Islamic Society of North America)

## 👨‍💻 Developer

**Umair Ahmed Ansari** - Web App Developer

## 🔮 Future Enhancements

- [ ] Add location-based prayer timings
- [ ] Prayer streak tracking
- [ ] Qibla direction finder
- [ ] Prayer statistics and analytics
- [ ] Push notifications for prayer times
- [ ] Dark/Light theme toggle
- [ ] Multi-language support expansion
- [ ] Offline capability with service workers

## 📝 Usage

1. **Registration**: Create a new account with email and password
2. **Login**: Access your dashboard with credentials
3. **Track Prayers**: Click the status buttons to mark prayers as completed
4. **View History**: Check your prayer completion history
5. **Profile**: Manage your account information

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Create a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

**جزاک اللہ خیراً** (May Allah reward you with goodness) for using this application to maintain your prayers! 🤲