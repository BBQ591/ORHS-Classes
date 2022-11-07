const axios = require("axios");
const scrape = require("./scrape");

module.exports = {
  fetch: (skywardURL) => (auth) => scrape(axios, skywardURL)(auth),
};
