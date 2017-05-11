/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package persistencia;

import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaDelete;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import javax.transaction.Transactional;

/**
 *
 * @author agile
 */
public abstract class DAO<T> implements IDao<T> {

    private Class<T> entityClass;
    private BaseDatos baseDatos;

//    @PersistenceContext
//    protected EntityManager entityManager;
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

    public int count() {
        CriteriaQuery cq = getEntityManager().getCriteriaBuilder().createQuery();
        Root<T> rt = cq.from(entityClass);
        cq.select(getEntityManager().getCriteriaBuilder().count(rt));
        javax.persistence.Query q = getEntityManager().createQuery(cq);
        return ((Long) q.getSingleResult()).intValue();
    }

}
