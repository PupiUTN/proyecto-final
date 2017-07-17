package app.services;

import app.models.entities.Perro;
import app.persistence.PerroRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by fbackhaus on 7/6/17.
 */
@Service
public class PerroService {

    PerroRepository perroRepository;

    @Autowired
    public PerroService(PerroRepository perroRepository) {
        this.perroRepository = perroRepository;
    }

    public void createPerro(Perro entity) throws Exception {
        perroRepository.save(entity);
    }

    public List<Perro> getPerros() throws Exception {
        return perroRepository.findAll();
    }
}
