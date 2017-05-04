/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package persistencia;

import java.util.List;
import modelo.Cuidador;
import modelo.Dueno;

import modelo.Raza;

/**
 *
 * @author agile
 */
public class CuidadorDAO extends DAO<Cuidador> {

    public CuidadorDAO() throws Exception {
        super(Cuidador.class);
        cargarDatos();
    }

    private void cargarDatos() throws Exception {
        if (count() == 0) {
            Cuidador cuidador1 = new Cuidador();
            cuidador1.setNombre("El encantador de perros");

            Cuidador cuidador2 = new Cuidador();
            cuidador2.setNombre("Rastafari");
            create(cuidador1);
            create(cuidador2);
        }
    }

}
