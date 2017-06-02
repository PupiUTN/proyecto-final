package app.controlador.UnitTest;

import app.modelo.entidades.Cuidador;
import app.modelo.entidades.Imagen;
import app.modelo.soporte.FileJson;
import app.persistencia.CuidadorDAO;
import app.servicio.StorageService;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import com.fasterxml.jackson.databind.SerializationFeature;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

import static org.mockito.BDDMockito.given;
import static org.mockito.BDDMockito.then;
import static org.mockito.Matchers.any;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.fileUpload;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
public class CuidadorRestTest {

    protected Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    private MockMvc mockMvc;


    @MockBean
    private CuidadorDAO mockCuidadorDAO;

    @Test
    public void cuidadorConTodosLosCamposRequeridos() throws Exception {
        Cuidador cuidador = new Cuidador();
        cuidador.setEmail("jose@gmail.com");
        cuidador.setTelefono(256658);
        cuidador.setNombre("jose");
        //... more
        ObjectMapper mapper = new ObjectMapper();
        mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, false);
        ObjectWriter ow = mapper.writer().withDefaultPrettyPrinter();
        String requestJson=ow.writeValueAsString(cuidador);
        //request
        ResultActions perform = this.mockMvc.perform(post("/api/cuidadores/").contentType(
                MediaType.APPLICATION_JSON).content(requestJson));
        //RESULT
        perform.andExpect(status().isOk());
        verify(mockCuidadorDAO,times(1)).create(any());
    }

    @Test
    public void cuidadorSinNombre() throws Exception {
        Cuidador cuidador = new Cuidador();
        cuidador.setEmail("jose@gmail.com");
        cuidador.setTelefono(256658);
        //... more
        ObjectMapper mapper = new ObjectMapper();
        mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, false);
        ObjectWriter ow = mapper.writer().withDefaultPrettyPrinter();
        String requestJson=ow.writeValueAsString(cuidador);
        //request
        ResultActions perform = this.mockMvc.perform(post("/api/cuidadores/").contentType(
                MediaType.APPLICATION_JSON).content(requestJson));
        //RESULT
        perform.andExpect(status().isUnsupportedMediaType());
        perform.andExpect(content().string("El nombre es requerido"));

    }

    @Test
    public void cuidadorSinEmail() throws Exception {
        Cuidador cuidador = new Cuidador();
        cuidador.setNombre("jose");
        cuidador.setTelefono(256658);
        //... more
        ObjectMapper mapper = new ObjectMapper();
        mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, false);
        ObjectWriter ow = mapper.writer().withDefaultPrettyPrinter();
        String requestJson=ow.writeValueAsString(cuidador);
        //request
        ResultActions perform = this.mockMvc.perform(post("/api/cuidadores/").contentType(
                MediaType.APPLICATION_JSON).content(requestJson));
        //RESULT
        perform.andExpect(status().isUnsupportedMediaType());
        perform.andExpect(content().string("El email es requerido"));

    }

    @Test
    public void cuidadorSinTelefono() throws Exception {
        Cuidador cuidador = new Cuidador();
        cuidador.setNombre("jose");
        cuidador.setEmail("jose@gmail.com");
        //... more
        ObjectMapper mapper = new ObjectMapper();
        mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, false);
        ObjectWriter ow = mapper.writer().withDefaultPrettyPrinter();
        String requestJson=ow.writeValueAsString(cuidador);
        //request
        ResultActions perform = this.mockMvc.perform(post("/api/cuidadores/").contentType(
                MediaType.APPLICATION_JSON).content(requestJson));
        //RESULT
        perform.andExpect(status().isUnsupportedMediaType());
        perform.andExpect(content().string("El telefono es requerido"));

    }

    @Test
    public void cuidadorConMasDe4Imagenes() throws Exception {
        List<Imagen> imagenList = new LinkedList<>();

        for (int i = 0; i < 6; i++) {
            Imagen imagen = new Imagen();
            imagen.setId(1l);
            imagenList.add(imagen);
        }
        Cuidador cuidador = new Cuidador();
        cuidador.setEmail("jose@gmail.com");
        cuidador.setTelefono(256658);
        cuidador.setNombre("jose");
        cuidador.setListaImagenes(imagenList);
        //... more
        ObjectMapper mapper = new ObjectMapper();
        mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, false);
        ObjectWriter ow = mapper.writer().withDefaultPrettyPrinter();
        String requestJson=ow.writeValueAsString(cuidador);
        //request
        ResultActions perform = this.mockMvc.perform(post("/api/cuidadores/").contentType(
                MediaType.APPLICATION_JSON).content(requestJson));
        //RESULT
        perform.andExpect(status().isUnsupportedMediaType());
        perform.andExpect(content().string("El maximo de imagenes es 4"));
    }






}
