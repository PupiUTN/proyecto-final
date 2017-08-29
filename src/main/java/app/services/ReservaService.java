package app.services;

import app.models.entities.Reserva;
import app.persistence.ReservaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReservaService {

    private final ReservaRepository reservaRepository;

    @Autowired
    public ReservaService(ReservaRepository reservaRepository) {
        this.reservaRepository = reservaRepository;
    }

    public List<Reserva> getPerrosByUserId(Long id) {
        return reservaRepository.findAllByUser(id);
    }

    public Reserva save(Reserva reserva) {
        Reserva savedObject = reservaRepository.save(reserva);
        return savedObject;
    }
}
