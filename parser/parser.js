const constTokens = require("../tokenizer/constants");
const constParser = require("./constants");
const factory = require("./expressionsFactory");

module.exports = (tokens) => {
    let AST = [];
    for (let i = 0; i < tokens.length; i++) {
        let expression = null;
        //Nouvelle Ligne (prise en compte de l'indentation)
        if (tokens[i].type == constTokens.tokensNewLine) {
            expression = factory.create(constParser.expressionNewLine, tokens, i);
            i = expression.end;
        //Déclaration de variable
        } else if (tokens[i].type == constTokens.typeWord && constParser.declarationVariable.indexOf(tokens[i].value) != -1) {
            expression = factory.create(constParser.expressionDeclaration, tokens, i);
            i++;

        //Indentation (en dehors des nouvelles lignes)
        } else if (tokens[i].type == constTokens.typeIndent)
        {
            expression = factory.create(constParser.expressionIndent, tokens, i)

            i = expression.end;
        //Déclaration de fonction
        } else if (tokens[i].type == constTokens.typeWord && constParser.declarationFunction.indexOf(tokens[i].value) != -1)
        {
            expression = factory.create(constParser.expressionFunctionDeclaration, tokens, i)
            i = expression.end;

        //Affectation de valeur ("=") 
        } else if (tokens[i].type == constTokens.symboleEqual) {
            expression = factory.create(constParser.expressionAffectation, tokens, i);
            //Si la valeur est un nombre
            if (expression.variableValue.type == constTokens.typeNumber) {
                i++;
            //Si la valeur est un mot
            } else {
                i = expression.variableValue.end;
            }
            AST.pop();
        //Utilisation de méthode * Pas en python
        // } else if (i < tokens.length - 1 && tokens[i].type == constTokens.typeWord && tokens[i + 1].type == constTokens.symbolePoint) {
        //     expression = factory.create(constParser.expressionMethodCall, tokens, i);
        //     i = expression.end;
        // Appel de fonction
        } else if (i < tokens.length - 2 && tokens[i].type == constTokens.typeWord && tokens[i + 1].type == constTokens.symboleOpenParenthese) {
            expression = factory.create(constParser.expressionFunctionCall, tokens, i);
            i = expression.end;
        // Regroupement de commentaire
        } else if (tokens[i].type == constTokens.symboleComment) {
            expression = factory.create(constParser.expressionCommentNumber, tokens, i);
            i = expression.end;
        }
        

        if (expression) {
            AST.push(expression);
        } else {
            AST.push(tokens[i]);
        }
    }
    return AST;
}