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

    public List<CalendarioCuidador> getCalendarios(Cuidador cuidador) {
        return calendarioCuidadorRepository.findAllByCuidador(cuidador);
    }
}
