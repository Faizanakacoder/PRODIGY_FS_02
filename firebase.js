// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyAM0ZxWSAPlKWRaypC8LmXr_opKPiACog8",
  authDomain: "p02-ems.firebaseapp.com",
  databaseURL: "https://p02-ems-default-rtdb.firebaseio.com",
  projectId: "p02-ems",
  storageBucket: "p02-ems.appspot.com",
  messagingSenderId: "893306842563",
  appId: "1:893306842563:web:9db7f6e45c6a8efb77e176",
  measurementId: "G-93H535D9DH"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
