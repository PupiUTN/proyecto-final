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

    public List<Raza> getRazas() {
        return razaRepository.findAll();
    }

    public Raza createRaza(Raza entity) {
        return razaRepository.save(entity);
    }

    public Raza getRaza(Long id) {
        return razaRepository.findOne(id);
    }

    public void deleteRaza(Long id) {
        razaRepository.delete(id);
    }

    public Raza editRaza(Raza entity) {
        return razaRepository.save(entity);
    }
}
