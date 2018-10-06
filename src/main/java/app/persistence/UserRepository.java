package app.persistence;

import app.models.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface UserRepository extends JpaRepository<User, Long> {

    User findByEmail(String email);



    @Query("select count (r) from User r  where r.role = 'ROLE_USER'")
    Long getTotalDueños();

}
