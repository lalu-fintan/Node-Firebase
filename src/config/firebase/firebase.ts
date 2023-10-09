import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use

const firebaseConfig = {
  apiKey: "AIzaSyCl9Xg6I3QpXkO_h_dViyI8ItBuv_kZ5EQ",
  authDomain: "node-firebase-89705.firebaseapp.com",
  projectId: "node-firebase-89705",
  storageBucket: "node-firebase-89705.appspot.com",
  messagingSenderId: "42814780535",
  appId: "1:42814780535:web:eb9a5716a4bb12268b0272",
  measurementId: "G-GRP7V2BZH2",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default analytics;
