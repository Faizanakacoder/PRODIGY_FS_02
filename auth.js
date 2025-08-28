// auth.js
import { auth } from "./firebase.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const email = document.getElementById("email");
const password = document.getElementById("password");
const msg = document.getElementById("msg");
const signupBtn = document.getElementById("signupBtn");
const loginBtn = document.getElementById("loginBtn");

if (signupBtn) {
  signupBtn.addEventListener("click", async () => {
    try {
      await createUserWithEmailAndPassword(auth, email.value, password.value);
      msg.textContent = "✅ Account created. You can log in now.";
    } catch (e) {
      msg.textContent = "❌ " + e.message;
    }
  });
}

if (loginBtn) {
  loginBtn.addEventListener("click", async () => {
    try {
      await signInWithEmailAndPassword(auth, email.value, password.value);
      window.location.href = "dashboard.html";
    } catch (e) {
      msg.textContent = "❌ " + e.message;
    }
  });
}

// Optional: if already logged in, go straight to dashboard
onAuthStateChanged(auth, (user) => {
  // stay here on index; redirect only after explicit login to avoid loops
});
