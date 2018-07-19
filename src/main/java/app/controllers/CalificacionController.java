package app.controllers;

/**
 * Created by gabriellorenzatti on 23/10/17.
 */

import app.models.entities.Calificacion;
import app.models.entities.Cuidador;
import app.models.entities.Reserva;
import app.services.CalificacionService;
import app.services.CuidadorService;
import app.services.ReservaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping(value = "/api/calificaciones")
public class CalificacionController {

    private final CalificacionService calificacionService;

    private final ReservaService reservaService;

    private final CuidadorService cuidadorService;

    @Autowired
    public CalificacionController(CalificacionService calificacionService, ReservaService reservaService, CuidadorService cuidadorService) {
        this.calificacionService = calificacionService;
        this.reservaService = reservaService;
        this.cuidadorService = cuidadorService;
    }

    @RequestMapping(method = RequestMethod.POST)
    public Calificacion createCalificacion(@RequestBody Calificacion entity) {
        int aux = 0;
        Calificacion calificacion = calificacionService.createCalificacion(entity);
        Reserva res = reservaService.getReserva(entity.getReserva()
                .getId());

        if (res.getStatus()
                .equals("finalizada") && !calificacion.isFromOwner()) {
            res.setStatus("comentario-cuidador");
        } else {
            if (res.getStatus()
                    .equals("comentario-dueño") && !calificacion.isFromOwner()) {
                res.setStatus("cerrada");

            } else {

                if (res.getStatus()
                        .equals("comentario-cuidador") && calificacion.isFromOwner()) {
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
        return calificacion;
    }


    @RequestMapping(value = "/calificacionesCuidador/", method = RequestMethod.GET)
    public List<Calificacion> getCalificacionesCuidador(@RequestParam(value = "id", required = false) long id) {
        return calificacionService.getCalificacionesCuidador(id);
    }

    @RequestMapping(value = "/calificacionesPerro/", method = RequestMethod.GET)
    public List<Calificacion> getCalificacionesPerro(@RequestParam(value = "id", required = false) long id) {
        return calificacionService.getCalificacionesPerro(id);
    }
}
