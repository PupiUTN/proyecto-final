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

    @Autowired
    private CalificacionService calificacionService;

    @Autowired
    private ReservaService reservaService;

    @Autowired
    private CuidadorService cuidadorService;

    @Autowired
    private PerroService perroService;

    @RequestMapping(method = RequestMethod.POST)
    public Calificacion createCalificacion(@RequestBody  Calificacion entity) throws  Exception {
            int aux=0;
        Calificacion calific = calificacionService.createCalificacion(entity);
         Reserva res  =   reservaService.getReserva( entity.getReserva().getId()) ;


          if(res.getStatus().equals("finalizada") && !calific.isFrom_owner())
          {
              res.setStatus("comentario-cuidador");

               setPromedioCalificacionPerro(res.getPerro(),entity.getPuntaje());
          }
          else
          {  if(res.getStatus().equals("comentario-dueño") && !calific.isFrom_owner())
                { res.setStatus("cerrada");
                    setPromedioCalificacionPerro(res.getPerro(), entity.getPuntaje());

                }
                else
                        {

                             if (res.getStatus().equals("comentario-cuidador") && calific.isFrom_owner())
                             {  Cuidador cuidador = cuidadorService.getCuidador( res.getCuidador().getId()) ;
                                 List<Calificacion> list   =calificacionService.getCalificacionesCuidador(cuidador.getId());

                                 for (Calificacion item: list)
                                 {
                                     aux += item.getPuntaje();
                                 }
                                 cuidador.setCantidadReviews(list.size());
                                 cuidador.setPromedioReviews((aux ) / cuidador.getCantidadReviews());
                                 res.setStatus("cerrada");
                                 cuidadorService.editCuidador(cuidador);

                             }
                             else{
                                 Cuidador cuidador = cuidadorService.getCuidador( res.getCuidador().getId()) ;
                                 List<Calificacion> list   =calificacionService.getCalificacionesCuidador(cuidador.getId());

                                 for (Calificacion item: list)
                                 {
                                     aux += item.getPuntaje();
                                 }
                                 cuidador.setCantidadReviews(list.size());
                                 cuidador.setPromedioReviews((aux) / cuidador.getCantidadReviews());
                                 res.setStatus("comentario-dueño");
                                 cuidadorService.editCuidador(cuidador);

                             }
                        }


          }

       res =   reservaService.setEstadoFinalizado(res);

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

    private void setPromedioCalificacionPerro(Perro perro, int puntaje) throws Exception {

        perroService.editPerro(perro,puntaje);


    }



    @PreAuthorize("hasAuthority('ROLE_CUIDADOR')")

    @RequestMapping(value = "/misCalificacionesCuidador/", method = RequestMethod.GET)
    public List<Calificacion> getReviews() throws Exception {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        MyUserPrincipal myUserPrincipal = (MyUserPrincipal) userDetails;
        long id = getIdUser();


        List <Calificacion> calificacions = calificacionService.getCalificacionesRealizadasCuidador(id);
            return calificacions;
    }


    private long getIdUser() {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        MyUserPrincipal myUserPrincipal = (MyUserPrincipal) userDetails;
        return myUserPrincipal.getUser().getId();
    }





    @RequestMapping(value = "/misPerros/", method = RequestMethod.GET)
    public List<Perro> getPerros() throws Exception {
        long id = getIdUser();

        return perroService.getPerrosByUserId(id);

    }

    @RequestMapping(value = "/misCalificacionesPerro/", method = RequestMethod.GET)
    public List<Calificacion> getReviewsPerro(@RequestParam(value = "id", required = false) long id) throws Exception {

        List<Calificacion> list =  calificacionService.getCalificacionesRecibidasXPerro(id);
        return list;


    }


}
