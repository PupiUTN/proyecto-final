/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package controlador;

//Register ContextResolver<MoxyJsonConfig> to override 

import java.util.HashMap;
import java.util.Map;
import javax.ws.rs.ext.ContextResolver;
import javax.ws.rs.ext.Provider;
import org.eclipse.persistence.jaxb.JAXBContextProperties;
import org.glassfish.jersey.moxy.json.MoxyJsonConfig;

//default behavior of marshaling/un-marshaling attributes
 
@Provider
public class JsonMoxyConfigurationContextResolver implements ContextResolver<MoxyJsonConfig> 
{
 
    private final MoxyJsonConfig config;
 
    public JsonMoxyConfigurationContextResolver() 
    {
        final Map<String, String> namespacePrefixMapper = new HashMap<String, String>();
        namespacePrefixMapper.put("http://www.w3.org/2001/XMLSchema-instance", "xsi");
 
        config = new MoxyJsonConfig()
                .setNamespacePrefixMapper(namespacePrefixMapper)
                .setNamespaceSeparator(':')
                .setAttributePrefix("")
                .setValueWrapper("value")
                .property(JAXBContextProperties.JSON_WRAPPER_AS_ARRAY_NAME, true)
                .setFormattedOutput(true)
                // cabecera con el nombre de la clase
                .setIncludeRoot(false)
                .setMarshalEmptyCollections(true);
    }
 
    @Override
    public MoxyJsonConfig getContext(Class<?> objectType) 
    {
        return config;
    }
}