
const axios = require('axios');
const scrape = require('./scrape');
const parse = require('./parse')
module.exports = {
  fetch: skywardURL => (
    auth => (
      (course) => scrape(axios, skywardURL)(auth, course)
    )
  ),

  getData: parse,
};
