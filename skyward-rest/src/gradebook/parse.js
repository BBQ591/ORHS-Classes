module.exports = ({ data }) => {
  const { load } = require("cheerio");
  const $ = load(data);
  const alphaKey = $(".even td:nth-child(2)").first().text();
  var overall = $(".odd td:nth-child(2)").text();
  for (let i = 0; i < overall.length; i++) {
    if (overall[i] == "-") {
      var endSub = i;
      break;
    }
  }
  var tdIndex = 0;
  for (let i = 0; i < data.length; i++) {
    if (data.substring(i, i + 2) == "td") {
      tdIndex = i;
      break;
    }
  }
  var startClassName;
  var className = "";
  for (let i = tdIndex; i < data.length; i++) {
    if (data[i] == ">") {
      startClassName = i;
      break;
    }
  }
  for (let i = startClassName + 1; i < data.length; i++) {
    if (data[i] == "<") {
      break;
    }
    className = className + data[i];
  }
  console.log(className);
  return [
    alphaKey,
    overall.substring($(".odd td:nth-child(2)").first().text().length, endSub),
    className,
  ];
};
