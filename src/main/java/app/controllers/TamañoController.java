/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package app.controllers;

import app.models.entities.Tamaño;
import app.services.TamañoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
@RequestMapping(value = "/api/tamaños")
public class TamañoController {

    private final TamañoService tamañoService;

    @Autowired
    public TamañoController(TamañoService tamañoService) {
        this.tamañoService = tamañoService;
    }

    @RequestMapping(method = RequestMethod.GET)
    public List<Tamaño> getTamaños() {
        return tamañoService.getTamaños();
    }


}
