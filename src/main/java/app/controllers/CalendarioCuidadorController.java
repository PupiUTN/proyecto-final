/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package app.controllers;

import app.models.entities.CalendarioCuidador;
import app.models.entities.Cuidador;
import app.models.entities.Servicio;
import app.security.MyUserPrincipal;
import app.services.CalendarioCuidadorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import java.time.format.DateTimeFormatter;
import java.util.List;

@RestController
@RequestMapping(value = "/api/cuidadores/calendario")
public class CalendarioCuidadorController {


    private final CalendarioCuidadorService calendarioCuidadorService;
    private final DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");

    @Autowired
    public CalendarioCuidadorController(CalendarioCuidadorService calendarioCuidadorService) {
        this.calendarioCuidadorService = calendarioCuidadorService;
    }


    @RequestMapping(method = RequestMethod.GET)
    @PreAuthorize("hasAuthority('ROLE_CUIDADOR')")
    public List<CalendarioCuidador> getCalendario(){
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext()
                .getAuthentication()
                .getPrincipal();
        MyUserPrincipal myUserPrincipal = (MyUserPrincipal) userDetails;
        Cuidador cuidador = new Cuidador();
        Long id = myUserPrincipal.getUser().getId();
        cuidador.setId(id);
        return calendarioCuidadorService.getCalendarios(cuidador);
    }
}
