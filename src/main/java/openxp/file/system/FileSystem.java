package openxp.file.system;

import com.google.common.io.ByteSink;
import com.google.common.io.ByteSource;
import com.google.common.io.Files;

import java.io.File;
import java.io.IOException;
import java.nio.file.NoSuchFileException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Created by rbrastad on 04.06.17.
 */
public class FileSystem {

    private File file = null;
    private FileSource fileSource = null;

    public FileSource readFile( String filePathAndName ) {
        if ( fileSource != null && filePathAndName.equals("undefined")){
            if( exists() && isFile() ){
                fileSource.setContent(Files.asByteSource(file));
            }
        }else{
            fileSource = getFileSource( filePathAndName );
            if( exists() && isFile() ){
                fileSource.setContent(Files.asByteSource(file));
            }
        }

        return fileSource;
    }

    public FileSource getFileSourceWithContent( String filePathAndName ) {
        fileSource = getFileSource( filePathAndName );
        if( exists() && isFile() ){
            fileSource.setContent(Files.asByteSource(file));
        }

        return fileSource;
    }

    public FileSource getFileSource( String filePathAndName ) {
        filePathAndName( filePathAndName );

        fileSource = new FileSource();
        if( exists() ){
            fileSource.setExists( true );
            fileSource.setName( file.getName() );
            fileSource.setAbsolutePath(file.getAbsolutePath() );
            fileSource.setLength( getLength() );
            fileSource.isFile( isFile() );
            fileSource.isDirectory( isDirectory() );
            fileSource.isHidden( isHidden() );
            fileSource.setLastModified( getLastModified() );
        }

        return fileSource;
    }

    public boolean mkDir( String newDirectory ){
        try {
            File directory = new File(newDirectory);
            if (!directory.exists()) {
               return directory.mkdirs();
            }else{
                return true;
            }
        }catch (Exception e){
            e.printStackTrace();
            return false;
        }
    }

    public boolean isFile(){
        return ( exists() && file.isFile() ) ? true : false;
    }


    public boolean isDirectory(){
        return ( exists() && file.isDirectory() ) ? true : false;
    }

    public boolean isHidden(){
        return ( exists() && file.isHidden() ) ? true : false;
    }


    public boolean exists(){
        return ( file != null && file.exists() ) ? true : false;
    }

    public Date getLastModified(){
        if ( exists()  ){
            return new Date(file.lastModified());
        }else
            return null;
    }

    public long getLength(){
        if ( file != null  ){
            return file.length();
        }else
            return 0;
    }

    public void filePathAndName( String filePathAndName ){
        file = new File(filePathAndName);
    }

    public Iterator<FileSource> getFilesInDirectory(String filePath) throws IOException {
        List<FileSource> files =  java.nio.file.Files.list( getFilePath(filePath) )
                .filter(java.nio.file.Files::isRegularFile)
                .map( path -> {
                    FileSource fileSource = new FileSource();

                    fileSource.setExists(true);
                    fileSource.isFile(true);
                    fileSource.setName( path.getFileName().toString() );
                    fileSource.setAbsolutePath( path.toAbsolutePath().toString() );

                    return fileSource;
                } )
                .collect(Collectors.toList());

        return files.iterator();
    }

    public boolean deleteFileIfExists( String filePathAndName ) throws IOException{
        return java.nio.file.Files.deleteIfExists(  getFilePath(filePathAndName) );
    }

    public FileSource move(String sourceFilePathAndName, String targetFilePathAndName ) throws IOException{
        try {
            Path movedFile = java.nio.file.Files.move(getFilePath(sourceFilePathAndName), Paths.get(targetFilePathAndName));

            return readFile( movedFile.toAbsolutePath().normalize().toString() );
        }catch (NoSuchFileException e){
            e.printStackTrace();
            return new FileSource();
        }
    }

    public FileSource writeFile(String targetfilePathAndName, ByteSource byteSource ){
        try {
            File file = new File(targetfilePathAndName);
            ByteSink sink = Files.asByteSink(file);

            sink.writeFrom( byteSource.openStream() );

            return readFile( file.getAbsolutePath() );
        }catch (IOException e){
            e.printStackTrace();
            return new FileSource();
        }
    }

    private Path getFilePath(String filePath) {
        Path path = null;
        if(filePath == null){
            path = Paths.get(file.getAbsolutePath());
        }else {
            path = Paths.get(filePath);
        }
        return path;
    }
}
