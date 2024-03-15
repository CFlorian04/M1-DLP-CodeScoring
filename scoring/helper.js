const { forEach } = require("lodash");

exports.allDeclaredIsUsed = (ast) => {
  return 1;
};

exports.allUsedIsDeclared = (tokens, ast) => {
  const tokenValues = tokens.map((token) => token?.value); // Obtient les valeurs de chaque token
  // console.log(tokenValues);

  // Récupérer les valeurs des tokens de type "variableAffectation" dans ast
  const variableValues = ast
    .filter((node) => node.type === "variableAffectation")
    .map((node) => node.variableValue.value); // Accéder à la valeur de la variable affectée

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
  const allIndentedProperly = ast.every((node) => {
    return node.type !== "indentNumber" || (node.type === "indentNumber" && node.quantity > 1);
  });

  return allIndentedProperly ? 1 : 0;
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
