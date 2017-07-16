/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package app.persistence;

import app.models.entities.Localidad;
import org.springframework.stereotype.Repository;

import java.io.File;

/**
 * @author jorge
 */
@Repository
public class LocalidadDAO extends DAO<Localidad> {

    public LocalidadDAO() throws Exception {
        super(Localidad.class);
    }

    public void cargarDatos() throws Exception {
        if (count() == 0) {
            String rootPath = System.getProperty("user.dir");
            this.execSQL(rootPath + File.separator + "src" + File.separator + "main" + File.separator + "resources" + File.separator + "sql" + File.separator + "Localidad.sql");

        }
    }

}
