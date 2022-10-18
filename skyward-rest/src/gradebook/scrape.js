const body = ({ encses, sessionId }, course) => {
  if (!encses || !sessionId) throw new TypeError('encses & sessionId are required');

  return 'action=dialog&type=class&ishttp=true'
  + `&corNumId=${course}`
  + `&sessionid=${sessionId}&encses=${encses}`;
};

module.exports = (axios, skywardURL) => (auth, course) => {
  if (!axios || !skywardURL) throw new TypeError('axios & skywardURL are required');

  return axios({
    url: '../httploader.p?file=sfdialogs.w',
    baseURL: skywardURL,
    method: 'post',
    data: body(auth, course),
  });
};