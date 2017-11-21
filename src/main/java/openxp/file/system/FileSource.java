package openxp.file.system;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.google.common.io.ByteSource;

import java.io.Serializable;
import java.util.Date;

/**
 * Created by rbrastad on 04.06.17.
 */
public class FileSource implements Serializable{

    private boolean exists = false;
    private String name;
    private String absolutePath;
    private long length;
    private boolean isFile = false;
    private boolean isDirectory = false;
    private boolean isHidden = false;

    @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd'T'HH:mm:ss'Z'", timezone="GMT")
    private Date lastModified = null;

    @JsonIgnore
    private ByteSource content;

    public boolean isExists() {
        return exists;
    }

    public void setExists(boolean exists) {
        this.exists = exists;
    }

    public ByteSource getContent() {
        return content;
    }

    public void setContent(ByteSource source) {
        this.content = source;
    }

    public String getName() {
        return name;
    }

    public void setName(String fileName) {
        this.name = fileName;
    }

    public String getAbsolutePath() {
        return absolutePath;
    }

    public void setAbsolutePath(String absolutePath) {
        this.absolutePath = absolutePath;
    }

    public long getLength() {
        return length;
    }

    public void setLength(long length) {
        this.length = length;
    }

    public void isFile(boolean isFile) {
        this.isFile = isFile;
    }

    public void isDirectory(boolean isDirectory) {
        this.isDirectory = isDirectory;
    }

    public void isHidden(boolean isHidden) {
        this.isHidden = isHidden;
    }

    public void setLastModified(Date lastModified) {
        this.lastModified = lastModified;
    }


    @JsonProperty(value="isFile")
    public boolean isFile() {
        return isFile;
    }

    public void setFile(boolean file) {
        isFile = file;
    }

    @JsonProperty(value="isDirectory")
    public boolean isDirectory() {
        return isDirectory;
    }

    public void setDirectory(boolean directory) {
        isDirectory = directory;
    }

    @JsonProperty(value="isHidden")
    public boolean isHidden() {
        return isHidden;
    }

    public void setHidden(boolean hidden) {
        isHidden = hidden;
    }

    public Date getLastModified() {
        return lastModified;
    }
}
