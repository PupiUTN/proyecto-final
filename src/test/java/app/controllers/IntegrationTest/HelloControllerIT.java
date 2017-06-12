package app.controllers.IntegrationTest;

import static org.hamcrest.Matchers.equalTo;
import static org.junit.Assert.assertThat;

import java.net.URL;

import app.models.entities.Reserva;
import app.persistence.*;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.embedded.LocalServerPort;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class HelloControllerIT {

    @LocalServerPort
    private int port;

    private URL base;

    @Autowired
    private TestRestTemplate template;

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

    @Before
    public void setUp() throws Exception {
        this.base = new URL("http://localhost:" + port + "/api/hello");
    }

    @Test
    public void getHello() throws Exception {
        ResponseEntity<String> response = template.getForEntity(base.toString(),
                String.class);
        assertThat(response.getBody(), equalTo("Greetings from Spring Boot!"));
    }
}
