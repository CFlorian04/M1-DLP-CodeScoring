const constTokens= require("./constants");

exports.checkChars= (t)=>{
    for (const charName in constTokens.specialChars) {
        if(t=='*'+charName+'*'){
            return charName;
        }
    }
    return false;
}

exports.isBoolean = (val)=>{
    return constTokens.booleanValues.indexOf(val) != -1
}

exports.replaceSpecialsChars= (code)=>{
    for (const charName in constTokens.specialChars) {
        const element = constTokens.specialChars[charName];
        if (element != constTokens.specialChars.boolean){
            code= code.replace(element.regRule, ' *'+charName+'* ');
        }
        
    }
    return code;
}