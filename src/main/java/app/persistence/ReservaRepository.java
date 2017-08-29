package app.persistence;

import app.models.entities.Reserva;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * Created by people on 16/07/17.
 */
public interface ReservaRepository extends JpaRepository<Reserva, Long> {

    @Query("select r from Reserva r where r.perro.user.id = :#{#userId}")
    List<Reserva> findAllByUser(@Param("userId")long userId);
}
