package app.persistence.conection;

import com.mysql.jdbc.Connection;
import org.slf4j.LoggerFactory;

import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 * Created by gabriellorenzatti on 10/6/17.
 */

public class MySqlFede implements ConectionMySql {

    private String conexionFede = "jdbc:mysql://localhost:3306/pupi";
    private String userFede = "root";
    private String passwordFede = "mypassword";
    private org.slf4j.Logger logger = LoggerFactory.getLogger(this.getClass());

    @Override
    public EntityManagerFactory conectionWithBd(EntityManagerFactory emf) {
        System.out.println("============================= CONFIGURO local MYSQL fede");
        Map<String, String> persistenceMap = new HashMap<>();
        persistenceMap.put("javax.persistence.jdbc.url", conexionFede);
        persistenceMap.put("javax.persistence.jdbc.user", userFede);
        persistenceMap.put("javax.persistence.jdbc.password", passwordFede);

        persistenceMap.put("javax.persistence.jdbc.driver", "com.mysql.jdbc.Driver");
        persistenceMap.put("javax.persistence.schema-generation.database.action", "create-or-extend-tables");
        emf = Persistence.createEntityManagerFactory("PersistenceUnit", persistenceMap);
        return emf;
    }

   public  boolean isThisDataBaseOnline()
   {
       Connection connect;
       try {

           System.out.println("============  pruebo fede");
           logger.info(conexionFede + userFede + passwordFede);
           Class.forName("com.mysql.jdbc.Driver");
           connect = (Connection) DriverManager.getConnection(conexionFede + userFede + passwordFede);
           return true;

       } catch (ClassNotFoundException | SQLException e) {
        return false;
       }
   }

}
