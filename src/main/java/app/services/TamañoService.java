package app.services;

import app.models.entities.Tamaño;
import app.persistence.TamanoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by fbackhaus on 7/6/17.
 */
@Service
public class TamañoService {

    private TamanoRepository tamanoRepository;

    @Autowired
    public TamañoService(TamanoRepository tamanoRepository) {
        this.tamanoRepository = tamanoRepository;
    }

    public List<Tamaño> getTamaños() {
        return tamanoRepository.findAll();
    }
}
