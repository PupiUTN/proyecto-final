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

    private final ServicioRepository servicioRepository;

    @Autowired
    public ServicioService(ServicioRepository servicioRepository) {
        this.servicioRepository = servicioRepository;
    }

    public List<Servicio> getServicios() {
        return servicioRepository.findAll();
    }

    public Servicio createServicio(Servicio entity) {
        return servicioRepository.save(entity);
    }

    public void deleteServicio(Long id) {
        servicioRepository.delete(id);
    }

    public Servicio editServicio(Servicio entity) {
        return servicioRepository.save(entity);
    }

    public Servicio getServicio(Long id) {
        return servicioRepository.findOne(id);
    }
}
