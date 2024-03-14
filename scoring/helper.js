const { forEach } = require("lodash");

exports.allDeclaredIsUsed = (ast) => {
    return 1;
}

exports.allUsedIsDeclared = (ast) => {
    return 1;
}

exports.allExpressionFinished = (ast) => {
    return 1;
}

exports.indentation = (ast) => {
    return 1;
}

exports.numberLine = (ast) => {
    
    let nb = 1;
    ast.forEach((e) => { 
        if (e.type == 'newLine') {
            nb++; 
        }
    });
    
    return nb <= 200 ? 1 : 0;
}