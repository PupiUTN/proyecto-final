/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package app.controllers;

import app.models.entities.Reserva;
import app.security.MyUserPrincipal;
import app.services.MailService;
import app.services.ReservaService;
import app.utils.MailType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api/reservas")
public class ReservaController {


    private final ReservaService reservaService;


    @Autowired
    public ReservaController(ReservaService reservaService) {
        this.reservaService = reservaService;
    }


    @RequestMapping(value = "/fromToday/" , method = RequestMethod.GET)
    public List<Reserva> getReservasByCuidadorIdAndStatusFromTodaySinJoin(@RequestParam("idCuidador") Long idCuidador,@RequestParam("status") List<String> statusList) throws Exception {
        return reservaService.getReservasByCuidadorIdAndStatusFromTodaySinJoin(idCuidador, statusList);
    }



}
