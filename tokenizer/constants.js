// Liste des caractères spéciaux
exports.specialChars = {
    newLine:            { regRule: /\r\n/g, value: '\n' },
    //endInstruct:        { regRule: /;/g, value: ';' },
    equal:              { regRule: /=/g, value: '=' },
    point:              { regRule: /\./g, value: '.' },
    virgule:            { regRule: /\,/g, value: ',' },
    quotationMark:      { regRule: /[\"']/g, value: '"' },
    openParenthese:     { regRule: /\(/g, value: '"' },
    closeParenthese:    { regRule: /\)/g, value: '"' },
    indent:             { regRule: /    /g, value: '    ' },
    typeHint:           { regRule: /->/g, value: '->'},
    colon:              { regRule: /:/g, value: ':'}, 
    comment:            { regRule: /#/g, value: '#'}
};

exports.symboleComment = "comment";
exports.symboleEqual = "equal";
exports.symbolePoint = "point";
exports.symboleColon = "colon";
exports.symboleVirgule = "virgule";
exports.symboleQuotationMark = "quotationMark";
exports.symboleOpenParenthese = "openParenthese";
exports.symboleCloseParenthese = "closeParenthese";
exports.tokensNewLine = "newLine";

exports.typeNumber = "number";
exports.typeWord = "word";
exports.typeTypeHint= 'typeHint';
exports.typeIndent= 'indent';



exports.errorNoTokenFound = 'No Tokens Found.';

