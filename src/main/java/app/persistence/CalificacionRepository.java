package app.persistence;

import app.models.entities.Calificacion;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created by people on 16/07/17.
 */
public interface CalificacionRepository extends JpaRepository<Calificacion, Long> {
}
