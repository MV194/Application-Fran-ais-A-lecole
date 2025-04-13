const express = require("express");
const app = express();
const path = require("path");
const admin = require("firebase-admin");

// Initialize Firebase Admin SDK
const serviceAccount = require("/home/user/refrancisation/refrancisation-firebase-adminsdk-fbsvc-29b7eae805.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://refrancisation-default-rtdb.firebaseio.com"
});

const db = admin.database();

app.use(express.static("public")); // Serve static files

// Endpoint to retrieve niveau data
app.get("/niveau", async (req, res) => {
  try {
    const snapshot = await db.ref("niveau").once("value");
    res.json(snapshot.val());
  } catch (err) {
    console.error("Firebase error:", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

app.listen(3000, () => {
  console.log("Server démarré sur http://localhost:3000");
});
