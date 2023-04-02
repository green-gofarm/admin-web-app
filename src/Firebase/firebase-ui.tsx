import { GoogleAuthProvider } from "firebase/auth";

const signInUiConfig = {
    signInFlow: "redirect",
    callbacks: {
        signInSuccessWithAuthResult: () => false,
    },
    signInOptions: [
        GoogleAuthProvider.PROVIDER_ID,
    ],
};


export {
    signInUiConfig,
};