const body = ({ user, pass }) => {
  if (!user || !pass) return "No username or password";

  return `requestAction=eel&codeType=tryLogin&login=${user}&password=${pass}`;
};

module.exports = (axios, skywardURL) => (credentials) => {
  if (!axios || !skywardURL)
    throw new TypeError("axios & skywardURL are required");
  return axios({
    url: "../skyporthttp.w",
    baseURL: skywardURL,
    method: "post",
    data: body(credentials),
  });
};
