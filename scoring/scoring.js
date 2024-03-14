const tokenizer = require("../tokenizer/tokenizer");
const parser = require("../parser/parser");
const helper = require("./helper");

exports.from = (code) => {
    console.log("--------", "Tokens", "--------");
    let tokens = tokenizer(code);
    console.log(tokens);

    try {
        console.log("--------", "AST", "--------");
        let ast = parser(tokens);
        console.log(ast);
        
        // Initialise result avec un objet vide
        let result = {
            details: {}
        };

        // Appelez les fonctions de helper.js pour remplir result.details
        result.details.allDeclaredIsUsed = helper.allDeclaredIsUsed(ast);
        result.details.allUsedIsDeclared = helper.allUsedIsDeclared(tokens, ast);
        result.details.allExpressionFinished = helper.allExpressionFinished(ast);
        result.details.numberLine = helper.numberLine(ast);
        result.details.indentation = helper.indentation(ast);

        return {
            score:
                result.details.allDeclaredIsUsed + 
                result.details.allUsedIsDeclared + 
                result.details.allExpressionFinished + 
                result.details.indentation + 
                result.details.numberLine,
            details: result.details
        }
    } catch (e) {
        throw e;
    }
};
