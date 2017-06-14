package app.persistence.conection;

import javax.persistence.EntityManagerFactory;

/**
 * Created by gabriellorenzatti on 10/6/17.
 */
public abstract class ConectionMySql {

    public abstract EntityManagerFactory executeAction(EntityManagerFactory emf);

}
