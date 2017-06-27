package app.persistence.conection;


import com.mysql.jdbc.Connection;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import java.net.URI;

import java.net.URISyntaxException;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;


/**
 * Created by gabriellorenzatti on 10/6/17.
 */
public class StrategyHeroku implements ConectionStrategy {


    private String connectionString = "jdbc:mysql://localhost:3306/pupi";
    private String username = "root";
    private String password = "mypassword";
    private Logger LOG = LoggerFactory.getLogger(this.getClass());

    @Override
    public EntityManagerFactory getEntityManagerFactory() {


        System.out.println("============================= CONFIGURO HEROKU");
        Map<String, String> persistenceMap = new HashMap<>();
        persistenceMap.put("javax.persistence.jdbc.url", connectionString);
        persistenceMap.put("javax.persistence.jdbc.user", username);
        persistenceMap.put("javax.persistence.jdbc.password", password);
        persistenceMap.put("javax.persistence.jdbc.driver", "org.postgresql.Driver");
        persistenceMap.put("javax.persistence.schema-generation.database.action", "create-or-extend-tables");
        return Persistence.createEntityManagerFactory("PersistenceUnit", persistenceMap);


    }


    public boolean isThisDataBaseOnline() {
        loadCredentials();
        try {
            LOG.info("============  ping heroku");
            LOG.info(connectionString + username + password);
            Class.forName("com.mysql.jdbc.Driver");
            Connection connect = (Connection) DriverManager.getConnection(connectionString, username, password);
            return true;

        } catch (ClassNotFoundException | SQLException e) {
            LOG.error("============  this database is OFFLINE");
            return false;
        }
    }


    private void loadCredentials(){
        URI dbUri = null;
        try {
            dbUri = new URI(System.getenv("DATABASE_URL"));
        } catch (URISyntaxException e) {
            e.printStackTrace();
        }
        username = dbUri.getUserInfo().split(":")[0];
        password = dbUri.getUserInfo().split(":")[1];
        connectionString = "jdbc:postgresql://" + dbUri.getHost() + ':' + dbUri.getPort() + dbUri.getPath();
    }
}
