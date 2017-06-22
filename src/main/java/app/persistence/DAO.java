/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package app.persistence;

import java.io.File;
import java.io.FileNotFoundException;
import javax.persistence.EntityManager;
import javax.persistence.Query;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaDelete;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import java.util.List;
import java.util.Scanner;

import app.persistence.conection.BaseDatos;
import org.apache.commons.lang.StringUtils;


/**
 *
 * @author agile
 */
public abstract class DAO<T> implements IDao<T> {

    private Class<T> entityClass;
    private BaseDatos baseDatos;

    public DAO(Class<T> entityClass) throws Exception {
        this.entityClass = entityClass;
        baseDatos = new BaseDatos();
    }

    protected EntityManager getEntityManager() {
        // return entityManager;
        return baseDatos.getEntityManager();
    }

    public void create(T entity) {
        getEntityManager().getTransaction().begin();
        getEntityManager().persist(entity);
        getEntityManager().getTransaction().commit();

    }

    public void edit(T entity) {

        getEntityManager().getTransaction().begin();
        getEntityManager().merge(entity);
        getEntityManager().getTransaction().commit();

    }

    public void remove(T entity) {
        getEntityManager().getTransaction().begin();
        getEntityManager().remove(getEntityManager().merge(entity));
        getEntityManager().getTransaction().commit();

    }
    //se puede mejorar TODO
    //se puede usar una consulta JPQL
    public void removeID(Object id) {
        getEntityManager().getTransaction().begin();
        T entity = getEntityManager().find(entityClass, id);
        getEntityManager().remove(getEntityManager().merge(entity));
        getEntityManager().getTransaction().commit();

    }

    public void removeAll() {
        getEntityManager().getTransaction().begin();

        CriteriaBuilder cBuilder = getEntityManager().getCriteriaBuilder();
        CriteriaDelete<T> cq = cBuilder.createCriteriaDelete(entityClass);
        Root<T> root = cq.from(entityClass);
        int result = getEntityManager().createQuery(cq).executeUpdate();
        getEntityManager().getTransaction().commit();

    }

    public T find(Object id) {
        return getEntityManager().find(entityClass, id);
    }

    public List<T> findAll() {
        CriteriaQuery cq = getEntityManager().getCriteriaBuilder().createQuery();
        cq.select(cq.from(entityClass));
        return getEntityManager().createQuery(cq).getResultList();
    }

    public List<T> findRange(int[] range) {
        CriteriaQuery cq = getEntityManager().getCriteriaBuilder().createQuery();
        cq.select(cq.from(entityClass));
        Query q = getEntityManager().createQuery(cq);
        q.setMaxResults(range[1] - range[0] + 1);
        q.setFirstResult(range[0]);
        return q.getResultList();
    }

    public List<T> findAll(String attribute, Object value) throws Exception{
        CriteriaQuery cq = getEntityManager().getCriteriaBuilder().createQuery();
        Root<T> t=cq.from(entityClass);
        cq.select(t).where(t.get(attribute).in(value));
        return getEntityManager().createQuery(cq).getResultList();
    }

    public int count() {
        CriteriaQuery cq = getEntityManager().getCriteriaBuilder().createQuery();
        Root<T> rt = cq.from(entityClass);
        cq.select(getEntityManager().getCriteriaBuilder().count(rt));
        Query q = getEntityManager().createQuery(cq);
        return ((Long) q.getSingleResult()).intValue();
    }

    public void execSQL(String path) throws FileNotFoundException {
        getEntityManager().getTransaction().begin();
        File file =new File(path);
        Scanner sc= new Scanner(file, "utf-8");

        String sql="";
        while(sc.hasNext()){
            sql+=sc.nextLine();
        }

        String[] statements = sql.split(";");
        for (int i = 0; i < statements.length; i++) {

            String statement = statements[i];
            if(!StringUtils.isBlank(statement)){
                Query q = getEntityManager().createNativeQuery(statement);
                q.executeUpdate();
            }

        }
        getEntityManager().getTransaction().commit();
    }

}
