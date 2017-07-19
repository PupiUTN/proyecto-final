package app.persistence;

import app.models.entities.Dueño;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created by people on 16/07/17.
 */
public interface DuenoRespository extends JpaRepository<Dueño, Long>{
}
