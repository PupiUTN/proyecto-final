package app.persistence;

import app.models.entities.Calificacion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * Created by people on 16/07/17.
 */
public interface CalificacionRepository extends JpaRepository<Calificacion, Long> {

    @Query("select c from Calificacion as c join c.reserva as r  where " + "  c.fromOwner = true AND r.cuidador.id =:#{#id}")
    List<Calificacion> getCalificacionesCuidador(@Param("id") long id);

    @Query("select c from Calificacion as c join c.reserva as r  where " + "  c.fromOwner = false AND r.perro.id =:#{#id}" )
    List<Calificacion> getCalificacionesPerro(@Param("id")long id);


    @Query("select c from Calificacion  as c  where c.reserva.cuidador.user.id = :#{#userId}  AND  c.fromOwner = false " )
    List<Calificacion> getCalificacionesRealizadasCuidador(@Param("userId")long userId);


    @Query("select c from Calificacion  as c  where c.reserva.perro.id = :#{#userId}  AND  c.fromOwner = false " )
    List<Calificacion> getCalificacionesRecibidasXPerro(@Param("userId")long userId);
}
