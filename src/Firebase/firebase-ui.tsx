import { GoogleAuthProvider } from "./firebase";

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