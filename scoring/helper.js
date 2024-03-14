const { forEach } = require("lodash");

// À voir : règles de score et notation du score


// Règle : toutes les variables déclarées sont utilisées
exports.allDeclaredIsUsed = (ast) => {
    return 1;
}

// Règle : toutes les variables utilisées sont déclarées
exports.allUsedIsDeclared = (ast) => {
    return 1;
}

// Règle : toutes les expression sont fini ???
exports.allExpressionFinished = (ast) => {
    return 1;
}

// Règle : respect de l'indentation
exports.indentation = (ast) => {
    return 1;
}

// Règle : le nombre de ligne doit être inférieur à maxLines
exports.numberLine = (ast) => {
    let maxLines = 200
    let nbLines = 1;
    ast.forEach((e) => { 
        if (e.type == 'newLine') {
            nbLines++; 
        }
    });
    
    return maxLines > nbLines ? 1 : 0;
}