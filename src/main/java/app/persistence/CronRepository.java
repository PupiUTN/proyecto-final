package app.persistence;

import app.models.entities.Reserva;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

@Transactional
public interface CronRepository extends JpaRepository<Reserva, Long> {


    /**
     * @return cantidad de registros actualizados
     */
    @Modifying
    @Query("update Reserva r set r.status = :nextState " +
            "where r.fechaFin < CURDATE()" +
            "and r.status = :currentState")
    Integer updateStateIfFechaFinMenorHoy(@Param("currentState") String currentState, @Param("nextState") String nextState);

    /**
     * @return cantidad de registros actualizados
     */

    @Modifying
    @Query("update Reserva r set r.status = :nextState " +
            "where r.fechaInicio = CURDATE()" +
            "and r.status = :currentState")
    Integer updateStateIfFechaInicioIgualHoy(@Param("currentState") String currentState, @Param("nextState") String nextState);

    /**
     * @return cantidad de registros actualizados
     */
    @Modifying
    @Query("update Reserva r set r.status = :nextState " +
            " where TIMESTAMPDIFF(HOUR, r.fechaTransaccion, CURDATE()) >= 72" +
            " and r.status = :currentState")
    Integer updateStateIfFechaTransaccionMas72hs(@Param("currentState") String currentState, @Param("nextState") String nextState);

}
