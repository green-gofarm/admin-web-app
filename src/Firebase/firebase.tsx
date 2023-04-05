import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
	apiKey: process.env.REACT_APP_FIREBASE_API_KEY ?? "",
	authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN ?? "",
	projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID ?? "",
	storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET ?? "",
	messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID ?? "",
	appId: process.env.REACT_APP_FIREBASE_APP_ID ?? "",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Firebase token
const TIME_OUT = 5000;
const getFirebaseToken = async (): Promise<string | null> => {
	const currentUser = auth.currentUser;

	if (currentUser) {
		return await currentUser.getIdToken();
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

		return token;
	} catch (error) {
		console.error('Error getting Firebase token: ', error);
		return null;
	}
};

// MESSAGING
const messaging = getMessaging(app);
const vapidKey = process.env.REACT_APP_FIREBASE_MESSAGING_VAPID_KEY;
// const vapidKey = "BMeU_NOghJUw01vS30kMH3peU2BoNcRvKFbY0CKoDUaza-hkDDtTmMpL1pWFLLaRTHKUzO_kk4LhdeECiijfM6M";

const getMessagingToken = async () => {
	try {
		const token = await getToken(messaging, { vapidKey })
		return token;
	} catch (error) {
		console.log(error);
		return null;
	}
}

export {
	firebaseConfig,

	auth,
	getFirebaseToken,

	messaging,
	getMessagingToken
};