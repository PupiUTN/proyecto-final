package app.persistence;

import app.models.entities.Tamaño;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created by people on 16/07/17.
 */
public interface TamanoRepository extends JpaRepository<Tamaño, Long> {
}
