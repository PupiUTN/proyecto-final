/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package app.persistence.conection;

import com.mysql.jdbc.Connection;
import org.slf4j.LoggerFactory;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import java.net.URI;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author jose
 * Refactor : Gabi
 */

public class BaseDatos {

    private static EntityManagerFactory emf;
    private EntityManager em;
    public BaseDatos() throws Exception {
        initEntityManagerFactory();
        if (em == null) {
            em = emf.createEntityManager();
        }
    }

    private void initEntityManagerFactory() throws Exception {

        ConectionMySql cm [] = new ConectionMySql[7];
        cm[0] = new MySqlJose();
        cm[1] = new MySqlJorge();
        cm[2] = new MySqlPaolo();
        cm[3] = new MySqlOpenShift();
        cm[4] = new MySqlHeroku();
        cm[5] = new MySqlFede();
        cm[6] = new MySqlGabi();
        for (int i = 0; i < cm.length; i++) {

           if( cm[i].isThisDataBaseOnline()){
              emf = cm[i].conectionWithBd(emf);
            break;
        }
        }
    }
    public EntityManager getEntityManager() {
        return em;
    }

}
