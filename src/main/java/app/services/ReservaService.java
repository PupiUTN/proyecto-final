package app.services;

import app.models.entities.Reserva;
import app.persistence.ReservaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
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

    private static long daysBetween(Date one, Date two) {
        long difference = (one.getTime() - two.getTime()) / 86400000;
        return Math.abs(difference);
    }

    public Reserva getReserva(Long id) {
        return reservaRepository.findOne(id);
    }

    public List<Reserva> getReservasByUserIdAndStatus(Long id, String status) {
        return reservaRepository.findAllByUserAndStatus(id, status);
    }

    public Reserva crearNuevaReserva(Reserva reserva) {
        reserva.setStatus("CONFIRMATION_PENDING");
        float precioTotal = daysBetween(reserva.getFechaInicio(), reserva.getFechaFin()) * reserva.getCuidador().getPrecioPorNoche();
        reserva.setPrecioTotal(precioTotal);
        Reserva savedObject = reservaRepository.save(reserva);
        return savedObject;
    }

    public void cancelarCausaUsuario(Long reservaId, Long userId) {
        Reserva reserva = reservaRepository.findByUserIdAnId(userId, reservaId);
        if (reserva.getStatus() == "foo") {
            throw new IllegalArgumentException();
        }
        reserva.setStatus("CANCEL_BY_USER");
        reservaRepository.save(reserva);
    }

    public List<Reserva> getReservasByCuidadorIdAndStatus(Long id, String status) {
        return reservaRepository.findAllByCuidadorAndStatus(id, status);
    }

    public void cancelar(Long reservaId, Long userId) {
        Reserva reserva = reservaRepository.findByCuidadorIdAnId(userId, reservaId);
        if (reserva.getStatus() == "foo") {
            throw new IllegalArgumentException();
        }
        reserva.setStatus("CANCEL");
        reservaRepository.save(reserva);
    }

    public void confirmar(Long reservaId, Long userId) {
        Reserva reserva = reservaRepository.findByCuidadorIdAnId(userId, reservaId);
        if (reserva.getStatus() == "foo") {
            throw new IllegalArgumentException();
        }
        reserva.setStatus("ACCEPTED");
        reservaRepository.save(reserva);
    }


}
