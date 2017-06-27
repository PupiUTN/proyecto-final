package app.persistence.conection;

import javax.persistence.EntityManagerFactory;
import java.sql.SQLException;


public interface ConectionStrategy {
    EntityManagerFactory getEntityManagerFactory();
    boolean isThisDataBaseOnline();

}
