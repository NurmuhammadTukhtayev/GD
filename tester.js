var mammoth = require("mammoth");
var  fs = require('fs');
mammoth.extractRawText({path: "./test/1-bob.doc"})
    .then(function(result){
        var html = result.value; 
        console.log(html)
        // The generated HTML  
        var messages = result.messages; // Any messages, such as warnings during conversion
    })
    .done();