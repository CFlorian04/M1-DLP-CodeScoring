const constTokens= require("../tokenizer/constants");
const constParser= require("./constants");
const helper= require("./helper");

exports.create= (type, tokens, start)=>{
    switch(type){
        case constParser.expressionMethodCall:
            return objectMethodCall(tokens, start);
        case constParser.expressionDeclaration:
                return variableDeclaration(tokens, start);
        case constParser.expressionAffectation:
            return variableAffectation(tokens, start);
        case constParser.expressionFunctionDeclaration:
            return functionDeclaration(tokens, start);
    }
}

function objectMethodCall(tokens, start){
    let objectName = tokens[start].value;
    if(tokens[start+2].type != constTokens.typeWord) throw constParser.errorMissingWord;
    let methodName = tokens[start+2].value;
    let arguments = helper.searchArgs(tokens, start+3);
    return {type: constParser.expressionMethodCall, objectName: objectName, methodName:methodName, arguments: arguments.args, end: arguments.end};
}

function variableDeclaration(tokens, start){
    if(tokens[start+1].type != constTokens.typeWord) throw constParser.errorMissingWord;
    let variableName= tokens[start+1].value;
    return {type: constParser.expressionDeclaration, variableName: variableName};
}

function variableAffectation(tokens, start){
    if(tokens[start-1].type != constTokens.typeWord) throw constParser.errorMissingWord;
    let variableName= tokens[start-1].value;
    let variableValue= null;
    if(tokens[start+1].type==constTokens.typeNumber){
        variableValue= tokens[start+1];
    }else if(tokens[start+1].type==constTokens.symboleQuotationMark){
        variableValue= helper.searchString(tokens, start+1);
    }
    return {type: constParser.expressionAffectation, variableName: variableName, variableValue: variableValue};
}

function functionDeclaration(tokens, start){
    if(tokens[start+1].type != constTokens.typeWord) throw constParser.errorMissingWord;
    let functionName = tokens[start+1].value;
    let functionTypeInt = null; 

    if(tokens[start+2].type != constTokens.symboleOpenParenthese) throw constParser.errorMissingOpenParenthesis;

    let arguments = helper.searchArgs(tokens, start+2);
    nbArg = 2*arguments.args.length -1;

    if(tokens[start+nbArg+3].type != constTokens.symboleCloseParenthese) throw constParser.errorMissingCloseParenthesis;

    console.log("Hint", tokens[start+nbArg+4].type);
    if(tokens[start+nbArg+4].type == constTokens.typeTypeHint)
    {
        if(tokens[start+nbArg+5].type != constTokens.typeWord) throw constParser.errorMissingWord;
    
        functionTypeInt = tokens[start+nbArg+5].value;
    }

    if(tokens[start+nbArg+6].type != constTokens.symboleColon) throw constParser

    return {type: constParser.expressionFunctionDeclaration, functionName: functionName, functionTypeInt: functionTypeInt, functionArgs : arguments.args, end: start+nbArg+6};
}