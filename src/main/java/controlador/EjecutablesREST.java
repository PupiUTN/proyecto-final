/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package controlador;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import persistencia.*;
import java.util.Date;

@RestController
@RequestMapping(value = "/api/test")
public class EjecutablesREST {

    @RequestMapping(value = "ping", method = RequestMethod.GET)
    public String ping() {
        return " Ping : " + new Date();
    }

    @RequestMapping(value = "insert", method = RequestMethod.GET)
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
        //Provincia
        ProvinciaDAO provinciaDAO= new ProvinciaDAO();
        provinciaDAO.cargarDatos();
        //Localidad
        LocalidadDAO localidadDAO = new LocalidadDAO();
        localidadDAO.cargarDatos();
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

    @RequestMapping(value = "drop", method = RequestMethod.GET)
    public String drop() throws Exception {

        //transaccion
        CalificacionDAO calificacionDAO = new CalificacionDAO();
        calificacionDAO.removeAll();
        ReservaDAO reservaDAO = new ReservaDAO();
        reservaDAO.removeAll();

        //soprte
        VacunaDAO vacunaDAO = new VacunaDAO();
        vacunaDAO.removeAll();
        //Perro
        PerroDAO perroDAO = new PerroDAO();
        perroDAO.removeAll();
        //Soporte Perro
        RazaDAO razaDAO = new RazaDAO();
        razaDAO.removeAll();

        TamanioDAO tamanioDAO = new TamanioDAO();
        tamanioDAO.removeAll();
        //dueno
        DuenoDAO duenoDAO = new DuenoDAO();
        duenoDAO.removeAll();
        //Cuidador

        CuidadorDAO cuidadorDAO = new CuidadorDAO();
        cuidadorDAO.removeAll();
        //Direccion
        DireccionDAO direccionDAO = new DireccionDAO();
        direccionDAO.removeAll();

        return " drop (Remove all) : " + new Date();
    }

}
