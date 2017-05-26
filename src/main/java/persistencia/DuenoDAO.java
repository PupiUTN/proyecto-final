/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package persistencia;

import modelo.Dueno;

/**
 *
 * @author agile
 */
public class DuenoDAO extends DAO<Dueno> {

    public DuenoDAO() throws Exception {
        super(Dueno.class);
    }

    public void cargarDatos() {
        if (count() == 0) {

            Dueno pepeDueno = new Dueno();
            pepeDueno.setNombre("Pepe Argento");

            Dueno larryPageDueno = new Dueno();
            larryPageDueno.setNombre("larry Page");
            create(pepeDueno);
            create(larryPageDueno);

        }
    }

}
