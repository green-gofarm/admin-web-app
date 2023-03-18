import firebase from "firebase/compat/app";

// Add the Firebase products that you want to use
import "firebase/compat/auth";
import "firebase/compat/firestore";
import 'firebase/compat/messaging';

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
const authObject = firebase.auth;
const GoogleAuthProvider = firebase.auth.GoogleAuthProvider;
const messaging = firebase.messaging();

const TIME_OUT = 5000;
const getFirebaseToken = async (): Promise<string | null> => {
	const currentUser = auth.currentUser;

	if (currentUser) {
		return await currentUser.getIdToken();
	}

	const hasRememberedAccount = localStorage.getItem('firebaseui::rememberedAccounts');

	if (!hasRememberedAccount) {
		return null;
	}

	try {
		const token = await new Promise<string>((resolve, reject) => {
			const waitTimer = setTimeout(() => {
				reject("TIME OUT!");
			}, TIME_OUT);

			const unregisterAuthObserver = auth.onAuthStateChanged(async (user) => {
				if (!user) {
					unregisterAuthObserver();
					clearTimeout(waitTimer);
					reject(null);
				} else {
					const userToken = await user.getIdToken();
					unregisterAuthObserver();
					clearTimeout(waitTimer);
					resolve(userToken);
				}
			});
		});

		console.log("Get token success: ", token);
		return token;
	} catch (error) {
		console.error('Error getting Firebase token: ', error);
		return null;
	}
};

export {
	db,
	auth,
	authObject,
	messaging,
	getFirebaseToken,
	GoogleAuthProvider
};