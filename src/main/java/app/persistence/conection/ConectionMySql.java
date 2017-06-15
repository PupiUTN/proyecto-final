package app.persistence.conection;

import javax.persistence.EntityManagerFactory;
import java.sql.SQLException;

/**
 * Created by gabriellorenzatti on 10/6/17.
 */
//public abstract class ConectionMySql {
public interface  ConectionMySql {
    //public abstract EntityManagerFactory executeAction(EntityManagerFactory emf);
     EntityManagerFactory conectionWithBd(EntityManagerFactory emf);


    boolean isThisDataBaseOnline();

}
