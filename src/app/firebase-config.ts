import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
const firebaseConfig = {
  apiKey: "AIzaSyAVu1JDPFcIgnHM0vRaM8A9HW-lGjDgLlg",
  authDomain: "aibettor-30854.firebaseapp.com",
  databaseURL: "https://aibettor-30854-default-rtdb.firebaseio.com",
  projectId: "aibettor-30854",
  storageBucket: "aibettor-30854.appspot.com",
  messagingSenderId: "773658031633",
  appId: "1:773658031633:web:dc2c864b5f151caa8ba3b0",
  measurementId: "G-WKCGS7R9MZ"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);