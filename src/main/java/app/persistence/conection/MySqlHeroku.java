package app.persistence.conection;



import com.mysql.jdbc.Connection;
import org.slf4j.LoggerFactory;

import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import java.net.URI;

import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;


/**
 * Created by gabriellorenzatti on 10/6/17.
 */
public class MySqlHeroku implements ConectionMySql {


    private org.slf4j.Logger logger = LoggerFactory.getLogger(this.getClass());

    @Override
    public EntityManagerFactory conectionWithBd  (EntityManagerFactory emf)   {
         return  newHeroku(emf);

    }

    public EntityManagerFactory newHeroku  (EntityManagerFactory emf)
    {

        try{
       URI dbUri = new URI(System.getenv("DATABASE_URL"));
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
        emf = Persistence.createEntityManagerFactory("PersistenceUnit", persistenceMap);


        }
        catch(Exception ex)
        {
            System.out.println("error HEROKU");
        }

        return emf;
    }

    public  boolean isThisDataBaseOnline()
    {
        Connection connect;
        try {
            Class.forName("com.mysql.jdbc.Driver");
            URI dbUri = new URI(System.getenv("DATABASE_URL"));
            String hostHeroku = dbUri.getHost();
            int portHeroku = dbUri.getPort();
            String userHeroku = dbUri.getUserInfo().split(":")[0];
            String passwordHeroku = dbUri.getUserInfo().split(":")[1];
            String dbNameHeroku = dbUri.getPath();
            String conexionHeroku = "jdbc:postgresql://" + dbUri.getHost() + ':' + dbUri.getPort() + dbUri.getPath();

            System.out.println("============  pruebo heoroku");
            logger.info("Host Heroku:" + hostHeroku);
            logger.info("port Heroku:" + portHeroku);
            logger.info("user Heroku:" + userHeroku);
            logger.info("password Heroku:" + passwordHeroku);
            logger.info("dbName Heroku:" + dbNameHeroku);
            logger.info("conexion Heroku:" + conexionHeroku);
            Class.forName("org.postgresql.Driver");
            DriverManager.getConnection(conexionHeroku, userHeroku, passwordHeroku);
            return true;

        } catch ( Exception exec)  {
            return false;
        }
    }
}
