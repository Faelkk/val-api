function validateAbilities(abilities, res) {
  const errors = [];

  function addError(errorMessage) {
    errors.push(errorMessage);
  }

  if (
    !abilities ||
    typeof abilities !== "object" ||
    Object.keys(abilities).length === 0
  ) {
    addError("Abilities is required and must have the correct structure");
    return res.send(400, { errors });
  }

  const validKeys = ["Q", "E", "C", "X"];

  const extraKeys = Object.keys(abilities).filter(
    (key) => !validKeys.includes(key)
  );

  if (extraKeys.length > 0) {
    addError(`Invalid properties found: ${extraKeys.join(", ")}`);
  }

  const allKeysPresent = validKeys.every((key) =>
    abilities.hasOwnProperty(key)
  );

  if (!allKeysPresent) {
    addError("All abilities (Q, E, C, X) are required");
  }

  const validAbilityStructure = validKeys.every((key) => {
    return typeof abilities[key] === "string" && abilities[key].trim() !== "";
  });

  if (!validAbilityStructure) {
    addError("Structure of abilities is not valid");
  }

  if (errors.length > 0) {
    return res.send(400, { errors });
  }

  return true;
}

module.exports = validateAbilities;
