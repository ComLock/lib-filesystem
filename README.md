#lib-filesystem

A library for reading, deleting, moving and writing a file on the File
System using Enonic XP.

Usage
=====

To install this library you need to update your build.gradle file.

Gradle build script
-------------------

    repositories {
        maven {
          url 'https://dl.bintray.com/openxp/public'
        }
    }

    dependencies {
         include 'openxp.lib.filesystem:0.9.6'
    }

Documentation
=============

You can then use this inside your javascript controller or other parts
of your app.

    // Include the library
    var fsLib = require("/lib/openxp/file-system");

    // ____readFile ____
    // Get file.
    var file = fsLib.readFile( fileAbsolutePathName );

    // ____ exists ____
    // Check if file exists
    var exists = file.exists;

    // ____ isFile ____
    // Check if path is a file
    var isFile = file.isFile;

    // ____ isDirectory ____
    // Check if path is a directory
    var isDirectory = file.isDirectory;

    // ____ isHidden ____
    // Check if file is hidden
    var isHidden = file.isHidden;

    // ____ lastModified ____
    // file lastModified date
    var lastModified = file.lastModified;

    // ____ absolutePath ____
    // file absolutePath
    var absolutePath = file.absolutePath;

    // ____ length ____
    // file length
    var length = file.length;

    // ____ content ____
    // content = content of file in bytes
    var content = fsLib.getContent(  fileSource );

    // ____ content ____
    // content = content of files decoded as string
    // charsetDecode = decode bytes true/false
    var content = fsLib.getContent(  fileSource, charsetDecode );

    // ____ content ____
    // content = content of files decoded as string
    // charsetDecode = decode bytes true/false
    // encoding = default value is UTF-8
    var content = fsLib.getContent(  fileSource, charsetDecode, encoding );

    // ____ contentCharsetDecoded ____
    // content = content of file charset decoded
    var content = fsLib.getContentCharsetDecoded(  fileSource );

    // ____ contentCharsetDecoded ____
    // content = content of file charset decoded
    // encoding = default value is UTF-8
    var content = fsLib.getContentCharsetDecoded(  fileSource, encoding );

    // ____ deleted ____
    //  deleted= if file is deleted or not
    var deleted = fsLib.deleteIfExists( fileAbsolutePathName );

    // ____ filesInDirectory ___
    // files = array of file objects
    var files = fsLib.filesInDirectory( path );

    // ____ dirsInDirectory ___
    // files = array of file objects
    var dirs = fsLib.dirsInDirectory( path );

    // ____ moveFile ___
    // moved = is the file moved or not. (true || false)
    var moved = fsLib.move( fileAbsolutePathNameFrom, fileAbsolutePathNameTo );

    // ____ write ___
    // created = file is created from a stream ( use io lib )
    var created =  fsLib.write(fileAbsolutePathNameTo, ioLib.newStream('Hello World'));

    // ___ mkDir ___
    // created = if the directory is created or not
    var created =fsLib.mkDir( filesTmpTestDirectory );

File JSON object response example

    {
      "exists": true,
      "name": "myfile.txt",
      "absolutePath": "/home/rbrastad/Desktop/myfile.txt",
      "length": 3946,
      "lastModified": 1508227954000,
      "isDirectory": false,
      "isHidden": false,
      "isFile": true
    }

Example code usage:

    // Include the library
    var fsLib = require("/lib/openxp/file-system");

    // Set and get fileSource by path
    var file = fsLib.readFile( "<MY_FILE>" );

    if( file.exists ){
         if( file.isFile ){
             // file functions
             file.exists; // file exists. true or false
             file.name; // name of files
             file.absolutePath; // absolute path
             file.length; // length of file in bytes
             file.isFile; // is path a file
             file.isDirectory; // is path a directory
             file.isHidden; // is file hidden
             file.lastModified; // lastModified
         }
     }

Example looping files in directory

     var files = fsLib.filesInDirectory( "<MY_DIRECTORY>" );
     files.forEach( function( file ){
            log.info( "file result: %s", JSON.stringify( file, null, 2 ) );
        });

Example streaming a file to the browser as a service

    var fsLib = require("/lib/openxp/file-system");

    function handleRequest( req ) {

        //Get the file path from the request
        // !!! Never do this in PRODUCTION it will expose the server and cause serious problems...
        // EXAMPLE: http://localhost:8080/_/service/no.rbrastad.enonic.lib.file.system.example/file?path=/home/rbrastad/Pictures/2016/07/04/DSCN0498.JPG
        var fileAbsolutePathName = req.params.path

        var file = fsLib.readFile( fileAbsolutePathName );
        if(file.exists){
            // Stream the file content to the client
            return {
                body:  fsLib.getContent( file ),
                headers : {
                    "Content-Disposition": 'attachment; filename="' + file.name + '""'
                }
            };
        }else{
            return {
                status : 404,
                body: file
            };
        }

    };

    exports.get = handleRequest;

See test cases for other examples:
<https://github.com/rbrastad/lib-filesystem/blob/master/src/test/resources/lib/openxp/file-system/file-system-test.js>
