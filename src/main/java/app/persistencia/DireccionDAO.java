
package app.persistencia;


import app.modelo.entidades.Direccion;
import app.modelo.entidades.Localidad;
import java.io.File;


/**
 *
 * @author agile
 */
public class DireccionDAO extends DAO<Direccion> {

    public DireccionDAO() throws Exception {
        super(Direccion.class);
    }

    public void cargarDatos() throws Exception {
        if (count() == 0) {

            LocalidadDAO localidadDao = new LocalidadDAO();
            Localidad cordoba= localidadDao.find(543l);
            Localidad palermo= localidadDao.find(303l);
            
            Direccion direccion1 = new Direccion();
            direccion1.setNombre("Universidad Tecnológica Nacional - Facultad Regional Córdoba");
            direccion1.setLatitud(-31.442559);
            direccion1.setLongitud(-64.193351);
            direccion1.setLocalidad(cordoba);

            create(direccion1);

            Direccion direccion2 = new Direccion();
            direccion2.setNombre("Patio Olmos Shopping");
            direccion2.setLatitud(-31.4192673);
            direccion2.setLongitud(-64.1872098);
            direccion2.setLocalidad(cordoba);

            create(direccion2);

            Direccion direccion3 = new Direccion();
            direccion3.setNombre("Centro Cívico del Bicentenario Gobernador Juan Bautista Bustos");
            direccion3.setLatitud(-31.4202663);
            direccion3.setLongitud(-64.1755609);
            direccion3.setLocalidad(cordoba);

            create(direccion3);

            Direccion direccion4 = new Direccion();
            direccion4.setNombre("Museo Emilio Caraffa");
            direccion4.setLatitud(-31.4305744);
            direccion4.setLongitud(-64.1829213);
            direccion4.setLocalidad(cordoba);

            create(direccion4);

            Direccion direccion5 = new Direccion();
            direccion5.setNombre("Bosques de Palermo");
            direccion5.setLatitud(-31.3754879);
            direccion5.setLongitud(-64.2363093);
            direccion5.setLocalidad(palermo);

            create(direccion5);
            
            String rootPath = System.getProperty("user.dir");
            this.execSQL(rootPath + File.separator + "src" + File.separator + "main" + File.separator + "sql" + File.separator + "Direccion.sql");
        }
    }

}
