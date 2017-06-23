/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package app.persistence;

import app.models.entities.Raza;
import java.io.File;
import org.springframework.stereotype.Repository;

/**
 *
 * @author agile
 */
@Repository
public class RazaDAO extends DAO<Raza> {

    public RazaDAO() throws Exception {
        super(Raza.class);
    }

    public void cargarDatos() throws Exception {
        if (count() == 0) {
                        String rootPath = System.getProperty("user.dir");
            this.execSQL(rootPath+ File.separator +"src"+ File.separator +"main"+ File.separator +"sql"+ File.separator +"Raza.sql");
//            Raza razaCalle = new Raza();
//            razaCalle.setNombre("callejero");
//            Raza razaPura = new Raza();
//            razaPura.setNombre("pura sangre");
//            create(razaPura);
//            create(razaCalle);

        }
    }
}
