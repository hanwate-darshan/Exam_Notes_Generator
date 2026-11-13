
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider} from "firebase/auth"
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "examnotesai-2a772.firebaseapp.com",
  projectId: "examnotesai-2a772",
  storageBucket: "examnotesai-2a772.firebasestorage.app",
  messagingSenderId: "654164171018",
  appId: "1:654164171018:web:90a92ff6da99afeb9682f3"
};
const app = initializeApp(firebaseConfig);
const auth =getAuth(app)
const provider =new GoogleAuthProvider()
export {auth, provider }








