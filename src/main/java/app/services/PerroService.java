package app.services;

import app.models.entities.*;
import app.persistence.PerroRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import app.utils.EstadoReserva;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by fbackhaus on 7/6/17.
 */
@Service
public class PerroService {
    PerroRepository perroRepository;

    ReservaService reservaService;

    CalificacionService calificacionService;

    @Autowired
    public PerroService(PerroRepository perroRepository, ReservaService reservaService, CalificacionService calificacionService ) {
        this.perroRepository = perroRepository;
        this.reservaService =  reservaService;
        this.calificacionService = calificacionService;
    }

    public Perro createPerro(Perro entity)  {
        return perroRepository.save(entity);
    }

    public List<Perro> getPerrosByUserId(Long id) throws Exception {
        User user = new User();
        user.setId(id);
        return perroRepository.getPerrosbyUser(user.getId());
    }

    public Perro getPerro(Long perroId) throws  Exception {
        return perroRepository.findOne(perroId);
    }

    public Long getPerrosTotal() {

        return perroRepository.getTotal();
    }

    public boolean deletePerro(Long perroId) throws  Exception{
        List<String> status = new ArrayList<>();
        boolean delete = true;

        if(perroId > 0)
        {      Perro perro = getPerro(perroId);
          List<Reserva> reservas=  reservaService.getReservasByDogId(perro.getId());
            setStatusToComparate(status);
            for (Reserva item : reservas) {
                if( status.contains(item.getStatus()))
                { delete = false;
                   break;
                }
            }

            if (delete)
            {    perro.setStatus("deleted");
                perroRepository.save(perro);
                for (Reserva item: reservas) {
                    reservaService.cancelarCausaUsuario(item.getId(), item.getPerro().getUser().getId());
                }
            }


        }
        else
        {
            delete = false;
        }

        return delete;
    }


     public  void setStatusToComparate (List<String> status)
     {   status.clear();
         status.add( EstadoReserva.EJECUCION.getStatus());
         status.add( EstadoReserva.FINALZADA.getStatus());
         status.add( EstadoReserva.COMENTARIO_DUEÑO.getStatus());
         status.add( EstadoReserva.COMENTARIO_CUIDADOR.getStatus());
     }

    public void editPerro(Perro perro, int puntaje)  {
        float cont =0;
        int cantidadReviews = 1;
        List<Calificacion> list = calificacionService.getCalificacionesPerro(perro.getId());

        if (list.size() >0 ) {
            for (Calificacion calificacion : list) {
                cont += calificacion.getPuntaje();
            }
            cantidadReviews = list.size() ;
            cont =  cont / cantidadReviews;

        }
        else
        {
            cont = puntaje;

        }
        perro.setPromedioReviews(cont);
        perro.setCantidadReviews(cantidadReviews);

        perroRepository.save(perro);

    }
}
