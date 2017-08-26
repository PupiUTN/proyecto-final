package app.persistence;

import app.models.entities.Cuidador;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * Created by people on 16/07/17.
 */
public interface CuidadorRepository extends JpaRepository<Cuidador, Long> {

    @Query("select c from Cuidador c where c.user.direccion.ciudadPlaceId = :#{#ciudadPlaceId}")
    List<Cuidador> findAllbyCiudadPlaceId (@Param("ciudadPlaceId")String ciudadPlaceId);

}
