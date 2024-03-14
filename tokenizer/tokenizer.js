
const helper = require("./helper");
const constTokens = require("./constants");

module.exports = function (code) {
  //Remplacement des caractères spéciaux
  code = helper.replaceSpecialsChars(code);

  //Split du code par rapport aux espaces
  var split_code = code.split(/[ ]+/);
  var tokens = []
  // Parcours du tableau 
  for (var i = 0; i < split_code.length; i++) {
    var t = split_code[i]
    //Si la valeur n'est pas un nombre
    if (t.length <= 0 || isNaN(t)) {
      let typeChars = helper.checkChars(t);
      //Si la valeur est un caractère spécial -> Insertion en tant que caractère spécial
      if (typeChars) {
        tokens.push({ type: typeChars })
      //Sinon -> Insertion en tant que mot
      } else {
        tokens.push({ type: constTokens.typeWord, value: t })
      }
    //Si la valeur est un nombre -> Insertion en tant que nombre
    } else {
      tokens.push({ type: constTokens.typeNumber, value: t })
    }
  }

  //Si il n'y pas de tokens
  if (tokens.length < 1) {
    throw constTokens.errorNoTokenFound;
  }
  
  return tokens
}