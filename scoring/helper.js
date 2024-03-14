const { forEach } = require("lodash");

 exports.allDeclaredIsUsed = (ast)=> {
    const declaredVariables = new Set();
    const usedVariables = new Set();

    for (const node of ast) {
        if (node.type === 'variableDeclaration') {
            declaredVariables.add(node.variableName);
        } else if (node.type === 'variableAffectation') {
            usedVariables.add(node.variableName);
        }
    }

    if (declaredVariables.size === 0) {
        return 0;
    } else {
        const score = Math.round(Math.min(10, Math.max(0, 10 * usedVariables.size / declaredVariables.size)) * 100) / 100;
        return score;
    }
}



// // Exemple d'utilisation
// const pythonCode = `
// x = 10
// y = 20
// print(x)
// `;

// console.log(allDeclaredAreUsed(pythonCode)); // true, toutes les variables déclarées sont utilisées


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
    
    return nb;
}