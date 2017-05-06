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
import modelo.Direccion;
import modelo.Tamanio;
import modelo.Vacuna;
import persistencia.CalificacionDAO;
import persistencia.CuidadorDAO;
import persistencia.DireccionDAO;
import persistencia.DuenoDAO;
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
        razaDAO.cargarDatos();
        VacunaDAO vacunaDAO = new VacunaDAO();
        vacunaDAO.cargarDatos();
        TamanioDAO tamanioDAO = new TamanioDAO();
        tamanioDAO.cargarDatos();
        //dueno
        DuenoDAO duenoDAO = new DuenoDAO();
        duenoDAO.cargarDatos();
        //Perro
        PerroDAO perroDAO = new PerroDAO();
        perroDAO.cargarDatos();
        //Direccion
        DireccionDAO direccionDAO = new DireccionDAO();
        direccionDAO.cargarDatos();
        //Cuidador
        CuidadorDAO cuidadorDAO = new CuidadorDAO();
        cuidadorDAO.cargarDatos();
        //transaccion
        ReservaDAO reservaDAO = new ReservaDAO();
        reservaDAO.cargarDatos();
        CalificacionDAO calificacionDAO = new CalificacionDAO();
        calificacionDAO.cargarDatos();
        return " insert : " + new Date();
    }
    
    
    @Path("drop")
    @GET
    @Produces({MediaType.TEXT_PLAIN})
    public String drop() throws Exception {
        //soprte
        RazaDAO razaDAO = new RazaDAO();
        razaDAO.removeAll();
        VacunaDAO vacunaDAO = new VacunaDAO();
        vacunaDAO.removeAll();
        TamanioDAO tamanioDAO = new TamanioDAO();
        tamanioDAO.removeAll();
        //dueno
        DuenoDAO duenoDAO = new DuenoDAO();
        duenoDAO.removeAll();
        //Perro
        PerroDAO perroDAO = new PerroDAO();
        perroDAO.removeAll();
        //Direccion
        DireccionDAO direccionDAO = new DireccionDAO();
        direccionDAO.removeAll();
        //Cuidador
        CuidadorDAO cuidadorDAO = new CuidadorDAO();
        cuidadorDAO.removeAll();
        //transaccion
        ReservaDAO reservaDAO = new ReservaDAO();
        reservaDAO.removeAll();
        CalificacionDAO calificacionDAO = new CalificacionDAO();
        calificacionDAO.removeAll();
        return " drop (Remove all) : " + new Date();
    }

}
