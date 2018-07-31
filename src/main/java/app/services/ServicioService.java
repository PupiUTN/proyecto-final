package app.services;

import app.models.entities.Servicio;
import app.persistence.ServicioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by gabi lorenzatti on 7/6/17.
 */
@Service
public class ServicioService {

    private ServicioRepository servicioRepository;

    @Autowired
    public ServicioService(ServicioRepository servicioRepository) {
        this.servicioRepository = servicioRepository;
    }

    public List<Servicio> getServicios() {
        return servicioRepository.findAll();
    }
}
