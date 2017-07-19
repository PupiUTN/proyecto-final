package app.persistence;

import app.models.entities.Raza;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created by people on 16/07/17.
 */
public interface RazaRepository extends JpaRepository<Raza, Long> {
}
