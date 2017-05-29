/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package persistencia;

import modelo.Localidad;

/**
 *
 * @author jorge
 */
public class LocalidadDAO extends DAO<Localidad> {

    public LocalidadDAO() throws Exception {
        super(Localidad.class);
    }

    public void cargarDatos() throws Exception {
        if (count() == 0) {
            this.execSQL("src\\main\\sql\\Localidad.sql");
        }
    }

}
