package app.services;

import app.models.entities.Vacuna;
import app.persistence.VacunaRespository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by fbackhaus on 7/6/17.
 */
@Service
public class VacunaService {


    VacunaRespository vacunaRespository;

    @Autowired
    public VacunaService(VacunaRespository vacunaRespository) {
        this.vacunaRespository = vacunaRespository;
    }

    public List<Vacuna> getVacunas() throws Exception {
        return vacunaRespository.findAll();
    }

    public void createVacuna(Vacuna entity) throws Exception {
        vacunaRespository.save(entity);
    }

    public void deleteVacuna(Long id) throws Exception {
        vacunaRespository.delete(id);
    }

    public void editVacuna(Vacuna entity) throws Exception {
        throw new UnsupportedOperationException();
    }
}
