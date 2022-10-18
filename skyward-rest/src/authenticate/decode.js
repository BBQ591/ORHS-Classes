module.exports = ({ data } = {}) => {
  // This may need to be deleted because it throws an error here
  if (!data) return "No username or password or it is invalid";

  if (data === "<li>Invalid login or password.</li>")
    throw new TypeError("Invalid Skyward credentials");

  const tokens = data.slice(4, -5).split("^");

  if (tokens.length < 15) return "No username or password or it is invalid";

  return {
    dwd: tokens[0],
    wfaacl: tokens[3],
    encses: tokens[14],
    sessionId: `${tokens[1]}%15${tokens[2]}`,
  };
};
