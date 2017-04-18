/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package controlador;

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
import modelo.Cuidador;
import modelo.Tamanio;
import modelo.Vacuna;
import persistencia.CalificacionDAO;
import persistencia.CuidadorDAO;
import persistencia.DuenoDAO;
import persistencia.HospedajeDAO;
import persistencia.PerroDAO;
import persistencia.RazaDAO;
import persistencia.ReservaDAO;
import persistencia.TamanioDAO;
import persistencia.VacunaDAO;

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
    public String insert() throws Exception {
        //soprte
        RazaDAO razaDAO = new RazaDAO();
        VacunaDAO vacunaDAO = new VacunaDAO();
        TamanioDAO tamanioDAO = new TamanioDAO();
        //dueno
        DuenoDAO duenoDAO = new DuenoDAO();
        PerroDAO perroDAO = new PerroDAO();
        //Cuidador
        CuidadorDAO cuidadorDAO = new CuidadorDAO();
        HospedajeDAO hospedajeDAO = new HospedajeDAO();
        //transaccion
        ReservaDAO reservaDAO = new ReservaDAO();
        CalificacionDAO calificacionDAO = new CalificacionDAO();
        return " insert : " + new Date();
    }

}
