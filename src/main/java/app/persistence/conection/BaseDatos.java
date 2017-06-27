/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package app.persistence.conection;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;


public class BaseDatos {

    private static EntityManagerFactory entityManagerFactory;
    private EntityManager entityManager;
    private ConectionStrategy conectionStrategy;

    public BaseDatos() throws Exception {
        initEntityManagerFactory();
        if (entityManager == null) {
            entityManager = entityManagerFactory.createEntityManager();
        }
    }

    private void initEntityManagerFactory() throws Exception {
        if (entityManagerFactory == null) {
            List<ConectionStrategy> conectionStrategies = new LinkedList<>();
            conectionStrategies.add(new StrategyJose());
            conectionStrategies.add(new StrategyJorge());
            conectionStrategies.add(new StrategyFede());
            conectionStrategies.add(new StrategyGabi());
            for (Iterator<ConectionStrategy> iterator = conectionStrategies.iterator(); iterator.hasNext(); ) {
                conectionStrategy = iterator.next();
                if (conectionStrategy.isThisDataBaseOnline()) {
                    entityManagerFactory = conectionStrategy.getEntityManagerFactory();
                    break;

                }
            }
        }


    }

    public EntityManager getEntityManager() {
        return entityManager;
    }

}
