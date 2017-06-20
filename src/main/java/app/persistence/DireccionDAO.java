
package app.persistence;


import app.models.entities.Direccion;
import app.models.entities.Localidad;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.io.File;


/**
 *
 * @author agile
 */
@Repository
public class DireccionDAO extends DAO<Direccion> {

    @Autowired
    LocalidadDAO localidadDAO;

    public DireccionDAO() throws Exception {
        super(Direccion.class);
    }

    public void cargarDatos() throws Exception {
        if (count() == 0) {
            String rootPath = System.getProperty("user.dir");
            this.execSQL(rootPath + File.separator + "src" + File.separator + "main" + File.separator + "sql" + File.separator + "Direccion.sql");
        }
    }

}
