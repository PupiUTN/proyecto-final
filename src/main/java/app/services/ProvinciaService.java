package app.services;

import app.models.entities.Localidad;
import app.models.entities.Provincia;
import app.persistence.LocalidadDAO;
import app.persistence.ProvinciaDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

/**
 * Created by fbackhaus on 7/6/17.
 */
@Service
public class ProvinciaService {
    @Autowired
    ProvinciaDAO provinciaDAO;
    @Autowired
    LocalidadDAO localidadDAO;

    public List<Provincia> getProvincias() {
        return provinciaDAO.findAll();
    }

    public List<Localidad> getLocalidades(Long id) throws Exception{
        return localidadDAO.findAll("provincia",id);
    }

}
