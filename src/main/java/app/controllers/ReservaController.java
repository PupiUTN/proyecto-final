/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package app.controllers;

import app.models.entities.Reserva;
import app.services.ReservaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/api/reservas")
public class ReservaController {


    private final ReservaService reservaService;


    @Autowired
    public ReservaController(ReservaService reservaService) {
        this.reservaService = reservaService;
    }


    @RequestMapping(value = "/fromToday/", method = RequestMethod.GET)
    public List<Reserva> getReservasByCuidadorIdAndStatusFromTodaySinJoin(@RequestParam("idCuidador") Long idCuidador, @RequestParam("status") List<String> statusList) {
        return reservaService.getReservasByCuidadorIdAndStatusFromTodaySinJoin(idCuidador, statusList);
    }


}
