// Importa funciones necesarias
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Configuración de tu proyecto (la que te dio Firebase)
const firebaseConfig = {
  apiKey: "AIzaSyDdCcoNPdDCOZ9eRAi43o8GFCa0Tu0BUCk",
  authDomain: "reelment-c8a03.firebaseapp.com",
  projectId: "reelment-c8a03",
  storageBucket: "reelment-c8a03.firebasestorage.app",
  messagingSenderId: "323128662170",
  appId: "1:323128662170:web:8a5670a8a9aadecfb26723"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Exporta la base de datos para usarla en tu app
export const db = getFirestore(app);
