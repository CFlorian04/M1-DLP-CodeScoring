const { forEach } = require("lodash");

exports.allDeclaredIsUsed = (ast) => {
  return 1;
};

exports.allUsedIsDeclared = (tokens, result) => {
  if (!result || !result.details) {
    throw new Error("Invalid result object or missing details property");
  }

  const tokenValues = tokens.map((token) => token.value); 
  const resultValues = Object.values(result.details).reduce((acc, detail) => {
    return acc.concat(Object.keys(detail));
  }, []); 

  
  const allUsedIsDeclared = tokenValues.every((tokenValue) =>
    resultValues.includes(tokenValue)
  );

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
