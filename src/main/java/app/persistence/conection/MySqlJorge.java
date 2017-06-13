package app.persistence.conection;

import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by gabriellorenzatti on 10/6/17.
 */
public class MySqlJorge extends ConeccionMySql {


    private String conexionJorge = "jdbc:mysql://localhost:3306/pupi";
    private String userJorge = "root";
    private String passwordJorge = "mypassword";
    @Override
    public EntityManagerFactory executeAction(EntityManagerFactory emf) {
        System.out.println("============================= CONFIGURO local MYSQL jorge");
        Map<String, String> persistenceMap = new HashMap<>();
        persistenceMap.put("javax.persistence.jdbc.url", conexionJorge);
        persistenceMap.put("javax.persistence.jdbc.user", userJorge);
        persistenceMap.put("javax.persistence.jdbc.password", passwordJorge);
        persistenceMap.put("javax.persistence.jdbc.driver", "com.mysql.jdbc.Driver");
        persistenceMap.put("javax.persistence.schema-generation.database.action", "create-or-extend-tables");
        emf = Persistence.createEntityManagerFactory("PersistenceUnit", persistenceMap);
        return emf;
    }
}
