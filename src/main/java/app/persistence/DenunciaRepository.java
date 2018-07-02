package app.persistence;

import app.models.entities.Denuncia;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface DenunciaRepository extends JpaRepository<Denuncia, Long> {

    @Query("select d from Denuncia d where d.estado = :#{#status} order by d.fechaInicio asc" )
    List<Denuncia> findAllDenunciasByStatus (@Param("status")String status);

    @Query("select d from Denuncia d where r.id = :#{#id}")
    Denuncia findById(@Param("id")long id);

}
