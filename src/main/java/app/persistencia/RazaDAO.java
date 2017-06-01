/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package app.persistencia;

import app.modelo.entidades.Raza;

/**
 *
 * @author agile
 */
public class RazaDAO extends DAO<Raza> {


    public RazaDAO() throws Exception {
        super(Raza.class);

    }

    public void cargarDatos() {
        if (count() == 0) {
            Raza razaCalle = new Raza();
            razaCalle.setNombre("callejero");
            Raza razaPura = new Raza();
            razaPura.setNombre("pura sangre");
            create(razaPura);
            create(razaCalle);

        }
    }
}
