
const reportcard = require('./src/reportcard');
const gradebook = require('./src/gradebook');
const authenticate = require('./src/authenticate');

module.exports = skywardURL => ({
  scrapeReport: (auth) => (
      reportcard.fetch(skywardURL)(auth))
      .then(response => ({
        raw: response.data,
      })
  ),

  scrapeGradebook: ({ course }, auth) => (
      gradebook.fetch(skywardURL)(auth)(course))
      .then(response => ({
        data: gradebook.getData(response),
      })
  ),
gettingSessionID: (user,pass) => (
  authenticate(skywardURL)(user,pass).then(auth => (auth))
)
});
