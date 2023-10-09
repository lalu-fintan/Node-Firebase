"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("firebase/app");
const analytics_1 = require("firebase/analytics");
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
const app = (0, app_1.initializeApp)(firebaseConfig);
const analytics = (0, analytics_1.getAnalytics)(app);
exports.default = analytics;
//# sourceMappingURL=firebase.js.map