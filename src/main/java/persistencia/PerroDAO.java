/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package persistencia;

import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.Query;
import modelo.Perro;

/**
 *
 * @author jose
 */
public class PerroDAO extends BaseDatos {
     
    public List<Perro> findAllPerros(){
        Query query = em.createQuery(" SELECT p FROM Perro p");
        return query.getResultList();
    }
    
    public void insert(){
        cargarDatos();
    }


}
