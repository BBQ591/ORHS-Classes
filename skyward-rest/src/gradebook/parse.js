module.exports = ({ data }) => {
  const {load} = require('cheerio')
  const $ = load(data);
  const alphaKey = $(".even td:nth-child(2)").first().text();
  console.log(alphaKey)
return alphaKey
};