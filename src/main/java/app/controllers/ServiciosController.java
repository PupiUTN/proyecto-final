/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package app.controllers;

import app.models.entities.Servicio;
import app.services.ServicioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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
    public List<Servicio> getServicios() {
        return servicioService.getServicios();
    }

    @RequestMapping(method = RequestMethod.POST)
    public Servicio createServicio(@RequestBody Servicio entity) {
        return servicioService.createServicio(entity);
    }

    @RequestMapping(value = "{id}", method = RequestMethod.DELETE)
    @ResponseBody
    public void deleteServicio(@PathVariable Long id) {
        servicioService.deleteServicio(id);
    }

    @RequestMapping(value = "{id}", method = RequestMethod.PUT)
    public Servicio editServicio(@PathVariable("id") Long id, @RequestBody Servicio entity) {
        entity.setId(id);
        return servicioService.editServicio(entity);
    }

    @RequestMapping(value = "{id}", method = RequestMethod.GET)
    public Servicio getServicio(@PathVariable("id") Long id) {
        return servicioService.getServicio(id);
    }

}
