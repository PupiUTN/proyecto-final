package app.controllers;


import app.models.entities.Reserva;
import app.models.entities.User;
import app.security.MyUserPrincipal;
import app.services.CuidadorService;
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
@RequestMapping(value = "/api/cuidador/me/reservas")
public class ReservaCuidadorController {


    private final ReservaService reservaService;
    private final MailService mailService;
    private final CuidadorService cuidadorService;

    @Autowired
    public ReservaCuidadorController(ReservaService reservaService, MailService mailService, CuidadorService cuidadorService) {
        this.reservaService = reservaService;
        this.mailService = mailService;
        this.cuidadorService = cuidadorService;
    }

    @PreAuthorize("hasAuthority('ROLE_CUIDADOR')")
    @RequestMapping(method = RequestMethod.POST)
    public Reserva post(@RequestBody Reserva entity) {
        //TODO setear info del cuidador asi nadie puede meter info que no es.
        return reservaService.save(entity);

    }

    @PreAuthorize("hasAuthority('ROLE_CUIDADOR')")
    @RequestMapping(value = "{id}", method = RequestMethod.GET)
    public Reserva getReserva(@PathVariable("id") Long id) {
        return reservaService.getReserva(id);
    }


    @PreAuthorize("hasAuthority('ROLE_CUIDADOR')")
    @RequestMapping(method = RequestMethod.GET)
    public List<Reserva> get(@RequestParam("status") String status) {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext()
                .getAuthentication()
                .getPrincipal();
        MyUserPrincipal myUserPrincipal = (MyUserPrincipal) userDetails;
        long id = myUserPrincipal.getUser()
                .getId();
        return reservaService.getReservasByCuidadorIdAndStatus(id, status);
    }


    @PreAuthorize("hasAuthority('ROLE_CUIDADOR')")
    @RequestMapping(method = RequestMethod.PUT, value = "{reservaId}/cancelarReserva")
    public ResponseEntity cancelar(@PathVariable Long reservaId) {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext()
                .getAuthentication()
                .getPrincipal();

        MyUserPrincipal myUserPrincipal = (MyUserPrincipal) userDetails;
        long id = myUserPrincipal.getUser()
                .getId();
        reservaService.cancelar(reservaId, id);
        User user = getReserva(reservaId).getPerro()
                .getUser();
        mailService.sendEmail(user, MailType.BOOKING_CANCELLATION_BY_HOST);
        return new ResponseEntity(HttpStatus.OK);
    }

    @PreAuthorize("hasAuthority('ROLE_CUIDADOR')")
    @RequestMapping(method = RequestMethod.PUT, value = "{reservaId}/confirmarReserva")
    public ResponseEntity Confirmar(@PathVariable Long reservaId) {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext()
                .getAuthentication()
                .getPrincipal();

        MyUserPrincipal myUserPrincipal = (MyUserPrincipal) userDetails;
        long id = myUserPrincipal.getUser()
                .getId();
        reservaService.confirmar(reservaId, id);
        User user = getReserva(reservaId).getPerro()
                .getUser();
        mailService.sendEmail(user, MailType.BOOKING_CONFIRMATION);
        return new ResponseEntity(HttpStatus.OK);

    }

    @PreAuthorize("hasAuthority('ROLE_CUIDADOR')")

    @RequestMapping(value = "/PendientesReview/", method = RequestMethod.GET)
    public int[] getPendientesReview() {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext()
                .getAuthentication()
                .getPrincipal();
        MyUserPrincipal myUserPrincipal = (MyUserPrincipal) userDetails;
        long id = myUserPrincipal.getUser()
                .getId();
        int[] cant = new int[2];
        String status = "finalizada";
        // List reserva = ;
        cant[0] = reservaService.getReservasByCuidadorIdAndStatus(id, status)
                .size();
        cant[1] = reservaService.getReservasByUserIdAndStatus(id, status)
                .size();
        return cant;

    }

}
