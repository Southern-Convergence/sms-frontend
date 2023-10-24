import { precacheAndRoute } from 'workbox-precaching'

declare let self: ServiceWorkerGlobalScope;




//Shameless RIP from MDN's ServiceWorker Cookbook XD
self.addEventListener('push', function(event) {
  // Keep the service worker alive until the notification is created.
  event.waitUntil(
    // Show a notification with title 'ServiceWorker Cookbook' and body 'Alea iacta est'.
    // Set other parameters such as the notification language, a vibration pattern associated
    // to the notification, an image to show near the body.
    // There are many other possible options, for an exhaustive list see the specs:
    // https://notifications.spec.whatwg.org/
    self.registration.showNotification('HRIS Notification', {
      lang: 'en',
      body: 'Emman, putang ina mo talaga',
      
      vibrate: [500, 100, 500],
    })
  );
});

precacheAndRoute(self.__WB_MANIFEST)