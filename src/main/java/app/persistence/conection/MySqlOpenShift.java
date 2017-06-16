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
public class MySqlOpenShift implements ConectionMySql {

   protected org.slf4j.Logger logger = LoggerFactory.getLogger(this.getClass());

    private String hostOpenShift = System.getenv("OPENSHIFT_MYSQL_DB_HOST");
    private String portOpenShift = System.getenv("OPENSHIFT_MYSQL_DB_PORT");
    private String userOpenShift = System.getenv("OPENSHIFT_MYSQL_DB_USERNAME");
    private String passwordOpenShift = System.getenv("OPENSHIFT_MYSQL_DB_PASSWORD");
    private String conexionOpenShift = "jdbc:mysql://" + hostOpenShift + ":" + portOpenShift + "/pupi";
    @Override
    public EntityManagerFactory conectionWithBd(EntityManagerFactory emf) {
        System.out.println("============================= CONFIGURO OPEN SHIFT");
        Map<String, String> persistenceMap = new HashMap<>();
        persistenceMap.put("javax.persistence.jdbc.url", "jdbc:mysql://" + hostOpenShift + ":" + portOpenShift + "/pupi");
        persistenceMap.put("javax.persistence.jdbc.user", userOpenShift);
        persistenceMap.put("javax.persistence.jdbc.password", passwordOpenShift);
        persistenceMap.put("javax.persistence.jdbc.driver", "com.mysql.jdbc.Driver");
        persistenceMap.put("javax.persistence.schema-generation.database.action", "create-or-extend-tables");

        emf = Persistence.createEntityManagerFactory("PersistenceUnit", persistenceMap);
        return emf;
    }

    public  boolean isThisDataBaseOnline()
    {
        Connection connect;
        try {
            System.out.println("============  pruebo open");
            logger.info(conexionOpenShift + userOpenShift + passwordOpenShift);
            Class.forName("com.mysql.jdbc.Driver");
            connect = (Connection) DriverManager.getConnection(conexionOpenShift + userOpenShift + passwordOpenShift);
            return true;

        } catch (ClassNotFoundException | SQLException e) {
            return false;
        }
    }
}
