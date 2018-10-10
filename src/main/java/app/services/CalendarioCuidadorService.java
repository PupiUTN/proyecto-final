package app.services;

import app.models.entities.CalendarioCuidador;
import app.models.entities.Cuidador;
import app.persistence.CalendarioCuidadorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CalendarioCuidadorService {


    private final CalendarioCuidadorRepository calendarioCuidadorRepository;

    @Autowired
    public CalendarioCuidadorService (CalendarioCuidadorRepository calendarioCuidadorRepository) {
        this.calendarioCuidadorRepository = calendarioCuidadorRepository;
    }

    public List<CalendarioCuidador> findAllByCuidadorFromToday(Cuidador cuidador) {
        return calendarioCuidadorRepository.findAllByCuidadorFromToday(cuidador.getId());
    }

    public List<CalendarioCuidador> save(List<CalendarioCuidador> entityList) {
        return calendarioCuidadorRepository.save(entityList);
    }
    public void delete(Long id) {
        calendarioCuidadorRepository.delete(id);
    }
}
