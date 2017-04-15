/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ejecutables;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import persistencia.PerroDAO;

/**
 *
 * @author jose
 */
@Path("test")
public class EjecutablesREST {

    @Path("ping")
    @GET
    @Produces({MediaType.TEXT_PLAIN})
    public String ping() {
        return " Ping : " + new Date();
    }

    @Path("insert")
    @GET
    @Produces({MediaType.TEXT_PLAIN})
    public String insert() {
        PerroDAO perroDAO = new PerroDAO();
        perroDAO.cargarDatos();
        return " Insert: " + new Date();

    }

}
