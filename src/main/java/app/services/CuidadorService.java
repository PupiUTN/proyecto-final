package app.services;

import app.models.entities.Cuidador;
import app.persistence.CuidadorDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by fbackhaus on 7/6/17.
 */
@Service
public class CuidadorService {

    @Autowired
    private CuidadorDAO cuidadorDAO;

    public List<Cuidador> getCuidadores() {
        return cuidadorDAO.findAll();
    }

    public List<Cuidador> getCuidadoresPorLocalidad(Long id) {
        return cuidadorDAO.findPorLocalidad(id.intValue());
    }

    public Cuidador getCuidador(Long id) {
        return cuidadorDAO.find(id);
    }

    public void deleteCuidador(Long id) {
        if (id > 0) {
            Cuidador cuidador = new Cuidador();
            cuidador.setId(id);
            cuidadorDAO.remove(cuidador);
        } else {
            //chupa el perro
        }
    }

    public void createCuidador(Cuidador entity) {
        cuidadorDAO.create(entity);
    }
}
