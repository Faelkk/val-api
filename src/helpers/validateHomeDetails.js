function validateHomeDetails(data, res) {
  const { urlTrailerHome, episode, act } = data;
  const allowedProperties = ["urlTrailerHome", "episode", "act"];

  const errors = [];

  function addError(errorMessage) {
    errors.push(errorMessage);
  }

  for (const key in data) {
    if (!allowedProperties.includes(key)) {
      addError(`Invalid property: ${key}`);
    }
  }

  if (!urlTrailerHome) {
    addError("urlTrailerHome is required");
  }

  if (!episode) {
    addError("Episode is required");
  }

  if (!act) {
    addError("act is required");
  }

  if (errors.length > 0) {
    return res.send(400, { errors });
  }

  return true;
}

module.exports = validateHomeDetails;
