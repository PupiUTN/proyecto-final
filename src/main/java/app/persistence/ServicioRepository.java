package app.persistence;

import app.models.entities.Servicio;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created by people on 16/07/17.
 */
public interface ServicioRepository extends JpaRepository<Servicio, Long> {


}
