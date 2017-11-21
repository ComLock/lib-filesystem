var assert = require("/lib/xp/assert");
var fsLib = require("/lib/openxp/file-system");
var ioLib = require("/lib/xp/io");
var textEncodingLib = require("/lib/text-encoding");


var fileContent = {
  name: "name"
};

var fileSource = {
  exists: true,
  name: "TestFileSystem.json",
  length: 15,
  isFile: true,
  isDirectory: false,
  isHidden: false
};

exports.test = function() {
  mkDir();
  writeTestFile();
  readTestFile();
  getTestFileSourceContent();
  getTestFileSourceContentCharsetDecode();
  getTestFileSourceContentCharsetDecoded();
  isFileTest();
  isDirectoryTest();
  isHiddenTest();
  existsTest();
  lengthTest();
  moveTest();
  loopFilesInDir();
  deleteIfExistsTest();
  deleteIfExistsDirTest();
};

var filesTmpTestDirectory = "build/tmpTest/";
var fileNewName = filesTmpTestDirectory + "TestFileSystemMoved.json";
var fileName = filesTmpTestDirectory + fileSource.name;


function mkDir() {
    var created =fsLib.mkDir( filesTmpTestDirectory );

    assert.assertEquals( true , created);
}


function writeTestFile() {
  var created = fsLib.writeFile(
    fileName,
    ioLib.newStream(JSON.stringify(fileContent))
  );

  delete created.absolutePath;
  delete created.lastModified;

  assert.assertJsonEquals(fileSource, created);
}

function readTestFile() {
  var fileSourceResponse = fsLib.readFile( fileName );

  delete fileSourceResponse.absolutePath;
  delete fileSourceResponse.lastModified;

  assert.assertJsonEquals(fileSource, fileSourceResponse);
}

function getTestFileSourceContent() {
  var fileSourceResponse = fsLib.getContent({
    absolutePath: fileName
  });

  var content = textEncodingLib.charsetDecode(fileSourceResponse, "UTF-8");

  assert.assertJsonEquals(fileContent, JSON.parse(content));
}


function getTestFileSourceContentCharsetDecoded() {
    var content = fsLib.getContentCharsetDecoded({
        absolutePath: fileName
    });

    assert.assertJsonEquals(fileContent, JSON.parse(content));
}


function getTestFileSourceContentCharsetDecode() {
  var charsetDecode = true;
  var content = fsLib.getContent(
    {
      absolutePath: fileName
    },
    charsetDecode
  );

  assert.assertJsonEquals(fileContent, JSON.parse(content));
}

function isFileTest() {
  var fileSourceResponse = fsLib.readFile(fileName);

  assert.assertEquals(true, fileSourceResponse.isFile);
}

function isDirectoryTest() {
  var fileSourceResponse = fsLib.readFile(fileName);

  assert.assertEquals(false, fileSourceResponse.isDirectory);
}

function isHiddenTest() {
  var fileSourceResponse = fsLib.readFile(fileName);

  assert.assertEquals(false, fileSourceResponse.isHidden);
}

function existsTest() {
  var fileSourceResponse = fsLib.readFile(fileName);

  assert.assertEquals(true, fileSourceResponse.exists);
}

function lengthTest() {
  var fileSourceResponse = fsLib.readFile(fileName);

  assert.assertEquals(fileSource.length, fileSourceResponse.length);
}

function moveTest() {
    var fileSourceResponse = fsLib.readFile(fileName);

    var movedFileSourceResponse = fsLib.move(fileSourceResponse.absolutePath, fileNewName);
    var contentEncoded = fsLib.getContent( movedFileSourceResponse );
    var content = textEncodingLib.charsetDecode(contentEncoded, "UTF-8");

    assert.assertJsonEquals( fileContent , JSON.parse( content ) );
}


function loopFilesInDir(){
    var files = fsLib.filesInDirectory( filesTmpTestDirectory );
    files.forEach( function( file ){
        var exists = false;
        if(file){
            exists = true;
        }

        assert.assertEquals( true, exists );
    });
}


function deleteIfExistsTest() {
    var deleted =  fsLib.deleteIfExists( fileNewName  );
    assert.assertEquals( true, deleted );
}


function deleteIfExistsDirTest() {
    var deleted =  fsLib.deleteIfExists( filesTmpTestDirectory  );
    assert.assertEquals( true, deleted );
}

