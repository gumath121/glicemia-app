self.addEventListener("install", function(event) {
  self.skipWaiting();
});

self.addEventListener("activate", function(event) {
  event.waitUntil(
    clients.claim()
  );
});

/* =====================================================
   NOTIFICAÇÃO RECEBIDA
   ===================================================== */

self.addEventListener("push", function(event) {

  let dados = {
    titulo: "Lembrete de glicemia",
    mensagem: "Está na hora de registrar sua glicemia ❤️"
  };

  if (event.data) {
    try {
      dados = event.data.json();
    } catch (erro) {
      console.log("Dados da notificação não são JSON.");
    }
  }

  event.waitUntil(
    self.registration.showNotification(dados.titulo, {
      body: dados.mensagem,
      icon: "./icon-192.png",
      badge: "./icon-192.png",
      vibrate: [200, 100, 200],
      data: {
        url: "./"
      }
    })
  );

});

/* =====================================================
   CLIQUE NA NOTIFICAÇÃO
   ===================================================== */

self.addEventListener("notificationclick", function(event) {

  event.notification.close();

  event.waitUntil(
    clients.matchAll({
      type: "window",
      includeUncontrolled: true
    }).then(function(lista) {

      for (const cliente of lista) {

        if ("focus" in cliente) {
          return cliente.focus();
        }

      }

      if (clients.openWindow) {
        return clients.openWindow("./");
      }

    })
  );

});

/* =====================================================
   CACHE / INTERNET
   ===================================================== */

self.addEventListener("fetch", function(event) {

  event.respondWith(

    fetch(event.request)
      .catch(function() {

        return caches.match(event.request);

      })

  );

});
