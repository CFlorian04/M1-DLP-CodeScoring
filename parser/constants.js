
exports.typeVariable= 'variable';
exports.typeString= 'string';

exports.expressionDeclaration= "variableDeclaration";
exports.expressionAffectation= "variableAffectation";
exports.expressionFunctionDeclaration = "functionDeclaration";
exports.expressionIndent = "indentNumber";
exports.expressionMethodCall= "objectMethodCall";

exports.declarationLoop = ["for", "while"]
exports.declarationClass = ["class"]
exports.declarationFunction = ["def"];
exports.declarationVariable = ["var","let", "const"];
exports.declarationCondition = ["if", "else", "elif", "not"];

exports.errorMissingOpenParenthesis = "Error: missing a open parenthesis";
exports.errorMissingCloseParenthesis= "Error: missing a close parenthesis";
exports.errorMissingQuotationMark= "Error: missing quotation mark";
exports.errorMissingWord= "Error: missing a word for valid expression";
exports.errorMissingColon= "Error: missing a colon for valid function declaration";