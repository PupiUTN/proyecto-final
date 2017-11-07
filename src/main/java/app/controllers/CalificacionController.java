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

    @Autowired
    private CalificacionService calificacionService;

    @Autowired
    private ReservaService reservaService;

    @Autowired
    private CuidadorService cuidadorService;

    @RequestMapping(method = RequestMethod.POST)
    public Calificacion createCalificacion(@RequestBody  Calificacion entity) throws  Exception {

        Calificacion calific = calificacionService.createCalificacion(entity);
         Reserva res  =   reservaService.getReserva( entity.getReserva().getId()) ;
        Cuidador cuidador = cuidadorService.getCuidador( entity.getReserva().getCuidador().getId()) ;
          if(res.getStatus().equals("finalizada") && !calific.isFrom_owner())
          {    cuidador.setCantidadReviews(cuidador.getCantidadReviews() +1);
                cuidador.setPromedioReviews((cuidador.getPromedioReviews() + calific.getPuntaje() ) / cuidador.getCantidadReviews());
              res.setStatus("comentario-cuidador");
          }
          else
          {  if(res.getStatus().equals("comentario-dueño") && !calific.isFrom_owner())
                { res.setStatus("cerrada");
                    cuidador.setCantidadReviews(cuidador.getCantidadReviews() +1);
                    cuidador.setPromedioReviews((cuidador.getPromedioReviews() + calific.getPuntaje() ) / cuidador.getCantidadReviews());

                }
                else
                        {

                             if (res.getStatus().equals("comentario-cuidador") && calific.isFrom_owner())
                                 res.setStatus("cerrada");
                             else{
                                 res.setStatus("comentario-dueño");

                             }
                        }


          }

       res =   reservaService.SetEstadoFinalizado(res);
         cuidadorService.editCuidador(cuidador);
        return calific;
    }


    @RequestMapping(value = "/calificacionesCuidador/", method = RequestMethod.GET)
    public List<Calificacion> getCalificacionesCuidador(@RequestParam(value = "id", required = false) long id) throws Exception {
            List<Calificacion> list =  calificacionService.getCalificacionesCuidador(id);
        return list;

    }

    @RequestMapping(value = "/calificacionesPerro/", method = RequestMethod.GET)
    public List<Calificacion> getCalificacionesPerro(@RequestParam(value = "id", required = false) long id) throws Exception {
        List<Calificacion> list =  calificacionService.getCalificacionesPerro(id);
        return list;

    }
}
