/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package persistencia;

import java.util.List;
import modelo.Cuidador;
import modelo.Dueno;
import modelo.Hospedaje;
import modelo.Raza;

/**
 *
 * @author agile
 */
public class HospedajeDAO extends DAO<Hospedaje> {

    public HospedajeDAO() throws Exception {
                super(Hospedaje.class);
        cargarDatos();
    }

    private void cargarDatos() throws Exception {
        if (count() == 0) {
            CuidadorDAO cuidadorDAO = new CuidadorDAO();
            List<Cuidador> findAllCuidador = cuidadorDAO.findAll();
            Hospedaje hospedaje1 = new Hospedaje();
            hospedaje1.setNombre("Casa de Campo Don Luis");
            hospedaje1.setCuidador(findAllCuidador.remove(0));
            
            
            Hospedaje hospedaje2 = new Hospedaje();
            hospedaje2.setNombre("Veterinaria Patitas");
            hospedaje2.setCuidador(findAllCuidador.remove(0));

            create(hospedaje1);
            create(hospedaje2);
        }
    }

}
