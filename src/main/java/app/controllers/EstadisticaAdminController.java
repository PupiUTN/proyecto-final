package app.controllers;

import app.models.entities.*;
import app.security.MyUserPrincipal;
import app.services.CalificacionService;
import app.services.CuidadorService;
import app.services.PerroService;
import app.services.ReservaService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

/**
 * Created by gabriellorenzatti on 5/6/18.
 */
@RestController
@RequestMapping(value = "/api/admin/estadisticas")
public class EstadisticaAdminController {
    private final ReservaService reservaService;
    private final CuidadorService cuidadorService;
    private final PerroService perroService;
    private final CalificacionService calificacionService;



    public EstadisticaAdminController(ReservaService reservaService, CuidadorService cuidadorService, PerroService perroService, CalificacionService calificacionService) {
        this.reservaService = reservaService;
        this.cuidadorService = cuidadorService;
        this.perroService = perroService;
        this.calificacionService = calificacionService;

    }

    @PreAuthorize("isAuthenticated()")
    @RequestMapping(value = "/me/", method = RequestMethod.GET)
    public EstadisticaAdmin getEstadisticas() throws Exception {
        DecimalFormat df = new DecimalFormat("#.00");
          EstadisticaAdmin estadisticaAdmin = new EstadisticaAdmin();
        List<Reserva> reservas = reservaService.getCantidadReservasTotal();
         Long cantPerros = perroService.getPerrosTotal();
        Long CantCuidadores = cuidadorService.getTotalCuidadores();
        int cantSolicitudes  = cuidadorService.getSolicitudes().size();
        Long CantCalificaciones = calificacionService.getTotalCalificaciones();
        int totalDenuncias = 1;
             Double cont = 0.0;
        if ( reservas.size() > 0)
        {
            estadisticaAdmin.setTotalReservas(reservas.size());


            for ( Reserva item: reservas) {
                cont +=  item.getPrecioTotal();

            }
                estadisticaAdmin.setTotalDineroActual( df.format(cont * 0.2));
            estadisticaAdmin.setTotalPerros(cantPerros);
            estadisticaAdmin.setTotalCuidadores(CantCuidadores);
            estadisticaAdmin.setTotalSolicitudes(cantSolicitudes);
            estadisticaAdmin.setTotalCalificaciones(CantCalificaciones);
            estadisticaAdmin.setTotalDenuncias(totalDenuncias);

        }

        return estadisticaAdmin;
    }




}