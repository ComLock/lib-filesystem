var assert = require('/lib/xp/assert');
var fsLib = require("/lib/rbrastad/file-system");
var ioLib = require('/lib/xp/io');
var encodingLib = require('/lib/text-encoding');

var fileContent = {
    "name": "name"
};

var fileSource = {
    "exists": true,
    "name":  "TestFileSystem.json" ,
    "length": 15,
    "isFile": true,
    "isDirectory": false,
    "isHidden": false
};


exports.test = function () {
    writeTestFile();
    readTestFile();
    getTestFileSourceContent();
    getTestFileSourceContentCharsetDecode();
};


function writeTestFile(){
    var created =  fsLib.writeFile(fileSource.name, ioLib.newStream( JSON.stringify( fileContent ) ));
    log.info("writeFile: %s" , JSON.stringify( created, null,2 ) );

    delete created.absolutePath;
    delete created.lastModified;

    assert.assertJsonEquals( fileSource , created);
}


function readTestFile() {
    var fileSourceResponse = fsLib.readFile( fileSource.name );
    log.info("readFile: %s" , JSON.stringify( fileSource, null,2 ) );

    delete fileSourceResponse.absolutePath;
    delete fileSourceResponse.lastModified;

    assert.assertJsonEquals( fileSource , fileSourceResponse);
}


function getTestFileSourceContent() {
    var fileSourceResponse = fsLib.getContent( {
        "absolutePath" : fileSource.name
    } );


    var content =  encodingLib.charsetDecode(fileSourceResponse, 'UTF-8');

    log.info("getTestFileSourceContent: %s" , content );

    assert.assertJsonEquals( fileContent , JSON.parse( content ) );
}



function getTestFileSourceContentCharsetDecode() {
    var charsetDecode = true;
    var content = fsLib.getContent( {
        "absolutePath" : fileSource.name
    }, charsetDecode );

    log.info("getTestFileSourceContentCharsetDecode: %s" , content );

    assert.assertJsonEquals( fileContent , JSON.parse( content ) );
}
