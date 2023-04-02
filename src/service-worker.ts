export const registerFcm = () => {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('firebase-messaging-sw.js')
            .then((registration) => {
                console.log('Service worker registered:', registration);
            })
            .catch((error) => {
                console.error('Error registering service worker:', error);
            });
    }
};
