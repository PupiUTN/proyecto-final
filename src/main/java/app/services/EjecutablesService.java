package app.services;

import app.persistence.*;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Date;


/**
 * Created by fbackhaus on 7/6/17.
 */
@Service
public class EjecutablesService {

    private final Logger LOG = Logger.getLogger(this.getClass());
    @Autowired
    RazaDAO razaDAO;
    @Autowired
    VacunaDAO vacunaDAO;
    @Autowired
    TamañoDAO tamañoDAO;
    @Autowired
    DueñoDAO dueñoDAO;
    @Autowired
    PerroDAO perroDAO;
    @Autowired
    ProvinciaDAO provinciaDAO;
    @Autowired
    LocalidadDAO localidadDAO;
    @Autowired
    DireccionDAO direccionDAO;
    @Autowired
    CuidadorDAO cuidadorDAO;
    @Autowired
    ReservaDAO reservaDAO;
    @Autowired
    CalificacionDAO calificacionDAO;

    public String insert() throws Exception {
        //ES MUY IMPORTANTE EL ORDEN
        razaDAO.cargarDatos();
        vacunaDAO.cargarDatos();
        tamañoDAO.cargarDatos();
        dueñoDAO.cargarDatos();
        perroDAO.cargarDatos();
        provinciaDAO.cargarDatos();
        localidadDAO.cargarDatos();
        direccionDAO.cargarDatos();
        cuidadorDAO.cargarDatos();
        //rompe en heroku
//        reservaDAO.cargarDatos();
//        calificacionDAO.cargarDatos();

        return " insert : " + new Date();
    }

    public String drop() throws Exception {
        //ES MUY IMPORTANTE EL ORDEN
        //transaccion
        calificacionDAO.removeAll();
        reservaDAO.removeAll();
        cuidadorDAO.removeAll();
        direccionDAO.removeAll();
        localidadDAO.removeAll();
        provinciaDAO.removeAll();
        perroDAO.removeAll();
        dueñoDAO.removeAll();
        tamañoDAO.removeAll();
        vacunaDAO.removeAll();
        razaDAO.removeAll();
        return " drop (Remove all) : " + new Date();
    }
}
