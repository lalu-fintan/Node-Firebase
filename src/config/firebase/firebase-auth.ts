import { NextFunction } from "express";
import admin from "firebase-admin";

import serviceAccount from "../../firesbase-service.json";

const account = serviceAccount as admin.ServiceAccount;

admin.initializeApp({
  credential: admin.credential.cert(account),
  storageBucket: "gs://node-firebase-89705.appspot.com",
});

export default admin;
