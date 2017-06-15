package app.services;

import app.models.entities.Tamaño;
import app.persistence.TamañoDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

/**
 * Created by fbackhaus on 7/6/17.
 */
@Service
public class TamañoService {

    @Autowired
    TamañoDAO tamañoDAO;

    public List<Tamaño> getTamaños() throws Exception {
        return tamañoDAO.findAll();
    }
}
