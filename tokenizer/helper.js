const constTokens= require("./constants");
const spc = '*';

//Vérifie si le caractère est un caractère spécial
exports.checkChars= (t)=>{
    for (const charName in constTokens.specialChars) {
        if(t==spc+charName+spc){
            return charName;
        }
    }
    return false;
}

//Fonction de remplacement des caractères spéciaux
exports.replaceSpecialsChars= (code)=>{
    //Pour chaque caractère spécial
    for (const charName in constTokens.specialChars) {
        // Remplacement du caractère par *caractère*
        const element = constTokens.specialChars[charName];
        code= code.replace(element.regRule, ' '+spc+charName+spc+' ');
    }
    return code;
}