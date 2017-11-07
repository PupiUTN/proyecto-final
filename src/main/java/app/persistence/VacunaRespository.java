package app.persistence;

import app.models.entities.Vacuna;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created by people on 16/07/17.
 */
public interface VacunaRespository extends JpaRepository<Vacuna, Long> {
}
