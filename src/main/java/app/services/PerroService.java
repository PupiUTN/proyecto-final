package app.services;

import app.models.entities.Perro;
import app.persistence.PerroDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by fbackhaus on 7/6/17.
 */
@Service
public class PerroService {

    @Autowired
    PerroDAO perroDAO;

    public void createPerro(Perro entity) throws Exception {
        perroDAO.create(entity);
    }

    public List<Perro> getPerros() throws Exception {
        return perroDAO.findAll();
    }
}
