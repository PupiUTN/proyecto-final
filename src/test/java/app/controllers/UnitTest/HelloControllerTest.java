package app.controllers.UnitTest;

import static org.hamcrest.Matchers.equalTo;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import app.persistence.*;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
public class HelloControllerTest {

    @Autowired
    private MockMvc mvc;

    @MockBean //no entiendo porque tengo que mockear el dao TODO
    private CuidadorDAO mockCuidadorDAO;
    @MockBean
    private CalificacionDAO mockCalificacionDAO;
    @MockBean
    private DireccionDAO mockDireccionDAO;
    @MockBean
    private DueñoDAO mockDueñoDAO;
    @MockBean
    private LocalidadDAO mockLocalidadDAO;
    @MockBean
    private PerroDAO mockPerroDAO;
    @MockBean
    private ProvinciaDAO mockProvinciaDAO;
    @MockBean
    private RazaDAO mockRazaDAO;
    @MockBean
    private ReservaDAO mockReservaDAO;
    @MockBean
    private TamañoDAO mockTamañoDAO;
    @MockBean
    private VacunaDAO mockVacunaDAO;

    @Test
    public void getHello() throws Exception {
        mvc.perform(MockMvcRequestBuilders.get("/api/hello").accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().string(equalTo("Greetings from Spring Boot!")));
    }
}
