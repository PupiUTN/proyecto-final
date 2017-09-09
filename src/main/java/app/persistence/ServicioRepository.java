package app.persistence;

import app.models.entities.Cuidador;
import app.models.entities.Servicio;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.List;

/**
 * Created by people on 16/07/17.
 */
public interface ServicioRepository extends JpaRepository<Servicio, Long> {



}
