/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package controlador;

import java.util.List;
import javax.ejb.Stateless;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import modelo.Cuidador;
import persistencia.CuidadorDAO;

/**
 *
 * @author agile
 */
@Stateless
@Path("cuidadores")
public class CuidadorREST {

    public CuidadorREST() {
    }

    
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Cuidador> findAll() throws Exception {
        CuidadorDAO cuidadorDAO = new CuidadorDAO();
        return cuidadorDAO.findAll();
    }

    @GET
    @Path("{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Cuidador find(@PathParam("id") Long id) throws Exception {
        CuidadorDAO cuidadorDAO = new CuidadorDAO();
        return cuidadorDAO.find(id);
   
    }
    
    @DELETE
    @Path("{id}")
    //@Produces(MediaType.APPLICATION_JSON)
    public void delete(@PathParam("id") Long id) throws Exception {
        CuidadorDAO cuidadorDAO = new CuidadorDAO();
        cuidadorDAO.removeID(id);
        System.out.println("Eliminar "+id);
        //return cuidadorDAO.find(id);
   
    }
}
