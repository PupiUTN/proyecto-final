/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package app.controllers;

import app.models.entities.Perro;
import app.services.PerroService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@RequestMapping(value = "/api/perros")
public class PerroController {
    @Autowired
    PerroService perroService;

    public PerroController() {
    }

    @RequestMapping(method = RequestMethod.POST)
    public void createPerro(@RequestBody Perro entity) throws Exception {
        perroService.createPerro(entity);
    }

    @RequestMapping(method = RequestMethod.GET)
    public List<Perro> getPerros() throws Exception {
        return perroService.getPerros();
    }

}
