/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package persistencia;

import java.util.List;
import modelo.Raza;
import modelo.Vacuna;

/**
 *
 * @author agile
 */
public class VacunaDAO<T> extends DAO<Vacuna> {

    public VacunaDAO() throws Exception {
        super(Vacuna.class);
    }

    public void cargarDatos() {
        if (count() == 0) {
            Vacuna vacunaRabia = new Vacuna();
            vacunaRabia.setNombre("Rabia");
            create(vacunaRabia);

            Vacuna vacunaParvovirus = new Vacuna();
            vacunaParvovirus.setNombre("Parvovirus");
            create(vacunaParvovirus);
        }

    }

}
