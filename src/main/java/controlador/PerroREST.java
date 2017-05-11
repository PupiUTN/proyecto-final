/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package controlador;

import java.util.List;
import javax.ejb.Stateless;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import modelo.Perro;
import persistencia.PerroDAO;

/**
 *
 * @author agile
 */
@Stateless
@Path("perros")
public class PerroREST {

    public PerroREST() {
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public void create(Perro entity) throws Exception {
        System.out.println(entity);
        PerroDAO perroDAO = new PerroDAO();
        perroDAO.create(entity);
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Perro> findAll() throws Exception {
        PerroDAO perroDAO = new PerroDAO();
        List<Perro> findAll = perroDAO.findAll();
        return findAll;
    }

}
