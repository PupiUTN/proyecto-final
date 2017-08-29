/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package app.controllers;

import app.models.entities.Reserva;
import app.services.ReservaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api/user/{idUser}/reservas")
public class ReservaUserController {


    private final ReservaService reservaService;

    @Autowired
    public ReservaUserController(ReservaService reservaService) {
        this.reservaService = reservaService;
    }


    @RequestMapping(method = RequestMethod.POST)
    public Reserva post(@PathVariable("idUser") Long id, @RequestBody Reserva entity) throws Exception {
        return reservaService.save(entity);

    }

    @RequestMapping(method = RequestMethod.GET)
    public List<Reserva> get(@PathVariable("idUser") Long id) throws Exception {
        return reservaService.getPerrosByUserId(id);
    }


}
