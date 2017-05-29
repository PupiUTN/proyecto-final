/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package persistencia;

import modelo.Provincia;

/**
 *
 * @author jorge
 */
public class ProvinciaDAO extends DAO<Provincia> {

    public ProvinciaDAO() throws Exception {
        super(Provincia.class);
    }

    public void cargarDatos() throws Exception {
        if (count() == 0) {
            
            
            this.execSQL("src\\main\\sql\\Provincia.sql");
//            Provincia cordoba = new  Provincia();
//            cordoba.setNombre("Cordoba");
//            create(cordoba);
//            
//            Provincia buenosAires = new Provincia();
//            buenosAires.setNombre("Capital Federal");
//            create(buenosAires);
            
        }
    }

}
