package app.services;

import app.models.entities.Raza;
import app.persistence.RazaDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

/**
 * Created by fbackhaus on 7/6/17.
 */
@Service
public class RazaService {
    @Autowired
    RazaDAO razaDAO;

    public List<Raza> getRazas() throws Exception{
        return razaDAO.findAll();
    }

    public void createRaza(Raza entity) throws Exception {
        razaDAO.create(entity);
    }

    public Raza getRaza(Long id) throws Exception {
        return razaDAO.find(id);
    }

    public void deleteRaza(Long id) throws Exception {
        razaDAO.removeID(id);
    }

    public void editRaza(Raza entity) throws Exception {
        razaDAO.edit(entity);
    }
}
