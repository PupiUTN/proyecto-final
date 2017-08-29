package app.services;

import app.models.entities.User;
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

    public Perro createPerro(Perro entity) throws Exception {
        return perroRepository.save(entity);
    }

    public List<Perro> getPerrosByUserId(Long id) throws Exception {
        User user = new User();
        user.setId(id);
        return perroRepository.findAllByUser(user);
    }

    public Perro getPerro(Long perroId) throws  Exception {
        return perroRepository.findOne(perroId);
    }
}
