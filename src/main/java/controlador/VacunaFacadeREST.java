/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package controlador;

import java.util.List;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import modelo.Vacuna;
import persistencia.VacunaDAO;

/**
 *
 * @author Usuario
 */
@Stateless
@Path("vacunas")
public class VacunaFacadeREST {

    public VacunaFacadeREST() {
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Vacuna> findAll() throws Exception {
        return new VacunaDAO().findAll();
    }

    
}
