/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package app.controllers;

import app.models.entities.Servicio;
import app.services.ServicioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/api/servicios/")
public class ServiciosController {
    private final ServicioService servicioService;

    @Autowired
    public ServiciosController(ServicioService servicioService) {
        this.servicioService = servicioService;
    }

    @RequestMapping(method = RequestMethod.GET)
    public List<Servicio> getCuidadores() {
        return servicioService.getServicios();
    }

}
