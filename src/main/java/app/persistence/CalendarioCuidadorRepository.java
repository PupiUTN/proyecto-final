package app.persistence;

import app.models.entities.CalendarioCuidador;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CalendarioCuidadorRepository extends JpaRepository<CalendarioCuidador, Long> {

    @Query("select cc from CalendarioCuidador cc where cc.cuidador.id = :#{#cuidadorId} and cc.fechaDeshabilitada >= CURDATE() order by cc.fechaDeshabilitada ASC")
    List<CalendarioCuidador> findAllByCuidadorFromToday(@Param("cuidadorId")long cuidadorId);
}
