/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package app.persistence;

import app.models.entities.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 *
 * @author agile
 */
@Repository
public class PerroDAO extends DAO<Perro> {

    @Autowired
    RazaDAO razaDAO;
    @Autowired
    TamañoDAO tamañoDAO;
    @Autowired
    VacunaDAO vacunaDAO;
    @Autowired
    DueñoDAO dueñoDAO;

    public PerroDAO() throws Exception {
        super(Perro.class);

    }

    public void cargarDatos() throws Exception {
        if (count() == 0) {
            List<Raza> findAllRazas = razaDAO.findAll();

            List<Tamaño> findAllTamaño = tamañoDAO.findAll();

            List<Vacuna> findAllVacuna = vacunaDAO.findAll();

            List<Dueño> findAllDueño = dueñoDAO.findAll();
            // PERRO 1
            Perro betoben = new Perro();
            betoben.setDueño(findAllDueño.remove(0));
            betoben.setNombre("Betoben");
            betoben.setRaza(findAllRazas.remove(0));
            betoben.setTamaño(findAllTamaño.remove(0));
            betoben.setVacunacionList(findAllVacuna);
            betoben.setComentario("una pelicula");
            create(betoben);

            //PERRO 2
            Perro fatigas = new Perro();
            fatigas.setDueño(findAllDueño.remove(0));
            fatigas.setNombre("Fatigas");
            fatigas.setRaza(findAllRazas.remove(0));
            fatigas.setTamaño(findAllTamaño.remove(0));
            fatigas.setVacunacionList(findAllVacuna);
            fatigas.setComentario("De pelaje blanco y contextura gorda, generalmente aparece echado en algún lugar, prioritariamente en el vetusto sillón preferido de la familia, sin hacer nada. ");

            create(fatigas);
        }

    }

}
