importScripts('https://www.gstatic.com/firebasejs/10.8.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.8.1/firebase-messaging-compat.js');
// import { environment } from './environments/environment';
firebase.initializeApp({
  apiKey: "AIzaSyDWwbEk6YKWpGu5srRlybIZcFajoJF5ZSk",
  authDomain: "goldsikka-59f07.firebaseapp.com",
  projectId: "goldsikka-59f07",
  storageBucket: "goldsikka-59f07.appspot.com",
  messagingSenderId: "1054771871420",
  appId: "1:1054771871420:web:661263b9e2ba0b4a0c5ab9"
});

self.addEventListener('push', function (event) {
  const payload = event.data.json();

  const options = {
    body: payload.notification.body,
    icon: 'http://stg-fms-goldbox.goldsikka.com/assets/img/logo2.png',
  };

  event.waitUntil(
    self.registration.showNotification(payload.notification.title, options)
  );
});

self.addEventListener('notificationclick', function (event) {
  event.notification.close();

  // Open the specified redirection URL when the notification is clicked
  event.waitUntil(
    clients.openWindow('http://stg-fms-goldbox.goldsikka.com/signin')
  );
});
