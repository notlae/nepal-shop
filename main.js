import { initializeApp } from "https://www.gstatic.com/firebasejs/12.12.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.12.0/firebase-analytics.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.12.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDar5rXhXvGLLb04u_iLb1JzXIwCgQqCWY",
  authDomain: "login-8235d.firebaseapp.com",
  projectId: "login-8235d",
  storageBucket: "login-8235d.firebasestorage.app",
  messagingSenderId: "681287583271",
  appId: "1:681287583271:web:38f7fa8981c6993915f002",
  measurementId: "G-333LDX1D3B",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
