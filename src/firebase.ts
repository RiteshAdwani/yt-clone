import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC1FgAgWDO_kBEUQkDBu9sQ0CTyrm8DCqs",
  authDomain: "viewtube-my-project.firebaseapp.com",
  projectId: "viewtube-my-project",
  storageBucket: "viewtube-my-project.appspot.com",
  messagingSenderId: "345460613181",
  appId: "1:345460613181:web:d7c679d277a604b5a20a54"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export default app;