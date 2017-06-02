package app.controlador.UnitTest;

import app.modelo.soporte.FileJson;
import app.persistencia.CuidadorDAO;
import app.servicio.StorageService;
import org.hamcrest.Matchers;
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
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Stream;

import static org.mockito.BDDMockito.given;
import static org.mockito.BDDMockito.then;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.fileUpload;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;


@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
public class FileRestTest{

    protected Logger logger = LoggerFactory.getLogger(this.getClass());


    @Autowired
    private MockMvc mockMvc;

    @MockBean //no entiendo porque tengo que mockear el dao TODO
    private CuidadorDAO mockCuidadorDAO;
    @MockBean
    private StorageService storageService;

    @Test
    public void shouldListAllFiles() throws Exception {
        List<FileJson> result = new ArrayList<>(2);
        result.add(new FileJson(FileJson.FILE, "http://localhost/files_upload/first.txt"));
        result.add(new FileJson(FileJson.FILE, "http://localhost/files_upload/second.txt"));

        given(this.storageService.loadAll()).willReturn(result);

        ResultActions perform = this.mockMvc.perform(get("/api/file/"));
        perform.andExpect(status().isOk());
        perform.andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON));
    }

    @Test
    public void shouldSaveUploadedFile() throws Exception {
        MockMultipartFile multipartFile =
                new MockMultipartFile("file", "test.txt", "text/plain", "Spring Framework".getBytes());

        given(this.storageService.store(multipartFile)).willReturn("http://localhost/files_upload/test.txt");

        ResultActions perform = this.mockMvc.perform(fileUpload("/api/file/").file(multipartFile));
        perform.andExpect(status().isOk());
        perform.andExpect(content().string("http://localhost/files_upload/test.txt"));

        then(this.storageService).should().store(multipartFile);
    }


    @Test
    public void should400WhenMissingFile() throws Exception {
        ResultActions perform = this.mockMvc.perform(fileUpload("/api/file/"));
        perform.andExpect(status().isBadRequest());

    }





}
