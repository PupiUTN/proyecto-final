package app.persistence;

import app.models.entities.Cuidador;
import app.models.entities.Servicio;
import app.models.entities.CalendarioCuidador;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

/**
 * Created by people on 16/07/17.
 */
public interface CuidadorRepository extends JpaRepository<Cuidador, Long> {

    @Query("select c from Cuidador c where c.user.direccion.ciudadPlaceId = :#{#ciudadPlaceId} and c.estado = :#{#status}")
    List<Cuidador> findAllbyCiudadPlaceIdAndStatus(@Param("ciudadPlaceId") String ciudadPlaceId, @Param("status") String status);


    @Query("select c from Cuidador c " +
            "where c.user.direccion.ciudadPlaceId = :#{#ciudadPlaceId} " +
            "AND c.estado = :#{#status} " +
            "AND (c.cantidadMaxDePerros > COALESCE(( " +
            "select count(r) from Reserva r " +
            "where (r.status = 'pagada-dueño' or r.status = 'aceptada-cuidador' or r.status = 'ejecucion') " +
            "and (( :#{#from} between r.fechaInicio AND r.fechaFin " +
            "or  :#{#to} between r.fechaInicio AND r.fechaFin ) " +
            "or (r.fechaInicio between :#{#from} AND :#{#to} " +
            "or r.fechaFin between :#{#from} AND :#{#to} )) " +
            "GROUP BY r.cuidador " +
            "HAVING r.cuidador = c),0)) " +
            "AND (NOT EXISTS (" +
            "SELECT 1 FROM CalendarioCuidador cc " +
            "WHERE cc.cuidador = c " +
            "AND (cc.fechaDeshabilitada between :#{#from} AND :#{#to} ))) " /*
           "order by c.promedioReviews desc, c.cantidadReviews desc"*/)
    List<Cuidador> findAllbyCiudadYFecha(@Param("ciudadPlaceId") String ciudadPlaceId,
                                         @Param("from") LocalDate from,
                                         @Param("to") LocalDate to,
                                         @Param("status") String status);


    @Query("select c from Servicio c ")
    List<Servicio> getServicios();


    @Query("select c from Cuidador c " + "where user_id  = :#{#id} ")
    Cuidador findcuidadorXUser(@Param("id") long id);

    @Query("select c from Cuidador c " + "where c.estado  like 'pending'")
    List<Cuidador> getSolicitudes();

    @Query("select count (c) from Cuidador c where c.estado = :#{#status}")
    Long getCantidadCuidadoresEncontrados(@Param("status")String status);



}
