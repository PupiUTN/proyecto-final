
package app.controllers;

import app.models.entities.Raza;
import app.services.RazaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import javax.websocket.server.PathParam;
import java.util.List;

@RestController
@RequestMapping(value = "api/razas")
public class RazaController {


    RazaService razaService;

    @Autowired
    public RazaController(RazaService razaService) {
        this.razaService = razaService;
    }

    @RequestMapping(method = RequestMethod.GET)
    public List<Raza> getRazas() throws Exception {
        return razaService.getRazas();
    }

    @RequestMapping(method = RequestMethod.POST)
    public void createRaza(@RequestBody Raza entity) throws Exception {
        razaService.createRaza(entity);
    }

    @RequestMapping(value = "{id}", method = RequestMethod.GET)
    public Raza getRaza(@PathParam("id") Long id) throws Exception {
        return razaService.getRaza(id);
    }

    @RequestMapping(method = RequestMethod.DELETE)
    public void deleteRaza(@RequestParam("id") Long id) throws Exception {
        razaService.deleteRaza(id);
    }

    @RequestMapping(method = RequestMethod.PUT )
    public void editRaza(@RequestBody Raza entity) throws Exception {
        razaService.editRaza(entity);
    }
}
