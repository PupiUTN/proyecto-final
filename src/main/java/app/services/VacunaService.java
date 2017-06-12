package app.services;

import app.models.entities.Vacuna;
import app.persistence.VacunaDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

/**
 * Created by fbackhaus on 7/6/17.
 */
@Service
public class VacunaService {

    @Autowired
    VacunaDAO vacunaDAO;

    public List<Vacuna> getVacunas() throws Exception {
        return vacunaDAO.findAll();
    }

    public void createVacuna(Vacuna entity) throws Exception {
        vacunaDAO.create(entity);
    }

    public void deleteVacuna(Long id) throws Exception {
        vacunaDAO.removeID(id);
    }

    public void editVacuna(Vacuna entity) throws Exception {
        vacunaDAO.edit(entity);
    }
}
