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
public class MySqlPaolo implements ConectionMySql {



    private String conexionPaolo = "jdbc:mysql://localhost:3306/pupi";
    private String userPaolo = "root";
    private String passwordPaolo = "MilikiJimenezCrack77";
    @Override
    public EntityManagerFactory conectionWithBd(EntityManagerFactory emf) {
        System.out.println("============================= CONFIGURO local MYSQL jose");
        Map<String, String> persistenceMap = new HashMap<>();
        persistenceMap.put("javax.persistence.jdbc.url", conexionPaolo);
        persistenceMap.put("javax.persistence.jdbc.user", userPaolo);
        persistenceMap.put("javax.persistence.jdbc.password", passwordPaolo);
        persistenceMap.put("javax.persistence.jdbc.driver", "com.mysql.jdbc.Driver");
        persistenceMap.put("javax.persistence.schema-generation.database.action", "create-or-extend-tables");
        emf = Persistence.createEntityManagerFactory("PersistenceUnit", persistenceMap);
        return emf;
    }

    public  boolean isThisDataBaseOnline()
    {
        Connection connect;
        try {
            System.out.println("============  pruebo paolo");
         //   logger.info(conexionPaolo + userPaolo + passwordPaolo);
            Class.forName("com.mysql.jdbc.Driver");
            connect = (Connection) DriverManager.getConnection(conexionPaolo + userPaolo + passwordPaolo);
            return true;

        } catch (ClassNotFoundException | SQLException e) {
            return false;
        }
    }

}
