var fileSystemBean =  __.newBean("no.rbrastad.file.system.FileSystem");
var jsonUtilBean =  __.newBean("no.rbrastad.file.system.JSONUtil");
var textEncodingLib = require('/lib/text-encoding');

exports.readFile = function( filePathAndName ) {
    try{
        var fileSource = __.toNativeObject( fileSystemBean.getFileSource( filePathAndName ) );
        return JSON.parse(  jsonUtilBean.toJson(fileSource) );
    }catch (e){
        log.error(e);
        return e;
    }
};

exports.isFile = function() {
    try{
        return __.toNativeObject( fileSystemBean.isFile() );
    }catch (e){
        log.error(e);
        return e;
    }
};


exports.isDirectory = function() {
    try{
        return __.toNativeObject( fileSystemBean.isDirectory() );
    }catch (e){
        log.error(e);
        return e;
    }
};


exports.isHidden = function() {
    try{
        return __.toNativeObject( fileSystemBean.isHidden() );
    }catch (e){
        log.error(e);
        return e;
    }
};


exports.exists = function() {
    try{
        return __.toNativeObject( fileSystemBean.exists() );
    }catch (e){
        log.error(e);
        return e;
    }
};

exports.mkDir = function( newDirectory ) {
    try{
        return __.toNativeObject( fileSystemBean.mkDir( newDirectory ) );
    }catch (e){
        log.error(e);
        return e;
    }
};



exports.lastModified = function() {
    try{
        return __.toNativeObject( fileSystemBean.getLastModified() );
    }catch (e){
        log.error(e);
        return e;
    }
};


exports.length = function() {
    try{
        return __.toNativeObject( fileSystemBean.getLength() );
    }catch (e){
        log.error(e);
        return e;
    }
};

exports.fileSource = function( filePathAndName ) {
    try{
        return __.toNativeObject( fileSystemBean.getFileSource( filePathAndName ) );
    }catch (e){
        log.error(e);
        return e;
    }
};


exports.getContent = function( fileSource, charsetDecode, encoding ) {
    try{
        var content =  __.toNativeObject(  fileSystemBean.getFileSourceWithContent( fileSource.absolutePath ) ).content;

        if( encoding == undefined ){
            encoding = "UTF-8";
        }

        if(charsetDecode != undefined && charsetDecode === true){
            content = textEncodingLib.charsetDecode(content, encoding);
        }

        return content;
    }catch (e){
        log.error(e);
        return e;
    }
};

exports.filesInDirectory = function( filePath ) {
    try{
        if(filePath == undefined)
            filePath = null;

        var files = __.toNativeObject( fileSystemBean.getFilesInDirectory( filePath ) );

        return JSON.parse(  jsonUtilBean.toJson(files) );
    }catch (e){
        log.error(e);
        return e;
    }
};

exports.deleteIfExists = function( filePath ) {
    try{
        if(filePath == undefined)
            filePath = null;

        return __.toNativeObject( fileSystemBean.deleteFileIfExists( filePath ) );
    }catch (e){
        log.error(e);
        return e;
    }
};

exports.move = function( sourceFilePathAndName, targetFilePathAndName ) {
    try {
        fileSystemBean.move(sourceFilePathAndName, targetFilePathAndName);
        return exports.readFile( targetFilePathAndName );
    }catch (e){
        log.error(e);
        return e;
    }
};

exports.writeFile = function( targetFilePathAndName, bytes ) {
    try {
        var fileSource = __.toNativeObject(fileSystemBean.writeFile( targetFilePathAndName, bytes ));
        return JSON.parse(  jsonUtilBean.toJson(fileSource) );
    }catch (e){
        log.error(e);
        return e;
    }
};
