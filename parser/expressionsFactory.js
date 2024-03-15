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

        case constParser.expressionIndent:
            return expressionIndent(tokens, start);
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
    if(tokens[start+1].type==constTokens.typeNumber ){
        variableValue = tokens[start+1];
        tokens[start-1].type = constTokens.typeVariable;

    } else if(tokens[start+1].type==constTokens.symboleQuotationMark){
        variableValue= helper.searchString(tokens, start+1);
        tokens[start-1].type = constTokens.typeVariable;
        
    } else if (tokens[start+1].type==constTokens.booleanValues.indexOf(tokens[start+1].value) != -1){
        variableValue = tokens[start+1];
        tokens[start-1].type = constTokens.typeVariable;

    }
    return {type: constParser.expressionAffectation, variableName: variableName, variableValue: variableValue};
}

function functionDeclaration(tokens, start){
    if(tokens[start+1].type != constTokens.typeWord) throw constParser.errorMissingWord;
    let functionName = tokens[start+1].value;
    let functionTypeHint = null; 

    if(tokens[start+2].type != constTokens.symboleOpenParenthese) throw constParser.errorMissingOpenParenthesis;

    let arguments = helper.searchArgs(tokens, start+2);
    startAndArg = start + 2*arguments.args.length -1;

    if(tokens[startAndArg+3].type != constTokens.symboleCloseParenthese) throw constParser.errorMissingCloseParenthesis;

    if(tokens[startAndArg+4].type == constTokens.typeTypeHint)
    {
        if(tokens[startAndArg+5].type != constTokens.typeWord) throw constParser.errorMissingWord;
    
        functionTypeHint = tokens[startAndArg+5].value;

        if(tokens[startAndArg+6].type != constTokens.symboleColon) throw constParser.errorMissingColon;

        tokenEnd = startAndArg+6;
    }
    else
    {
        if(tokens[startAndArg+4].type != constTokens.symboleColon) throw constParser.errorMissingColon;

        tokenEnd = startAndArg+4;
    }

    console.log("Token end: " + tokenEnd + ", Start: " + start)
    return {type: constParser.expressionFunctionDeclaration, functionName: functionName, functionTypeInt: functionTypeHint, functionArgs : arguments.args, start:start, end: tokenEnd};
}


function expressionIndent(tokens, start)
{
    let i = 1;
    while (tokens[start+i].type == constTokens.typeIndent) { i++ }

    return {type: constParser.expressionIndent, quantity: i, start:start, end:start+i-1}
}