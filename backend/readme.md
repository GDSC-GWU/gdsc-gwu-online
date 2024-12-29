# GDSC GWU ONLINE BACKEND

This folder contains the development of the GDSC GWU backend, developed using Node.js and Express. The backend is connected to Firebase Authentication and Firebase Realtime Database.

## Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/GDSC-GWU/gdsc-gwu-online/tree/cf4b65d56edbad75f4fefc713ec577a52011fe82/backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   nodemon server.js
   ```

## Setting up Firebase

1. In `.env`, get the values from Firebase Console or ask the admin team to provide them for development:
   ```env
   FIREBASE_apiKey=
   FIREBASE_authDomain=
   FIREBASE_projectId=
   FIREBASE_storageBucket=
   FIREBASE_messagingSenderId=
   FIREBASE_appId=
   FIREBASE_measurementId=
   ```

2. Download the Service Account JSON from Firebase Console and save it as `config/firebaseService.json`.
