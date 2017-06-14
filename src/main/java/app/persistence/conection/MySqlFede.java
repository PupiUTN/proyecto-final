package app.persistence.conection;

import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by gabriellorenzatti on 10/6/17.
 */
public class MySqlFede extends ConectionMySql {


    private String conexionFede = "jdbc:mysql://localhost:3306/pupi";
    private String userFede = "root";
    private String passwordFede = "mypassword";

    @Override
    public EntityManagerFactory executeAction(EntityManagerFactory emf) {
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

}
