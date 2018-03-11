// These scripts are made available when the app is served or deployed on Firebase Hosting
// If you do not serve/host your project using Firebase Hosting see https://firebase.google.com/docs/web/setup

console.log('Firebase Messaging SW...');

importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js');

firebase.initializeApp({
  'messagingSenderId': '1064254593127'
});

const messaging = firebase.messaging();

messaging.onMessage(payload => {
  console.log('Message received!');
});

messaging.setBackgroundMessageHandler((payload) => {
  console.log('[Firebase SW] Received message... ', payload);

  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: 'Background Message Body....',
    icon: 'https://www.shareicon.net/download/2016/07/08/117548_google_512x512.png'
  };

  return self.registration.showNotification(notificationTitle, notificationOptions);
});