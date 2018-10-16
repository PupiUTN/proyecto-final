package app.persistence;

import app.models.entities.Reserva;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
public interface CronRepository extends JpaRepository<Reserva, Long> {


    /**
     * @return cantidad de registros actualizados
     */

    @Query("select r from Reserva r where r.fechaFin < CURDATE() and r.status = :currentState ")
    List<Reserva> getIfFechaFinMenorHoy(@Param("currentState") String currentState);

    @Query("select r from Reserva r where r.fechaInicio <= CURDATE() and r.status = :currentState ")
    List<Reserva> getIfFechaInicioMenorHoy(@Param("currentState") String currentState);

    /**
     * @return cantidad de registros actualizados
     */

    @Modifying
    @Query("update Reserva r set r.status = :nextState " +
            "where r.fechaInicio <= CURDATE()" +
            "and r.status = :currentState")
    Integer updateStateIfFechaInicioMenorHoy(@Param("currentState") String currentState, @Param("nextState") String nextState);

    /**
     * @return cantidad de registros actualizados
     */
    @Modifying
    @Query("update Reserva r set r.status = :nextState " +
            " where TIMESTAMPDIFF(HOUR, r.fechaTransaccion, CURDATE()) >= 72" +
            " and r.status = :currentState")
    Integer updateStateIfFechaTransaccionMas72hs(@Param("currentState") String currentState, @Param("nextState") String nextState);


    @Modifying
    @Query("update Reserva r set r.status = :nextState " +
            " where TIMESTAMPDIFF(HOUR, r.fechaAceptacion, CURDATE()) >= 72" +
            " and r.status = :currentState")
    Integer updateStateIfFechaAceptacionMas72hs(@Param("currentState") String currentState, @Param("nextState") String nextState);

    @Modifying
    @Query("update Reserva r set r.status = 'cerrada' " +
            " where TIMESTAMPDIFF(HOUR, r.fechaFin, CURDATE()) >= 72" +
            " and (r.status = 'finalizada' or r.status = 'comentario-dueño' or r.status = 'comentario-cuidador')")
    Integer finalizadoStateIfFechaFinMas72hs();

}
