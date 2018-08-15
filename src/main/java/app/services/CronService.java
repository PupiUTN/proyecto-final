package app.services;

import app.persistence.CronRepository;
import app.utils.EstadoReserva;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class CronService {
    CronRepository cronRepository;

    @Autowired
    public CronService(CronRepository cronRepository) {
        this.cronRepository = cronRepository;
    }

    /**
     * - si la fecha de fin menor a hoy y estado ejecucion --> cerrada
     */
    public Integer moverEstadoDeEjecucionACerrada() {
        return cronRepository.updateStateIfFechaFinMenorHoy(EstadoReserva.EJECUCION.getStatus(), EstadoReserva.CERRADA.getStatus());
    }

    /**
     * - si fecha inicio es == hoy y estado pagada --> ejecucion
     */
    public Integer moverEstadoDePagadaAEjecucion() {
        return cronRepository.updateStateIfFechaInicioIgualHoy(EstadoReserva.PAGADA_DUEÑO.getStatus(), EstadoReserva.EJECUCION.getStatus());
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
        return cronRepository.updateStateIfFechaInicioIgualHoy(EstadoReserva.CREADA.getStatus(), EstadoReserva.CAIDA_FALTA_PAGO.getStatus());
    }
}
