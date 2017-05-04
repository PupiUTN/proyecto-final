/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package persistencia;

import java.util.List;
import modelo.Dueno;
import modelo.Perro;
import modelo.Raza;
import modelo.Tamanio;
import modelo.Vacuna;

/**
 *
 * @author agile
 */
public class PerroDAO extends DAO<Perro> {

    public PerroDAO() throws Exception {
        super(Perro.class);

    }

    public void cargarDatos() throws Exception {
        if (count() == 0) {
            RazaDAO razaDAO = new RazaDAO();
            List<Raza> findAllRazas = razaDAO.findAll();

            TamanioDAO tamanioDAO = new TamanioDAO();
            List<Tamanio> findAllTamanio = tamanioDAO.findAll();

            VacunaDAO vacunaDAO = new VacunaDAO();
            List<Vacuna> findAllVacuna = vacunaDAO.findAll();

            DuenoDAO duenoDAO = new DuenoDAO();
            List<Dueno> findAllDueno = duenoDAO.findAll();
            // PERRO 1
            Perro betoben = new Perro();
            betoben.setDueno(findAllDueno.remove(0));
            betoben.setNombre("Betoben");
            betoben.setRaza(findAllRazas.remove(0));
            betoben.setTamanio(findAllTamanio.remove(0));
            betoben.setVacunacionList(findAllVacuna);
            betoben.setComentario("una pelicula");

            //PERRO 2
            Perro fatigas = new Perro();
            fatigas.setDueno(findAllDueno.remove(0));
            fatigas.setNombre("Fatigas");
            fatigas.setRaza(findAllRazas.remove(0));
            fatigas.setTamanio(findAllTamanio.remove(0));
            fatigas.setVacunacionList(findAllVacuna);
            fatigas.setComentario("De pelaje blanco y contextura gorda, generalmente aparece echado en algún lugar, prioritariamente en el vetusto sillón preferido de la familia, sin hacer nada. ");

            create(fatigas);
            create(betoben);
        }

    }

}
