/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package app.persistence;

import app.persistencia.Conection.*;
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
   private static final int LOCALGabi = 7;

    private String conexionJose = "jdbc:mysql://localhost:6603/pupi";
    private String userJose = "root";
    private String passwordJose = "mypassword";

    private String conexionJorge = "jdbc:mysql://localhost:3306/pupi";
    private String userJorge = "root";
    private String passwordJorge = "mypassword";

    private String conexionPaolo = "jdbc:mysql://localhost:3306/pupi";
    private String userPaolo = "root";
    private String passwordPaolo = "MilikiJimenezCrack77";


    private String conexionGabi = "jdbc:mysql://localhost:3306/pupi";
    private String userGabi = "root";
    private String passwordGabi = "6732";

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
       selector = decidirBaseDatos();
        BaseDatosSql baseBd = new BaseDatosSql();
        if (emf == null && selector > 0) {
             if (selector== 1)
             {
                 //cambio de estado a jose : la app se conectará con mysql de jose
                 baseBd.setTypeWeather(new MySqlJose());
                 emf =  baseBd.request(emf);
             }
             else{
                 if(selector == 2)
                 {
                     //cambio de estado a jorge: la app se conectará con mysql de jorge
                     baseBd.setTypeWeather(new MySqlJorge());
                     emf =  baseBd.request(emf);
                 }
                 else {

                     if (selector == 3)
                     {
                         //cambio de estado a paolo: la app se conectará con mysql de paolo
                         baseBd.setTypeWeather(new MySqlPaolo());
                         emf =  baseBd.request(emf);
                     }
                     else{
                         if (selector == 4)
                         {
                             //cambio de estado a openShift: la app se conectará con mysql de openshift
                             baseBd.setTypeWeather(new MySqlOpenShift());
                             emf =  baseBd.request(emf);
                         }
                         else{
                             if (selector == 5)
                             {  //cambio de estado a Heroku: la app se conectará con Heroku
                               //  baseBd.setTypeWeather(new MySqlHeroku());
                                 //emf =  baseBd.request(emf);
                                 heroku();
                             }
                             else{
                                 if (selector == 6)
                                 {
                                     //cambio de estado a fede: la app se conectará con mysql de fede
                                     baseBd.setTypeWeather(new MySqlFede());
                                     emf =  baseBd.request(emf);
                                 }
                                 else{

                                     //cambio de estado a gabi: la app se conectará con mysql de gabi
                                     baseBd.setTypeWeather(new MySqlGabi());
                                     emf =  baseBd.request(emf);
                                 }
                             }
                         }
                     }
                 }
             }
        }
    }

    protected EntityManager getEntityManager() {
        return em;
    }

    public int decidirBaseDatos() throws Exception {
        Connection connect;
        //se ejecuta una sola vez en toda la vida de la aplicaccion
            System.out.println("============  decidirBaseDatos()");
            try {
                System.out.println("============  pruebo jose");
                logger.info(conexionJose + userJose + passwordJose);
                Class.forName("com.mysql.jdbc.Driver");
                connect = (Connection) DriverManager.getConnection(conexionJose, userJose, passwordJose);
               return LOCAljose;

            } catch (ClassNotFoundException | SQLException ex) {
                Logger.getLogger(BaseDatos.class.getName()).log(Level.SEVERE, null, ex);
                try {
                    System.out.println("============  pruebo jorge");
                    logger.info(conexionJorge +userJorge +passwordJorge);

                    connect = (Connection) DriverManager.getConnection(conexionJorge + "?user=" + userJorge + "&password=" + passwordJorge);
                    return LOCAljorge;
                } catch (SQLException ex2) {
                    Logger.getLogger(BaseDatos.class.getName()).log(Level.SEVERE, null, ex2);
                    try {
                        System.out.println("============  pruebo paolo");
                        logger.info(conexionPaolo +userPaolo +passwordPaolo);
                        connect = (Connection) DriverManager.getConnection(conexionPaolo + "?user=" + userPaolo + "&password=" + passwordPaolo);
                        return LOCAlpaolo;
                    } catch (SQLException ex3) {
                        Logger.getLogger(BaseDatos.class.getName()).log(Level.SEVERE, null, ex3);

                        try {
                            System.out.println("============  pruebo Gabi");
                            connect = (Connection) DriverManager.getConnection( conexionGabi + "?user=" + userGabi + "&password=" + passwordGabi);
                            return LOCALGabi;
                        } catch (SQLException ex4) {
                            Logger.getLogger(BaseDatos.class.getName()).log(Level.SEVERE, null, ex2);

                            try {
                            System.out.println("============  pruebo open shift");
                            logger.info(conexionOpenShift +userOpenShift + passwordOpenShift);
                            connect = (Connection) DriverManager.getConnection(conexionOpenShift + "?user=" + userOpenShift + "&password=" + passwordOpenShift);
                                return OpenShift;

                        } catch (Exception ex5) {
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
                                return HEROKU;

                            } catch (Exception ex6) {
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


}
