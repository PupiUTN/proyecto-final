package app.persistencia.Conection;

import javax.persistence.EntityManagerFactory;

/**
 * Created by gabriellorenzatti on 10/6/17.
 */
public class BaseDatosSql {

    private ConeccionMySql baseDatos;

    public void setTypeWeather(ConeccionMySql baseDatos) {
        this.baseDatos = baseDatos;
    }

    public EntityManagerFactory request(EntityManagerFactory emf){

        if (baseDatos != null)
             return baseDatos.executeAction( emf);
        return null;
    }
}
