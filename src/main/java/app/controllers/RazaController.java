
package app.controllers;

import app.models.entities.Raza;
import app.services.RazaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "api/razas")
public class RazaController {

    private final RazaService razaService;

    @Autowired
    public RazaController(RazaService razaService) {
        this.razaService = razaService;
    }

    @RequestMapping(method = RequestMethod.GET)
    public List<Raza> getRazas() {
        return razaService.getRazas();
    }


    @RequestMapping(method = RequestMethod.POST)
    public Raza createRaza(@RequestBody Raza entity) {
        return razaService.createRaza(entity);
    }

    @RequestMapping(value = "{id}", method = RequestMethod.GET)
    public Raza getRaza(@PathVariable("id") Long id) {
        return razaService.getRaza(id);
    }

    @RequestMapping(value = "{id}", method = RequestMethod.DELETE)
    public void deleteRaza(@PathVariable("id") Long id) {
        razaService.deleteRaza(id);
    }

    @RequestMapping(value = "{id}", method = RequestMethod.PUT)
    public Raza editRaza(@PathVariable("id") Long id, @RequestBody Raza entity) {
        entity.setId(id);
        return razaService.editRaza(entity);
    }

}
