/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package app.persistence;

import app.models.entities.Provincia;
import org.springframework.stereotype.Repository;

import java.io.File;

/**
 *
 * @author jorge
 */
@Repository
public class ProvinciaDAO extends DAO<Provincia> {

    public ProvinciaDAO() throws Exception {
        super(Provincia.class);
    }

    public void cargarDatos() throws Exception {
        if (count() == 0) {

            String rootPath = System.getProperty("user.dir");
            this.execSQL(rootPath+ File.separator +"src"+ File.separator +"main"+ File.separator +"sql"+ File.separator +"Provincia.sql");

        }
    }

}