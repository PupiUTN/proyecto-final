/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package app.controllers;

import app.models.entities.Cuidador;
import app.models.entities.Servicio;
import app.services.CuidadorService;
import app.services.ServicioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping(value = "/api/servicios/")
public class ServiciosController {
    @Autowired
    private ServicioService servicioService;

    @RequestMapping(method = RequestMethod.GET)
    public List<Servicio> getCuidadores() throws Exception {
        return servicioService.getServicios();
    }

}
