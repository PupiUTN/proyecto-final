package app.services;

import app.models.entities.Cuidador;
import app.models.entities.Direccion;
import app.models.entities.Servicio;
import app.persistence.CuidadorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

/**
 * Created by fbackhaus on 7/6/17.
 */
@Service
public class CuidadorService {

    private CuidadorRepository cuidadorRepository;

    @Autowired
    public CuidadorService(CuidadorRepository cuidadorRepository) {
        this.cuidadorRepository = cuidadorRepository;
    }

    public List<Cuidador> getCuidadores() {
        return cuidadorRepository.findAll();
    }

    public List<Cuidador> getCuidadoresPorLocalidad(Long id) {
        throw new UnsupportedOperationException();
    }

    public Cuidador getCuidador(Long id) {
        return cuidadorRepository.findOne(id);
    }

    public void deleteCuidador(Long id) {
        if (id > 0) {
            cuidadorRepository.delete(id);
        }
    }

    public void createCuidador(Cuidador entity) {
        cuidadorRepository.save(entity);
    }


    public Cuidador editCuidador(Cuidador entity) throws Exception {
        return cuidadorRepository.save(entity);
    }

    public List<Cuidador> getCuidadoresPorCiudadPlaceId(String ciudadPlaceId) {
        return cuidadorRepository.findAllbyCiudadPlaceId(ciudadPlaceId);
    }
    public List<Cuidador> getCuidadoresPorCiudadYFecha(String ciudadPlaceId, Date from, Date to) {

        return cuidadorRepository.findAllbyCiudadYFecha(ciudadPlaceId, from, to);
    }

    public List<Servicio> getListaServicios() {

        return cuidadorRepository.getServicios();
    }


    public Cuidador cuidadorXUser(Long id)
    {
        return cuidadorRepository.findcuidadorXUser(id);
    }
}
