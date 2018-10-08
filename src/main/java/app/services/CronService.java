package app.services;

import app.models.entities.Reserva;
import app.persistence.CronRepository;
import app.utils.EstadoReserva;
import app.utils.MailType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class CronService {
    private final CronRepository cronRepository;
    private final MailService mailService;

    @Autowired
    public CronService(CronRepository cronRepository, MailService mailService) {
        this.cronRepository = cronRepository;
        this.mailService = mailService;
    }

    /**
     * - si la fecha de fin menor a hoy y estado ejecucion --> finalizada
     */
    public Integer moverEstadoDeEjecucionAFinalizada() {
        List<Reserva> reservaList = cronRepository.getIfFechaFinMenorHoy(EstadoReserva.EJECUCION.getStatus());
        for (int i = 0; i < reservaList.size(); i++) {
            Reserva reserva = reservaList.get(i);
            mailService.sendEmail(reserva.getPerro().getUser(), MailType.REVIEW_REQUEST_TO_USER);
            mailService.sendEmail(reserva.getCuidador().getUser(), MailType.REVIEW_REQUEST_TO_HOST);
            reserva.setStatus(EstadoReserva.FINALZADA.getStatus());
            cronRepository.save(reserva);
        }
        return reservaList.size();
    }

    /**
     * - si fecha inicio es == hoy y estado pagada --> ejecucion
     */
    public Integer moverEstadoDePagadaAEjecucion() {
        List<Reserva> reservaList = cronRepository.getIfFechaInicioMenorHoy(EstadoReserva.PAGADA_DUEÑO.getStatus());
        Integer updates = cronRepository.updateStateIfFechaInicioMenorHoy(EstadoReserva.PAGADA_DUEÑO.getStatus(), EstadoReserva.EJECUCION.getStatus());
        reservaList.forEach(reserva -> {
            mailService.sendEmail(reserva.getPerro().getUser(), MailType.BOOKING_STARTING_USER);
            mailService.sendEmail(reserva.getCuidador().getUser(), MailType.BOOKING_STARTING_HOST);
        });
        return updates;
    }

    /**
     * - si fecha transaccion + 72hs es mayor a la fecha de hoy y estado acepatada cuidador --> caido-falta-pago
     */
    public Integer moverEstadoDeAceptadaCuidadorACaido() {
        return cronRepository.updateStateIfFechaTransaccionMas72hs(EstadoReserva.ACEPTADA_CUIDADOR.getStatus(), EstadoReserva.CAIDA_FALTA_PAGO.getStatus());
    }

    /**
     * - si fecha inicio es == hoy y creada.dueño o aceptada-cudiador --> caido-falta-pago
     */
    public Integer moverEstadoDeCreadaDueñoAAceptadaCuidador() {
        return cronRepository.updateStateIfFechaInicioMenorHoy(EstadoReserva.CREADA.getStatus(), EstadoReserva.CAIDA_FALTA_PAGO.getStatus());
    }
}
