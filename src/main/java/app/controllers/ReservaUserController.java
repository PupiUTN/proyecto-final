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
@RequestMapping(value = "/api/user/me/reservas")
public class ReservaUserController {


    private final ReservaService reservaService;
    private final MailService mailService;

    @Autowired
    public ReservaUserController(ReservaService reservaService, MailService mailService) {
        this.reservaService = reservaService;
        this.mailService = mailService;
    }

    @PreAuthorize("isAuthenticated()")
    @RequestMapping(method = RequestMethod.POST)
    public Reserva post(@RequestBody Reserva entity) {
        //TODO setear info del cuidador asi nadie puede meter info que no es.
        mailService.sendEmail(entity.getCuidador().getUser(), MailType.BOOKING_REQUEST);
        return reservaService.save(entity);

    }
    @PreAuthorize("isAuthenticated()")
    @RequestMapping(method = RequestMethod.GET)
    public List<Reserva> get(@RequestParam("status") String status) {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        MyUserPrincipal myUserPrincipal = (MyUserPrincipal) userDetails;
        long id = myUserPrincipal.getUser().getId();
        return reservaService.getReservasByUserIdAndStatus(id,status);
    }


    @PreAuthorize("isAuthenticated()")
    @RequestMapping(method = RequestMethod.PUT, value ="{reservaId}/cancelarUsuario")
    public ResponseEntity cancelarCausaUsuario(@PathVariable Long reservaId) {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        MyUserPrincipal myUserPrincipal = (MyUserPrincipal) userDetails;
        long id = myUserPrincipal.getUser().getId();
        reservaService.cancelarCausaUsuario(reservaId,id);
        mailService.sendEmail(reservaService.getReserva(reservaId).getCuidador().getUser(), MailType.BOOKING_CANCELLATION_BY_USER);
        return new ResponseEntity(HttpStatus.OK);
    }

    @PreAuthorize("isAuthenticated()")
    @RequestMapping(value = "{id}", method = RequestMethod.GET)
    public Reserva getReserva(@PathVariable("id") Long id) {
        return reservaService.getReserva(id);
    }

    @PreAuthorize("isAuthenticated()")

    @RequestMapping(value = "/PendientesReview/", method = RequestMethod.GET)
    public long getPendientesReview() {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        MyUserPrincipal myUserPrincipal = (MyUserPrincipal) userDetails;
        long id = myUserPrincipal.getUser().getId();
        String status = "finalizada";
        List reserva = reservaService.getReservasByUserIdAndStatus(id,status);
        return reserva.size();

    }

}
