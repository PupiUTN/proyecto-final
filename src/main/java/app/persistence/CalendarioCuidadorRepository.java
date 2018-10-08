package app.persistence;

import app.models.entities.CalendarioCuidador;
import app.models.entities.Cuidador;
import app.models.entities.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CalendarioCuidadorRepository extends JpaRepository<CalendarioCuidador, Long> {
    List<CalendarioCuidador> findAllByCuidador(Cuidador cuidador);
}
