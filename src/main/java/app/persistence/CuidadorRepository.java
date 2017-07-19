package app.persistence;

import app.models.entities.Cuidador;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created by people on 16/07/17.
 */
public interface CuidadorRepository extends JpaRepository<Cuidador, Long> {
}
