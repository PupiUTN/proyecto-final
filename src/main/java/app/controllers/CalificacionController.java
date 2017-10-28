package app.controllers;

/**
 * Created by gabriellorenzatti on 23/10/17.
 */

import app.models.entities.Calificacion;
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
    private ReservaService reservaService;

    @RequestMapping(method = RequestMethod.POST)
    public Calificacion createCalificacion(@RequestBody  Calificacion entity) throws  Exception {

        Calificacion calific = calificacionService.createCalificacion(entity);
         Reserva res  =    entity.getReserva() ;

          if(res.getStatus().equals("finalizada"))
          {
              res.setStatus("comentario-dueño");
          }
          else
          {  if(res.getStatus().equals("comentario-dueño"))
                { res.setStatus("cerrada");}

          }
         res =   reservaService.save(entity.getReserva());

        return calific;
    }

}
