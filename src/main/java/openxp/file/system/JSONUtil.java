package openxp.file.system;

import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * Created by rbrastad on 19.10.17.
 */
public class JSONUtil {

    private ObjectMapper mapper = new ObjectMapper();

    public String toJson( Object object ) throws  Exception{
        return mapper.writeValueAsString( object );
    }

}
