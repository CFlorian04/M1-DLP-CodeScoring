const { forEach } = require("lodash");

exports.allDeclaredIsUsed = (ast) => {
  return 1;
};

exports.allUsedIsDeclared = (tokens, result) => {
  if (!result || !result.details) {
    throw new Error("Invalid result object or missing details property");
  }

  const tokenValues = tokens.map((token) => token?.value); // Obtient les valeurs de chaque token
  // console.log(tokenValues);
  const variableValues = tokens
    .filter(
      (token) => token.type === "word" || token.type === "variableAffectation"
    ) // Inclure également les affectations de variables
    .map((token) => token.value);

  // console.log("variableValues :", variableValues);

  // Vérifie si toutes les valeurs de variableValue sont présentes dans tokenValues
  const allUsedIsDeclared = variableValues.every((variableValue) => {
    return tokenValues.includes(variableValue);
  });

  return allUsedIsDeclared ? 1 : 0;
};

exports.allExpressionFinished = (ast) => {
  return 1;
};

exports.indentation = (ast) => {
  return 1;
};

exports.numberLine = (ast) => {
  let nb = 1;
  ast.forEach((e) => {
    if (e.type == "newLine") {
      nb++;
    }
  });

  return nb;
};
