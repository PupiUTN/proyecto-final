package app.controllers;

/**
 * Created by gabriellorenzatti on 23/10/17.
 */

import app.models.entities.Calificacion;
import app.models.entities.Cuidador;
import app.models.entities.Perro;
import app.models.entities.Reserva;
import app.security.MyUserPrincipal;
import app.services.CalificacionService;
import app.services.CuidadorService;
import app.services.PerroService;
import app.services.ReservaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api/calificaciones")
public class CalificacionController {

    private final CalificacionService calificacionService;

    private final ReservaService reservaService;

    private final CuidadorService cuidadorService;

    private PerroService perroService;

    @Autowired
    public CalificacionController(CalificacionService calificacionService, ReservaService reservaService, CuidadorService cuidadorService, PerroService perroService) {
        this.calificacionService = calificacionService;
        this.reservaService = reservaService;
        this.cuidadorService = cuidadorService;
        this.perroService = perroService;
    }


    @RequestMapping(method = RequestMethod.POST)
    public Calificacion createCalificacion(@RequestBody Calificacion entity) {
        int aux = 0;
        Calificacion calific = calificacionService.createCalificacion(entity);
        Reserva res = reservaService.getReserva(entity.getReserva()
                .getId());

        if (res.getStatus()
                .equals("finalizada") && !calific.isFromOwner()) {
            res.setStatus("comentario-cuidador");

            setPromedioCalificacionPerro(res.getPerro(), entity.getPuntaje());
        } else {
            if (res.getStatus()
                    .equals("comentario-dueño") && !calific.isFromOwner()) {
                res.setStatus("cerrada");
                setPromedioCalificacionPerro(res.getPerro(), entity.getPuntaje());

            } else {

                if (res.getStatus()
                        .equals("comentario-cuidador") && calific.isFromOwner()) {
                    Cuidador cuidador = cuidadorService.getCuidador(res.getCuidador()
                            .getId());
                    List<Calificacion> list = calificacionService.getCalificacionesCuidador(cuidador.getId());

                    for (Calificacion item : list) {
                        aux += item.getPuntaje();
                    }
                    cuidador.setCantidadReviews(list.size());
                    cuidador.setPromedioReviews((aux) / cuidador.getCantidadReviews());
                    res.setStatus("cerrada");
                    cuidadorService.editCuidador(cuidador);

                } else {
                    Cuidador cuidador = cuidadorService.getCuidador(res.getCuidador()
                            .getId());
                    List<Calificacion> list = calificacionService.getCalificacionesCuidador(cuidador.getId());

                    for (Calificacion item : list) {
                        aux += item.getPuntaje();
                    }
                    cuidador.setCantidadReviews(list.size());
                    cuidador.setPromedioReviews((aux) / cuidador.getCantidadReviews());
                    res.setStatus("comentario-dueño");
                    cuidadorService.editCuidador(cuidador);

                }
            }


        }

        reservaService.setEstadoFinalizado(res);

        return calific;
    }


    @RequestMapping(value = "/calificacionesCuidador/", method = RequestMethod.GET)
    public List<Calificacion> getCalificacionesCuidador(@RequestParam(value = "id", required = false) long id) {
        return calificacionService.getCalificacionesCuidador(id);
    }

    @RequestMapping(value = "/calificacionesPerro/", method = RequestMethod.GET)
    public List<Calificacion> getCalificacionesPerro(@RequestParam(value = "id", required = false) long id) {
        return calificacionService.getCalificacionesPerro(id);
    }

    private void setPromedioCalificacionPerro(Perro perro, int puntaje) {
        perroService.editPerro(perro, puntaje);
    }


    @PreAuthorize("hasAuthority('ROLE_CUIDADOR')")

    @RequestMapping(value = "/misCalificacionesCuidador/", method = RequestMethod.GET)
    public List<Calificacion> getReviews() {
        return calificacionService.getCalificacionesRealizadasCuidador(getIdUser());
    }


    private long getIdUser() {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext()
                .getAuthentication()
                .getPrincipal();
        MyUserPrincipal myUserPrincipal = (MyUserPrincipal) userDetails;
        return myUserPrincipal.getUser()
                .getId();
    }


    @RequestMapping(value = "/misPerros/", method = RequestMethod.GET)
    public List<Perro> getPerros() throws Exception {
        return perroService.getPerrosByUserId(getIdUser());
    }

    @RequestMapping(value = "/misCalificacionesPerro/", method = RequestMethod.GET)
    public List<Calificacion> getReviewsPerro(@RequestParam(value = "id", required = false) long id) {
        return calificacionService.getCalificacionesRecibidasXPerro(id);
    }


}
