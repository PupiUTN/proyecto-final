package app.persistence;

import app.models.entities.Denuncia;
import app.models.entities.TipoCierre;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface DenunciaRepository extends JpaRepository<Denuncia, Long> {

    @Query("select d from Denuncia d where d.estado = :#{#status} order by d.fechaInicio asc" )
    List<Denuncia> findAllDenunciasByStatus (@Param("status")String status);

    @Query("select d from Denuncia d where d.id = :#{#id}")
    Denuncia findById(@Param("id")long id);

    @Query("update Denuncia d set d.estado=:#{#status}, d.fechaActualizacion =:#{#fechaActualizacion} where d.id = :#{#id}")
    Denuncia updateStatus(@Param("id") long id, @Param("status")String status, @Param("fechaActualizacion")Date fechaActualizacion);

    @Query("update Denuncia d " +
            "set d.estado=:#{#status}, d.resolucion =:#{#resolucion}, d.tipoCierre =:#{#tipoCierre}" +
            " where d.id = :#{#id}")
    Denuncia cerrar(@Param("id") long id, @Param("status")String status, @Param("status")String resolucion, @Param("tipoCierre")TipoCierre tipoCierre);

}
