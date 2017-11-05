var assert = require("/lib/xp/assert");
var fsLib = require("/lib/rbrastad/file-system");
var ioLib = require("/lib/xp/io");
var encodingLib = require("/lib/text-encoding");

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

var newName = "TestFileSystemMoved.json";

exports.test = function() {
  writeTestFile();
  readTestFile();
  getTestFileSourceContent();
  getTestFileSourceContentCharsetDecode();
  isFileTest();
  isDirectoryTest();
  isHiddenTest();
  existsTest();
  lengthTest();
  moveTest();
};

function writeTestFile() {
  var created = fsLib.writeFile(
    fileSource.name,
    ioLib.newStream(JSON.stringify(fileContent))
  );

  delete created.absolutePath;
  delete created.lastModified;

  assert.assertJsonEquals(fileSource, created);
}

function readTestFile() {
  var fileSourceResponse = fsLib.readFile(fileSource.name);

  delete fileSourceResponse.absolutePath;
  delete fileSourceResponse.lastModified;

  assert.assertJsonEquals(fileSource, fileSourceResponse);
}

function getTestFileSourceContent() {
  var fileSourceResponse = fsLib.getContent({
    absolutePath: fileSource.name
  });

  var content = encodingLib.charsetDecode(fileSourceResponse, "UTF-8");

  assert.assertJsonEquals(fileContent, JSON.parse(content));
}

function getTestFileSourceContentCharsetDecode() {
  var charsetDecode = true;
  var content = fsLib.getContent(
    {
      absolutePath: fileSource.name
    },
    charsetDecode
  );

  assert.assertJsonEquals(fileContent, JSON.parse(content));
}

function isFileTest() {
  var fileSourceResponse = fsLib.readFile(fileSource.name);

  assert.assertEquals(true, fileSourceResponse.isFile);
}

function isDirectoryTest() {
  var fileSourceResponse = fsLib.readFile(fileSource.name);

  assert.assertEquals(false, fileSourceResponse.isDirectory);
}

function isHiddenTest() {
  var fileSourceResponse = fsLib.readFile(fileSource.name);

  assert.assertEquals(false, fileSourceResponse.isHidden);
}

function existsTest() {
  var fileSourceResponse = fsLib.readFile(fileSource.name);

  assert.assertEquals(true, fileSourceResponse.exists);
}

function existsTest() {
  var fileSourceResponse = fsLib.readFile(fileSource.name);

  assert.assertEquals(true, fileSourceResponse.exists);
}

function lengthTest() {
  var fileSourceResponse = fsLib.readFile(fileSource.name);

  assert.assertEquals(fileSource.length, fileSourceResponse.length);
}

function moveTest() {
    var fileSourceResponse = fsLib.readFile(fileSource.name);

    fileSourceResponse = fsLib.move(fileSourceResponse.name, newName);

    var fileContent = fsLib.getContent({
        absolutePath: fileSourceResponse.name
    });

    var content = encodingLib.charsetDecode(fileContent, "UTF-8");

    log.info( content)

   // assert.assertJsonEquals(fileContent, JSON.parse( content ));
}


function deleteIfExistsTest() {
    var fileSourceResponse = fsLib.readFile(fileSource.name);

    fsLib.deleteIfExists( fileSource.name  );

    assert.assertEquals(fileSource.length, fileSourceResponse.length);
}


