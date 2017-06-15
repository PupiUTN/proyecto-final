/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package app.persistence;

import app.models.entities.Dueño;
import org.springframework.stereotype.Repository;

/**
 *
 * @author agile
 */
@Repository
public class DueñoDAO extends DAO<Dueño> {

    public DueñoDAO() throws Exception {
        super(Dueño.class);
    }

    public void cargarDatos() {
        if (count() == 0) {

            Dueño pepeDueño = new Dueño();
            pepeDueño.setNombre("Pepe Argento");

            Dueño larryPageDueño = new Dueño();
            larryPageDueño.setNombre("larry Page");
            create(pepeDueño);
            create(larryPageDueño);

        }
    }

}
