/* =====================================================
   FIREBASE SERVICE WORKER
   GLICEMIA APP
   ===================================================== */

importScripts(
  "https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js"
);

importScripts(
  "https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js"
);


/* =====================================================
   FIREBASE CONFIG
   ===================================================== */

firebase.initializeApp({

  apiKey:
    "AIzaSyBFOFv0RsvmtrSOxchD3kUVAMqdmp6VVF0",

  authDomain:
    "glicemia-app-686aa.firebaseapp.com",

  projectId:
    "glicemia-app-686aa",

  storageBucket:
    "glicemia-app-686aa.firebasestorage.app",

  messagingSenderId:
    "312445316096",

  appId:
    "1:312445316096:web:3c274c00e91dfc2686fce5"

});


/* =====================================================
   FIREBASE MESSAGING
   ===================================================== */

const messaging =
  firebase.messaging();


/* =====================================================
   NOTIFICAÇÃO EM SEGUNDO PLANO
   ===================================================== */

messaging.onBackgroundMessage(
  function(payload) {

    console.log(
      "[sw.js] Mensagem recebida:",
      payload
    );


    const notificationTitle =
      payload.notification?.title ||
      "Hora da glicemia 💗";


    const notificationOptions = {

      body:
        payload.notification?.body ||
        "Não se esqueça de registrar sua glicemia de hoje.",

      icon:
        "./icon-192.png",

      badge:
        "./icon-192.png",

      data:
        payload.data || {}

    };


    self.registration.showNotification(
      notificationTitle,
      notificationOptions
    );

  }
);


/* =====================================================
   CLIQUE NA NOTIFICAÇÃO
   ===================================================== */

self.addEventListener(
  "notificationclick",
  function(event) {

    event.notification.close();


    event.waitUntil(

      clients.matchAll({
        type: "window",
        includeUncontrolled: true
      })

      .then(
        function(clientList) {

          for (
            const client of clientList
          ) {

            if (
              "focus" in client
            ) {

              return client.focus();

            }

          }


          if (
            clients.openWindow
          ) {

            return clients.openWindow(
              "./"
            );

          }

        }
      )

    );

  }
);


/* =====================================================
   SERVICE WORKER
   ===================================================== */

self.addEventListener(
  "install",
  function(event) {

    self.skipWaiting();

  }
);


self.addEventListener(
  "activate",
  function(event) {

    event.waitUntil(
      clients.claim()
    );

  }
);
