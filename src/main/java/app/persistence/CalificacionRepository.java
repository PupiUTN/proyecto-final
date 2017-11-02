package app.persistence;

import app.models.entities.Calificacion;
import app.models.entities.Reserva;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * Created by people on 16/07/17.
 */
public interface CalificacionRepository extends JpaRepository<Calificacion, Long> {

    @Query("select c from Calificacion as c join c.reserva as r  where " + "  c.from_owner = true AND r.cuidador.id =:#{#id}" )
    List<Calificacion> getCalificacionesCuidador(@Param("id")long id);

    @Query("select c from Calificacion as c join c.reserva as r  where " + "  c.from_owner = false AND r.perro.id =:#{#id}" )
    List<Calificacion> getCalificacionesPerro(@Param("id")long id);
}
