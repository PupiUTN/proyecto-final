package app.persistencia.Conection;


import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import java.net.*;
import java.util.HashMap;
import java.util.Map;





/**
 * Created by gabriellorenzatti on 10/6/17.
 */
public class MySqlHeroku extends ConeccionMySql {



    @Override
    public EntityManagerFactory executeAction  (EntityManagerFactory emf) {
         return  newHeroku(emf);

    }

    public EntityManagerFactory newHeroku (EntityManagerFactory emf)
    {  return null;


    /*    URI dbUri = new URI(System.getenv("DATABASE_URL"));
        String hostHeroku = dbUri.getHost();
        int portHeroku = dbUri.getPort();
        String userHeroku = dbUri.getUserInfo().split(":")[0];
        String passwordHeroku = dbUri.getUserInfo().split(":")[1];
        String dbNameHeroku = dbUri.getPath();
        String conexionHeroku = "jdbc:postgresql://" + dbUri.getHost() + ':' + dbUri.getPort() + dbUri.getPath();

        System.out.println("============================= CONFIGURO HEROKU");
        Map<String, String> persistenceMap = new HashMap<>();
        persistenceMap.put("javax.persistence.jdbc.url", conexionHeroku);
        persistenceMap.put("javax.persistence.jdbc.user", userHeroku);
        persistenceMap.put("javax.persistence.jdbc.password", passwordHeroku);
        persistenceMap.put("javax.persistence.jdbc.driver", "org.postgresql.Driver");
        persistenceMap.put("javax.persistence.schema-generation.database.action", "create-or-extend-tables");
    return    emf = Persistence.createEntityManagerFactory("PersistenceUnit", persistenceMap);*/

    }
}
