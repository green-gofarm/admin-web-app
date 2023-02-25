import firebase from "firebase/compat/app";

// Add the Firebase products that you want to use
import "firebase/compat/auth";
import "firebase/compat/firestore";
const firebaseConfig = {
	apiKey: "AIzaSyDj4Epm6rG_yiDm0vjjPk7Djsxli3_ufpE",
	authDomain: "go-gofarm.firebaseapp.com",
	projectId: "go-gofarm",
	storageBucket: "go-gofarm.appspot.com",
	messagingSenderId: "238098794310",
	appId: "1:238098794310:web:b9dbae80dde5f9363a8747",
	measurementId: "G-7D46LPZG85"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };