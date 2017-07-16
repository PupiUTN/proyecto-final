/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package app.persistence;

import app.models.entities.Cuidador;
import app.models.entities.Direccion;
import app.models.entities.Imagen;

import java.io.File;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.LinkedList;
import java.util.List;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Join;
import javax.persistence.criteria.Root;

/**
 * @author agile
 */
@Repository
public class CuidadorDAO extends DAO<Cuidador> {



    public CuidadorDAO() throws Exception {
        super(Cuidador.class);
    }

    public List<Cuidador> findPorLocalidad(int idLocalidad) {
        CriteriaBuilder cb = getEntityManager().getCriteriaBuilder();
        CriteriaQuery cq = cb.createQuery();
        Root<Cuidador> cuidador = cq.from(Cuidador.class);
        Join<Cuidador, Direccion> direccion = cuidador.join("direccion");
        cq.select(cuidador).where(direccion.get("localidad").in(idLocalidad));
        return getEntityManager().createQuery(cq).getResultList();
    }

    public void cargarDatos() throws Exception {
        if (count() == 0) {

            String rootPath = System.getProperty("user.dir");
            this.execSQL(rootPath + File.separator + "src" + File.separator + "main" + File.separator + "resources" + File.separator + "sql" + File.separator + "CUIDADOR.sql");
        }
    }

}
