package app.persistence.conection;

import javax.persistence.EntityManagerFactory;

/**
 * Created by gabriellorenzatti on 10/6/17.
 */
public abstract class ConeccionMySql {

    public abstract EntityManagerFactory executeAction(EntityManagerFactory emf);

}
