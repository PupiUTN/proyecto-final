package app.persistence;

import app.models.entities.Cuidador;
import app.models.entities.Reserva;

import app.models.entities.Servicio;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.List;

/**
 * Created by people on 16/07/17.
 */
public interface CuidadorRepository extends JpaRepository<Cuidador, Long> {

    @Query("select c from Cuidador c where c.user.direccion.ciudadPlaceId = :#{#ciudadPlaceId}")
    List<Cuidador> findAllbyCiudadPlaceId (@Param("ciudadPlaceId")String ciudadPlaceId);

   /* @Query("select c from Reserva r join r.cuidador c " +
            " where c.user.direccion.ciudadPlaceId = :#{#ciudadPlaceId} " +
            "AND r.fechaInicio < :#{#from} " +
            "AND r.fechaInicio > :#{#to} " +
            "AND r.fechaFin < :#{#from} " +
            "AND r.fechaFin > :#{#to} " +
            "OR r is null")*/
   @Query("select c from Cuidador c " +
           "where c.user.direccion.ciudadPlaceId = :#{#ciudadPlaceId} " +
           "AND not exists ( " +
           "select 1 from Reserva r " +
           "where r.cuidador = c and " +
           "(r.fechaInicio between :#{#from} AND :#{#to} " +
           "or r.fechaFin between :#{#from} AND :#{#to} ))")
    List<Cuidador> findAllbyCiudadYFecha(@Param("ciudadPlaceId")String ciudadPlaceId,
                                         @Param("from")Date from,
                                         @Param("to")Date to);



    @Query("select c from Servicio c ")
    List<Servicio> getServicios();


}
