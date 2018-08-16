package app.persistence;

import app.models.entities.TipoDenuncia;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TipoDenunciaRepository extends JpaRepository<TipoDenuncia, Long> {

}
