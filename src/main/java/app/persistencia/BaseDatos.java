/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package app.persistencia;

import com.mysql.jdbc.Connection;
import org.slf4j.LoggerFactory;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import java.net.URI;
import java.net.URISyntaxException;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author jose
 */
// solo visible para su packete, asi resperamos el uso de los daos de cada clase
public class BaseDatos {

    private static EntityManagerFactory emf;
    private EntityManager em;

    protected org.slf4j.Logger logger = LoggerFactory.getLogger(this.getClass());
    // se pueden mejorar todas las consultas con el criteria API en vez de escribir la consulta
    private static int selector = -1;
    private static final int LOCAljose = 1;
    private static final int LOCAljorge = 2;
    private static final int LOCAlpaolo = 3;
    private static final int OpenShift = 4;
    private static final int HEROKU = 5;
    private static final int LOCAlfede = 6;
    private String conexionJose = "jdbc:mysql://localhost:6603/pupi";
    private String userJose = "root";
    private String passwordJose = "mypassword";

    private String conexionJorge = "jdbc:mysql://localhost:3306/pupi";
    private String userJorge = "root";
    private String passwordJorge = "mypassword";

    private String conexionPaolo = "jdbc:mysql://localhost:3306/pupi";
    private String userPaolo = "root";
    private String passwordPaolo = "MilikiJimenezCrack77";

    private String conexionFede = "jdbc:mysql://localhost:3306/pupi";
    private String userFede = "root";
    private String passwordFede = "mypassword";

    private String hostOpenShift = System.getenv("OPENSHIFT_MYSQL_DB_HOST");
    private String portOpenShift = System.getenv("OPENSHIFT_MYSQL_DB_PORT");
    private String userOpenShift = System.getenv("OPENSHIFT_MYSQL_DB_USERNAME");
    private String passwordOpenShift = System.getenv("OPENSHIFT_MYSQL_DB_PASSWORD");
    private String conexionOpenShift = "jdbc:mysql://" + hostOpenShift + ":" + portOpenShift + "/pupi";






    //jdbc:mysql://" + host + ":" + port + "/pupi
    public BaseDatos() throws Exception {
        initEntityManagerFactory();
        if (em == null) {
            em = emf.createEntityManager();
        }
    }

    private void initEntityManagerFactory() throws Exception {
        decidirBaseDatos();
        if (emf == null) {
            switch (selector) {
                case LOCAljose:
                    localMySQlJose();
                    break;
                case LOCAljorge:
                    localMySQljorge();
                    break;
                case LOCAlpaolo:
                    localMySQlpaolo();
                    break;
                case OpenShift:
                    openShift();
                    break;
                case LOCAlfede:
                    localMySQlFede();
                case HEROKU:
                    heroku();
                    break;
            }
        }
    }

    protected EntityManager getEntityManager() {
        return em;
    }

    public void decidirBaseDatos() throws Exception {
        Connection connect;
        //se ejecuta una sola vez en toda la vida de la aplicaccion
        if (selector == -1) {
            System.out.println("============  decidirBaseDatos()");
            try {
                System.out.println("============  pruebo jose");
                logger.info(conexionJose + userJose + passwordJose);
                Class.forName("com.mysql.jdbc.Driver");
                connect = (Connection) DriverManager.getConnection(conexionJose, userJose, passwordJose);
                selector = LOCAljose;
            } catch (ClassNotFoundException | SQLException ex) {
                Logger.getLogger(BaseDatos.class.getName()).log(Level.SEVERE, null, ex);
                try {
                    System.out.println("============  pruebo jorge");
                    logger.info(conexionJorge +userJorge +passwordJorge);

                    connect = (Connection) DriverManager.getConnection(conexionJorge + "?user=" + userJorge + "&password=" + passwordJorge);
                    selector = LOCAljorge;
                } catch (SQLException ex2) {
                    Logger.getLogger(BaseDatos.class.getName()).log(Level.SEVERE, null, ex2);
                    try {
                        System.out.println("============  pruebo paolo");
                        logger.info(conexionPaolo +userPaolo +passwordPaolo);
                        connect = (Connection) DriverManager.getConnection(conexionPaolo + "?user=" + userPaolo + "&password=" + passwordPaolo);
                        selector = LOCAlpaolo;
                    } catch (SQLException ex3) {
                        Logger.getLogger(BaseDatos.class.getName()).log(Level.SEVERE, null, ex3);
                        try {
                            System.out.println("============  pruebo open shift");
                            logger.info(conexionOpenShift +userOpenShift + passwordOpenShift);
                            connect = (Connection) DriverManager.getConnection(conexionOpenShift + "?user=" + userOpenShift + "&password=" + passwordOpenShift);
                            selector = OpenShift;

                        } catch (Exception ex4) {
                            Logger.getLogger(BaseDatos.class.getName()).log(Level.SEVERE, null, ex4);
                            try {
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
                                selector = HEROKU;

                            } catch (Exception ex5) {
                                throw ex5;
                            }
                        }

                    }
                }
            }
        }

    }


