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

    public List<Reserva> getReservasByUserId(Long id) {
        return reservaRepository.findAllByUser(id);
    }

    public List<Reserva> getReservasByUserIdAndStatus(Long id, String status) {
        return reservaRepository.findAllByUserAndStatus(id,status);
    }

    public Reserva save(Reserva reserva) {
        reserva.setStatus("CONFIRMATION_PENDING");
        Reserva savedObject = reservaRepository.save(reserva);
        return savedObject;
    }

    public void cancelarCausaUsuario(Long reservaId, Long userId) {
        Reserva reserva = reservaRepository.findByUserIdAnId(userId, reservaId);
        if (reserva.getStatus() == "foo"){
            throw new IllegalArgumentException();
        }
        reserva.setStatus("CANCEL_BY_USER");
        reservaRepository.save(reserva);
    }
}
