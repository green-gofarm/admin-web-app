importScripts('https://www.gstatic.com/firebasejs/9.9.3/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.9.3/firebase-messaging-compat.js');

self.addEventListener('fetch', () => {
    const urlParams = new URLSearchParams(location.search);
    self.firebaseConfig = Object.fromEntries(urlParams);
});

const defaultConfig = {
    apiKey: true,
    projectId: true,
    messagingSenderId: true,
    appId: true,
};

firebase.initializeApp(self.firebaseConfig || defaultConfig);
const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
    // console.log('[firebase-messaging-sw.js] Received background message', payload);
});