    private void heroku() throws URISyntaxException {
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

    private void openShift() {
        System.out.println("============================= CONFIGURO OPEN SHIFT");
        Map<String, String> persistenceMap = new HashMap<>();
        persistenceMap.put("javax.persistence.jdbc.url", "jdbc:mysql://" + hostOpenShift + ":" + portOpenShift + "/pupi");
        persistenceMap.put("javax.persistence.jdbc.user", userOpenShift);
        persistenceMap.put("javax.persistence.jdbc.password", passwordOpenShift);
        persistenceMap.put("javax.persistence.jdbc.driver", "com.mysql.jdbc.Driver");
        persistenceMap.put("javax.persistence.schema-generation.database.action", "create-or-extend-tables");

        emf = Persistence.createEntityManagerFactory("PersistenceUnit", persistenceMap);
    }

    private void localMySQlJose() {
        System.out.println("============================= CONFIGURO local MYSQL jose");
        Map<String, String> persistenceMap = new HashMap<>();
        persistenceMap.put("javax.persistence.jdbc.url", conexionJose);
        persistenceMap.put("javax.persistence.jdbc.user", userJose);
        persistenceMap.put("javax.persistence.jdbc.password", passwordJose);
        persistenceMap.put("javax.persistence.jdbc.driver", "com.mysql.jdbc.Driver");
        persistenceMap.put("javax.persistence.schema-generation.database.action", "create-or-extend-tables");
        emf = Persistence.createEntityManagerFactory("PersistenceUnit", persistenceMap);
    }

    private void localMySQljorge() {
        System.out.println("============================= CONFIGURO local MYSQL jorge");
        Map<String, String> persistenceMap = new HashMap<>();
        persistenceMap.put("javax.persistence.jdbc.url", conexionJorge);
        persistenceMap.put("javax.persistence.jdbc.user", userJorge);
        persistenceMap.put("javax.persistence.jdbc.password", passwordJorge);
        persistenceMap.put("javax.persistence.jdbc.driver", "com.mysql.jdbc.Driver");
        persistenceMap.put("javax.persistence.schema-generation.database.action", "create-or-extend-tables");
        emf = Persistence.createEntityManagerFactory("PersistenceUnit", persistenceMap);

    }

    private void localMySQlpaolo() {
        System.out.println("============================= CONFIGURO local MYSQL jose");
        Map<String, String> persistenceMap = new HashMap<>();
        persistenceMap.put("javax.persistence.jdbc.url", conexionPaolo);
        persistenceMap.put("javax.persistence.jdbc.user", userPaolo);
        persistenceMap.put("javax.persistence.jdbc.password", passwordPaolo);
        persistenceMap.put("javax.persistence.jdbc.driver", "com.mysql.jdbc.Driver");
        persistenceMap.put("javax.persistence.schema-generation.database.action", "create-or-extend-tables");
        emf = Persistence.createEntityManagerFactory("PersistenceUnit", persistenceMap);

    }

    private void localMySQlFede() {
        System.out.println("============================= CONFIGURO local MYSQL fede");
        Map<String, String> persistenceMap = new HashMap<>();
        persistenceMap.put("javax.persistence.jdbc.url", conexionFede);
        persistenceMap.put("javax.persistence.jdbc.user", userFede);
        persistenceMap.put("javax.persistence.jdbc.password", passwordFede);
        persistenceMap.put("javax.persistence.jdbc.driver", "com.mysql.jdbc.Driver");
        persistenceMap.put("javax.persistence.schema-generation.database.action", "create-or-extend-tables");
        emf = Persistence.createEntityManagerFactory("PersistenceUnit", persistenceMap);

    }

}
