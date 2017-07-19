package app.persistence;

import app.models.entities.Direccion;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created by people on 16/07/17.
 */
public interface DireccionRepository extends JpaRepository<Direccion, Long> {
}
