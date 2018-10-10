/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package app.controllers;

import app.models.entities.CalendarioCuidador;
import app.models.entities.Cuidador;
import app.security.MyUserPrincipal;
import app.services.CalendarioCuidadorService;
import org.springframework.beans.factory.annotation.Autowired;
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


    @RequestMapping(value = "{id}", method = RequestMethod.GET)
    public List<CalendarioCuidador> getCalendarioCuidador(@PathVariable("id") Long id) {
        Cuidador cuidador = new Cuidador();
        cuidador.setId(id);
        return calendarioCuidadorService.findAllByCuidadorFromToday(cuidador);
    }

    @RequestMapping(method = RequestMethod.POST)
    @PreAuthorize("hasAuthority('ROLE_CUIDADOR')")
    public List<CalendarioCuidador> postCalendarioCuidador(@RequestBody List<CalendarioCuidador> entityList) {
        return calendarioCuidadorService.save(entityList);
    }

    @RequestMapping(value = "{id}", method = RequestMethod.DELETE)
    @PreAuthorize("hasAuthority('ROLE_CUIDADOR')")
    public void deleteCalendarioCuidador(@PathVariable("id") Long id) {
        calendarioCuidadorService.delete(id);
    }
}
