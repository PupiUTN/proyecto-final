package app.services;

import app.persistence.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Date;

/**
 * Created by fbackhaus on 7/6/17.
 */
@Service
public class EjecutablesService {

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
        //soprte
        razaDAO.cargarDatos();
        vacunaDAO.cargarDatos();
        tamañoDAO.cargarDatos();
        //dueno
        dueñoDAO.cargarDatos();
        //Perro
        perroDAO.cargarDatos();
        //Provincia
        provinciaDAO.cargarDatos();
        //Localidad
        localidadDAO.cargarDatos();
        //Direccion
        direccionDAO.cargarDatos();
        //Cuidador
        cuidadorDAO.cargarDatos();
        //transaccion
        reservaDAO.cargarDatos();
        calificacionDAO.cargarDatos();
        return " insert : " + new Date();
    }

    public String drop() throws Exception {

        //transaccion
        calificacionDAO.removeAll();
        reservaDAO.removeAll();

        //soprte
        vacunaDAO.removeAll();
        //Perro
        perroDAO.removeAll();
        //Soporte Perro
        razaDAO.removeAll();

        tamañoDAO.removeAll();
        //dueno
        dueñoDAO.removeAll();
        //Cuidador

        cuidadorDAO.removeAll();
        //Direccion
        direccionDAO.removeAll();

        return " drop (Remove all) : " + new Date();
    }
}
