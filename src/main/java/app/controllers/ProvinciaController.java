/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package app.controllers;


import app.models.entities.Localidad;
import app.models.entities.Provincia;
import app.services.ProvinciaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;


import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@RestController
@RequestMapping(value = "/api/provincias")
public class ProvinciaController {
    @Autowired
    ProvinciaService provinciaService;

    public ProvinciaController() {
    }

    @RequestMapping(method = RequestMethod.GET)
    public List<Provincia> getProvincias() throws Exception {
        return provinciaService.getProvincias();
    }

    @RequestMapping(value = "{id}/localidades", method = RequestMethod.GET)
    public List<Localidad> getLocalidades(@PathVariable("id") Long id) throws Exception {
        return provinciaService.getLocalidades(id);
    }
}
