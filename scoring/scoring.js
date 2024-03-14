const tokenizer = require("../tokenizer/tokenizer");
const parser = require("../parser/parser");
const helper = require("./helper");

exports.from = (code) => {
    console.log("--------", "Tokens", "--------");
    // Création des tokens par rapport au code
    let tokens = tokenizer(code);
    console.log("Tokens length :", tokens.length, "tokens")
    console.log("Tokens :", tokens);

    try {
        console.log("--------", "AST", "--------");
        // Création de l'AST
        let ast = parser(tokens);
        console.log("AST length :", ast.length, "tokens")
        console.log("AST :", ast);

        // Calcul des scores
        let result = {
            allDeclaredIsUsed: helper.allDeclaredIsUsed(ast),
            allUsedIsDeclared: helper.allUsedIsDeclared(ast),
            allExpressionFinished: helper.allExpressionFinished(ast),
            numberLine: helper.numberLine(ast),
            indentation: helper.indentation(ast)
        };
        return {
            score:
                result.allDeclaredIsUsed + result.allUsedIsDeclared + result.allExpressionFinished + result.indentation + result.numberLine,
            details: result
        }
    } catch (e) {
        throw e;
    }
};