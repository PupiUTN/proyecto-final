/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package persistencia;

import com.mysql.jdbc.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.Date;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.NoResultException;
import javax.persistence.Persistence;
import javax.persistence.Query;
import modelo.Perro;
import modelo.Raza;
import modelo.Tamanio;
import modelo.Vacuna;

/**
 *
 * @author jose
 */
// solo visible para su packete, asi resperamos el uso de los daos de cada clase
class BaseDatos<T> {

    private static EntityManagerFactory emf;
    EntityManager em;
    private Class<T> entityClass;
    // se pueden mejorar todas las consultas con el criteria API en vez de escribir la consulta
    private static int selector = -1;
    private static final int LOCAl = 1;
    private static final int OpenShift = 2;
    private String conexionJose = "jdbc:mysql://localhost:6603/pupi";
    private String conexionCompleto = "jdbc:mysql://localhost:6603/pupi?user=root&password=mypassword";

    public BaseDatos() {
        initEntityManagerFactory();
        em = emf.createEntityManager();
    }

    private void initEntityManagerFactory() {
        decidirBaseDatos();
        if (emf == null) {
            switch (selector) {
                case LOCAl:
                    localMySQlJose();
                    break;
                case OpenShift:
                    openShift();
                    break;
            }
        }
    }

    public void create(T entity) {
        em.persist(entity);
    }

    public void edit(T entity) {
        em.merge(entity);
    }

    public void remove(T entity) {
        em.remove(em.merge(entity));
    }

    public T find(Object id) {
        return em.find(entityClass, id);
    }

    public List<T> findAll() {
        javax.persistence.criteria.CriteriaQuery cq = em.getCriteriaBuilder().createQuery();
        cq.select(cq.from(entityClass));
        return em.createQuery(cq).getResultList();
    }

    public <T> void persist(Object o, Class<T> clazz) {
        em.getTransaction().begin();
        em.persist(clazz.cast(o));
        em.getTransaction().commit();
    }

    public <T> void remove(Object o, Class<T> clazz) {
        em.getTransaction().begin();
        em.remove(clazz.cast(o));
        em.getTransaction().commit();
    }

    public <T> T find(Object id, Class<T> clazz) {
        return em.find(clazz, id);
    }

    public EntityManager getEm() {
        return em;
    }

    public static void decidirBaseDatos() {
        //se ejecuta una sola vez en toda la vida de la aplicaccion
        if (selector == -1) {
            System.out.println("============  decidirBaseDatos()");
            try {
                Class.forName("com.mysql.jdbc.Driver");
                Connection connect;
                connect = (Connection) DriverManager.getConnection("jdbc:mysql://localhost:6603/pupi?user=root&password=mypassword");
                selector = LOCAl;
            } catch (ClassNotFoundException | SQLException ex) {
                System.out.println("============  ERROR CONEXION");
                selector = OpenShift;
                Logger.getLogger(BaseDatos.class.getName()).log(Level.SEVERE, null, ex);

            }
        }

    }

    private void openShift() {
        System.out.println("============================= CONFIGURO OPEN SHIFT");
        selector = OpenShift;
        String host = System.getenv("OPENSHIFT_MYSQL_DB_HOST");
        String port = System.getenv("OPENSHIFT_MYSQL_DB_PORT");
        String user = System.getenv("OPENSHIFT_MYSQL_DB_USERNAME");
        String password = System.getenv("OPENSHIFT_MYSQL_DB_PASSWORD");

        Map<String, String> persistenceMap = new HashMap<>();
        persistenceMap.put("javax.persistence.jdbc.url", "jdbc:mysql://" + host + ":" + port + "/solomochila");
        persistenceMap.put("javax.persistence.jdbc.user", user);
        persistenceMap.put("javax.persistence.jdbc.password", password);
        persistenceMap.put("javax.persistence.jdbc.driver", "com.mysql.jdbc.Driver");
        persistenceMap.put("javax.persistence.schema-generation.database.action", "create-or-extend-tables");

        emf = Persistence.createEntityManagerFactory("PersistenceUnit", persistenceMap);
    }

    private void localMySQlJose() {
        System.out.println("============================= CONFIGURO local MYSQL");
        selector = LOCAl;
        Map<String, String> persistenceMap = new HashMap<>();
        persistenceMap.put("javax.persistence.jdbc.url", conexionJose);
        persistenceMap.put("javax.persistence.jdbc.user", "root");
        persistenceMap.put("javax.persistence.jdbc.password", "mypassword");
        persistenceMap.put("javax.persistence.jdbc.driver", "com.mysql.jdbc.Driver");
        persistenceMap.put("javax.persistence.schema-generation.database.action", "create-or-extend-tables");

        emf = Persistence.createEntityManagerFactory("PersistenceUnit", persistenceMap);
    }

    public boolean cargarDatos() {
        Raza razaCalle = new Raza();
        razaCalle.setNombre("callejero");
        Raza razaPura = new Raza();
        razaPura.setNombre("pura sangre");

        Tamanio tamanioS = new Tamanio();
        tamanioS.setNombre('S');

        Tamanio tamanioM = new Tamanio();
        tamanioM.setNombre('M');

        Tamanio tamanioL = new Tamanio();
        tamanioL.setNombre('L');

        Vacuna vacunaRabia = new Vacuna();
        vacunaRabia.setNombre("rabia");
        List<Vacuna> vacunas = new LinkedList<>();
        vacunas.add(vacunaRabia);
        Perro betoben = new Perro();
        betoben.setNombre("Betoben");
        betoben.setRaza(razaPura);
        betoben.setTamanio(tamanioL);
        betoben.setVacunacionList(vacunas);
        betoben.setComentario("una pelicula");

        Perro fatigas = new Perro();
        fatigas.setNombre("fatigas");
        fatigas.setRaza(razaCalle);
        fatigas.setTamanio(tamanioS);
        fatigas.setVacunacionList(vacunas);
        fatigas.setComentario("pepe argento");
        em.getTransaction().begin();
        em.persist(fatigas);
        em.persist(betoben);
        em.getTransaction().commit();

        return true;
    }

}
