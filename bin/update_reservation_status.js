#! /app/.heroku/node/bin/node
async function updateReservationStatus() {
  const axios = require('axios').default;
  const baseurl = 'http://164.90.182.159:5000/';
  const path = 'reservations/updateReservationStatus';
  const url = baseurl + path;
  let params = { limit: 1 };
  let options = {};
  options['params'] = params;

  await axios
    .get(url, options)
    .then((result) => {
      process.exit();
    })
    .catch((err) => {
      console.log({ err });
      process.exit();
    });
}
updateReservationStatus();
