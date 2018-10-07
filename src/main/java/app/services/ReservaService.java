package app.services;

import app.exception.BussinesLogicException;
import app.models.entities.Reserva;
import app.models.entities.User;
import app.persistence.ReservaRepository;
import app.utils.EstadoReserva;
import app.utils.MailType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import static java.time.temporal.ChronoUnit.DAYS;

@Service
public class ReservaService {

    private final ReservaRepository reservaRepository;
    private final MailService mailService;

    @Autowired
    public ReservaService(ReservaRepository reservaRepository, MailService mailService) {
        this.reservaRepository = reservaRepository;
        this.mailService = mailService;
    }

    public List<Reserva> getReservasByUserId(Long id) {
        return reservaRepository.findAllByUser(id);
    }

    public List<Reserva> getReservasByUserIdAndStatus(Long id, String status) {

        if (status.equals("cerrada")) {
            String var2 = "comentario-dueño";
            return reservaRepository.findAllByUserAndStatusFinalizada(id, status, var2);
        }

        if (status.equals("finalizada")) {
            String var1 = "comentario-cuidador";
            return reservaRepository.findAllByUserAndStatusFinalizada(id, status, var1);

        } else {
            return reservaRepository.findAllByUserAndStatus(id, status);
        }


    }

    public Reserva getReserva(Long id) {
        return reservaRepository.findOne(id);
    }

    public Reserva save(Reserva reserva) throws BussinesLogicException {
        int valorMaximoCuidador = reserva.getCuidador().getTamaño().getValorMaximo();
        int valorMaximoPerro = reserva.getPerro().getTamaño().getValorMaximo();
        if (valorMaximoPerro > valorMaximoCuidador) {
            throw new BussinesLogicException("El tamaño del perro elegido en la reserva supera el tamaño maximo admitido por el cuidador");
        }
        reserva.setStatus("creada-dueño");
        float precioTotal = daysBetween(reserva.getFechaInicio(), reserva.getFechaFin()) * reserva.getCuidador()
                .getPrecioPorNoche();
        reserva.setPrecioTotal(precioTotal);
        Reserva savedObject = reservaRepository.save(reserva);
        mailService.sendEmail(reserva.getCuidador().getUser(), MailType.BOOKING_REQUEST);
        return savedObject;
    }

    public Reserva setEstadoFinalizado(Reserva reserva) {
        Reserva savedObject = reservaRepository.save(reserva);
        return savedObject;
    }


    private static long daysBetween(LocalDate one, LocalDate two) {
        return DAYS.between(one, two);
    }

    public void cancelarCausaUsuario(Long reservaId, Long userId) {
        Reserva reserva = reservaRepository.findByUserIdAnId(userId, reservaId);
        reserva.setStatus("rechazada-dueño");
        reservaRepository.save(reserva);
        mailService.sendEmail(reserva.getCuidador().getUser(), MailType.BOOKING_CANCELLATION_BY_USER);
    }

    public List<Reserva> getReservasByCuidadorIdAndStatus(Long id, String status) {

        if (status.equals("cerrada")) {
            String var2 = "comentario-cuidador";
            return reservaRepository.findAllByUserAndStatusFinalizada(id, status, var2);
        }

        if (status.equals("finalizada")) {
            String var1 = "comentario-dueño";
            return reservaRepository.findAllByCuidadorAndStatusFinalizada(id, status, var1);
        } else {
            return reservaRepository.findAllByCuidadorAndStatus(id, status);
        }

    }

    public List<Reserva> getReservasByCuidadorIdAndStatusFromTodaySinJoin(Long id, List<String> statusList) {
        List<Reserva> reservas = reservaRepository.findAllByCuidadorIdAndStatusListAndFechaVigente(id, statusList);

        for (int i = 0; i < reservas.size(); i++) {
            Reserva reserva = reservas.get(i);
            reserva.setCuidador(null);
            reserva.setPerro(null);
        }
        return reservas;

    }

    public void cancelar(Long reservaId, Long userId) {
        Reserva reserva = reservaRepository.findByCuidadorIdAnId(userId, reservaId);
        reserva.setStatus("rechazada-cuidador");
        reservaRepository.save(reserva);
        User user = getReserva(reservaId).getPerro().getUser();
        mailService.sendEmail(user, MailType.BOOKING_CANCELLATION_BY_HOST);
    }


    public void confirmar(Long reservaId, Long userId) {
        Reserva reserva = reservaRepository.findByCuidadorIdAnId(userId, reservaId);
        reserva.setStatus("aceptada-cuidador");
        reservaRepository.save(reserva);
        User user = getReserva(reservaId).getPerro().getUser();
        mailService.sendEmail(user, MailType.BOOKING_CONFIRMATION);
    }

    public List<Reserva> findPendienteReviewCuidador() {
        return reservaRepository.findPendienteReviewCuidador();
    }

    public List<Reserva> findPendienteReviewUser() {
        return reservaRepository.findPendienteReviewUser();
    }

    public void setEstadoPagada(Reserva reserva) {
        reserva.setStatus("pagada-dueño");
        reservaRepository.save(reserva);
        mailService.sendEmail(reserva.getPerro().getUser(), MailType.BOOKING_PAYMENT_TO_USER);
        mailService.sendEmail(reserva.getCuidador().getUser(), MailType.BOOKING_PAYMENT_TO_HOST);
    }

    public Date addDays(Date date, int days) {
        Calendar cal = Calendar.getInstance();
        cal.setTime(date);
        cal.add(Calendar.DATE, days); //minus number would decrement the days
        return cal.getTime();
    }

    public int getCantidadReservas(Long id) {
        return reservaRepository.getCantidadReservas(id);
    }

    public List<Reserva> findAllByCuidador(Long id) {
        return reservaRepository.findAllByCuidador(id);
    }


    public List<Reserva> getCantidadReservasTotal() {
        return reservaRepository.getCantidadReservasTotal();
    }


    public List<Reserva> getReservasByStatus(EstadoReserva estadoReserva) {
        if (estadoReserva.getStatus()
                .equals("rechazada-cuidador")) {
            return reservaRepository.getCantidadByStatus(estadoReserva.getStatus(), "rechazada-dueño");
        }

        return reservaRepository.getCantidadByStatus(estadoReserva.getStatus(), "");
    }

    public List<Reserva> getReservasByDogId(Long perroId) {

        return reservaRepository.getReservaByDogIdAndStatus(perroId);

    }
}
