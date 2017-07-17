package app.services;

import app.models.entities.Raza;
import app.persistence.RazaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by fbackhaus on 7/6/17.
 */
@Service
public class RazaService {
    RazaRepository razaRepository;

    @Autowired
    public RazaService(RazaRepository razaRepository) {
        this.razaRepository = razaRepository;
    }

    public List<Raza> getRazas() throws Exception {
        return razaRepository.findAll();
    }

    public void createRaza(Raza entity) throws Exception {
        razaRepository.save(entity);
    }

    public Raza getRaza(Long id) throws Exception {
        return razaRepository.findOne(id);
    }

    public void deleteRaza(Long id) throws Exception {
        razaRepository.delete(id);
    }

    public void editRaza(Raza entity) throws Exception {
        throw new UnsupportedOperationException();
    }
}
