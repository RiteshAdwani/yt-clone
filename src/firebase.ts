import firebase from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAnm2bvsP8RXKJvOVPf0p0FRMp-W0RLmrU",
  authDomain: "viewtube-my-project.firebaseapp.com",
  projectId: "viewtube-my-project",
  storageBucket: "viewtube-my-project.appspot.com",
  messagingSenderId: "345460613181",
  appId: "1:345460613181:web:d7c679d277a604b5a20a54"
};

const app = firebase.initializeApp(firebaseConfig);
const auth = getAuth(app);

export {auth};
export default app;