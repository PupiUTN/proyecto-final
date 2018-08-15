package app.persistence;

import app.models.entities.Perro;
import app.models.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

/**
 * Created by people on 16/07/17.
 */
public interface PerroRepository extends JpaRepository<Perro, Long> {

    @Query("select r from Perro r  where  r.user.id = :#{#userId} and r.status = 'active'")
    List<Perro> getPerrosbyUser(@Param("userId")long userId);


    @Query("select count (r) from Perro r  where  r.status = 'active'")
    Long getTotal();

    @Query("select count (r) from Perro r   where  r.user.id = :#{#userId} and  r.status = 'active'")
    Long countPerrosbyUserId(@Param("userId")long userId);


}
