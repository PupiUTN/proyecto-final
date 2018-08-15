package app.persistence;

import app.models.entities.Reserva;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.List;

public interface ReservaRepository extends JpaRepository<Reserva, Long> {

    @Query("select r from Reserva r where r.perro.user.id = :#{#userId}")
    List<Reserva> findAllByUser(@Param("userId")long userId);

    @Query("select r from Reserva r where r.cuidador.user.id = :#{#userId}")
    List<Reserva> findAllByCuidador(@Param("userId")long userId);

    @Query("select r from Reserva r where r.perro.user.id = :#{#userId} and r.status =:#{#statusId}")
    List<Reserva> findAllByUserAndStatus(@Param("userId")long userId, @Param("statusId")String statusId);

    @Query("select r from Reserva r where r.perro.user.id = :#{#userId} and r.id = :#{#id}")
    Reserva findByUserIdAnId(@Param("userId")long userId, @Param("id")long id);

    @Query("select r from Reserva r where r.cuidador.user.id = :#{#userId} and r.id = :#{#id}")
    Reserva findByCuidadorIdAnId(@Param("userId")long userId, @Param("id")long id);

    @Query("select r from Reserva r where r.cuidador.user.id = :#{#userId} and r.status =:#{#statusId}")
    List<Reserva> findAllByCuidadorAndStatus(@Param("userId")long userId, @Param("statusId")String statusId);

    @Query("select r from Reserva r where r.cuidador.id = :#{#cuidadorId} and r.status IN :#{#statusId} and r.fechaFin >= CURDATE()")
    List<Reserva> findAllByCuidadorIdAndStatusListAndFechaVigente(@Param("cuidadorId")long cuidadorId, @Param("statusId")List<String> statusList);

    @Query("select r from Reserva r where r.cuidador.user.id = :#{#userId} and r.status =:#{#statusId} or r.status =:#{#statusUsuario}")
    List<Reserva> findAllByCuidadorAndStatusFinalizada(@Param("userId")long userId, @Param("statusId")String statusId, @Param("statusUsuario")String statusUsuario);

    @Query("select r from Reserva r where r.perro.user.id = :#{#userId} and r.status =:#{#statusId} or r.status =:#{#statusUsuario}")
    List<Reserva> findAllByUserAndStatusFinalizada(@Param("userId")long userId, @Param("statusId")String statusId, @Param("statusUsuario")String statusUsuario);


    @Query("select r from Reserva r where r.perro.user.id = :#{#userId} and r.status = 'comentario-cuidador' or r.status = 'finalizada'" )
    List<Reserva> findPendienteReviewUser();


    @Query("select r from Reserva r where r.perro.user.id = :#{#userId} and r.status = 'comentario-cuidador' or r.status = 'finalizada'" )
    List<Reserva> findPendienteReviewCuidador();

    @Query("select count (r) from Reserva r where r.cuidador.user.id = :#{#userId}")
    int getCantidadReservas(@Param("userId") long userId);

    @Query("select r from Reserva r")
    List<Reserva> getCantidadReservasTotal();


    @Query("select r from Reserva r where r.status =:#{#statusId} or r.status =:#{#statusRechazada}")
    List<Reserva> getCantidadByStatus(@Param("statusId")String statusId, @Param("statusRechazada")String statusRechazada );


    @Query("select r from Reserva r where NOT (r.status = 'cerrada' or r.status='rechazada-dueño' or r.status='rechazada-cuidador' ) and r.perro.id = :#{#perroId} ")
    List<Reserva>  getReservaByDogIdAndStatus(@Param("perroId")long perroId);
}
