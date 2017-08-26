/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package app.controllers;

import app.models.entities.Perro;
import app.services.PerroService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api/user/{idUser}/perros")
public class PerroUserController {
    @Autowired
    PerroService perroService;

    public PerroUserController() {
    }

    @RequestMapping(method = RequestMethod.POST)
    public void createPerro(@RequestBody Perro entity) throws Exception {
        perroService.createPerro(entity);
    }

    @RequestMapping(method = RequestMethod.GET)
    public List<Perro> getPerros(@PathVariable("idUser") Long id) throws Exception {
        return perroService.getPerrosByUserId(id);
    }

}
