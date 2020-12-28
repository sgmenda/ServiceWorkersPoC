/*
 * Simple script to register a service worker.
 * Adapted from https://github.com/mdn/sw-test/blob/gh-pages/app.js
 */

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/ServiceWorkersPoC/sw.js', {scope: '/ServiceWorkersPoC/'})
    .then(function (reg) {
      if (reg.installing) {
        console.log('Service worker installing');
      } else if (reg.waiting) {
        console.log('Service worker installed');
      } else if (reg.active) {
        console.log('Service worker active');
      }
    })
    .catch(function (error) {
      console.log('Registration failed with ' + error);
    });
}
