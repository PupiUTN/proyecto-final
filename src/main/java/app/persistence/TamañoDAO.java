/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package app.persistence;

import app.models.entities.Tamaño;
import org.springframework.stereotype.Repository;

/**
 *
 * @author agile
 */
@Repository
public class TamañoDAO extends DAO<Tamaño> {

    public TamañoDAO() throws Exception {
                super(Tamaño.class);
    }

    public void cargarDatos() {
        if (count() == 0) {

            Tamaño tamañoS = new Tamaño();
            tamañoS.setNombre('S');
            Tamaño tamañoM = new Tamaño();
            tamañoM.setNombre('M');
            Tamaño tamañoL = new Tamaño();
            tamañoL.setNombre('L');

            create(tamañoS);
            create(tamañoM);
            create(tamañoL);

        }

    }

}
