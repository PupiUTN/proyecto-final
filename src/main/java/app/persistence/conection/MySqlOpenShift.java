package app.persistence.conection;

import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by gabriellorenzatti on 10/6/17.
 */
public class MySqlOpenShift extends ConeccionMySql {


    private String hostOpenShift = System.getenv("OPENSHIFT_MYSQL_DB_HOST");
    private String portOpenShift = System.getenv("OPENSHIFT_MYSQL_DB_PORT");
    private String userOpenShift = System.getenv("OPENSHIFT_MYSQL_DB_USERNAME");
    private String passwordOpenShift = System.getenv("OPENSHIFT_MYSQL_DB_PASSWORD");
    private String conexionOpenShift = "jdbc:mysql://" + hostOpenShift + ":" + portOpenShift + "/pupi";
    @Override
    public EntityManagerFactory executeAction(EntityManagerFactory emf) {
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
}
