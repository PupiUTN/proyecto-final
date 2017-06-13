package app.persistence.conection;

import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by gabriellorenzatti on 10/6/17.
 */
public class MySqlGabi extends ConeccionMySql {


    private String conexionGabi = "jdbc:mysql://localhost:3306/pupi";
    private String userGabi = "root";
    private String passwordGabi = "6732";
    @Override
    public EntityManagerFactory executeAction(EntityManagerFactory emf) {
        System.out.println("algo");
        System.out.println("============================= CONFIGURO local MYSQL gabi");
        Map<String, String> persistenceMap = new HashMap<>();
        persistenceMap.put("javax.persistence.jdbc.url", conexionGabi);
        persistenceMap.put("javax.persistence.jdbc.user", userGabi);
        persistenceMap.put("javax.persistence.jdbc.password", passwordGabi);
        persistenceMap.put("javax.persistence.jdbc.driver", "com.mysql.jdbc.Driver");
        persistenceMap.put("javax.persistence.schema-generation.database.action", "create-or-extend-tables");
        emf = Persistence.createEntityManagerFactory("PersistenceUnit", persistenceMap);
        return emf;
    }

}
