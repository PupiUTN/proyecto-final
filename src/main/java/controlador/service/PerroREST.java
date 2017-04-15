/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package controlador.service;

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
import modelo.Perro;
import persistencia.PerroDAO;

/**
 *
 * @author agile
 */
@Stateless
@Path("perro")
public class PerroREST {

    private PerroDAO perroDAO;

    public PerroREST() {
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public void create(Perro entity) {
        System.out.println("======================================================");
        System.out.println(entity);
        perroDAO = new PerroDAO();
        perroDAO.persist(entity, Perro.class);
    }

    @PUT
    @Path("{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    public void edit(@PathParam("id") Long id, Perro entity) {
        perroDAO.edit(entity);
    }

    @DELETE
    @Path("{id}")
    public void remove(@PathParam("id") Long id) {
        perroDAO.remove(id, Perro.class);
    }

    @GET
    @Path("{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Perro find(@PathParam("id") Long id) {
        return null;

    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Perro> findAll() {
        perroDAO = new PerroDAO();
        return perroDAO.findAllPerros();
    }

}
