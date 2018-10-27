package app.models.entities;

import app.utils.EstadoReserva;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Created by gabriellorenzatti on 27/10/18.
 */
@Getter
@Setter
@NoArgsConstructor
public class Ganancias {

    int mes;
    int cantidad;
    float ganancia;


    public void addCantidad() {

        this.cantidad ++;
    }

    public void addGanancia( float ganancia, String status) {

        addCantidad();

        if(statusOk(status)){
            this.ganancia += ganancia;
        }

    }

    private  boolean statusOk(String status) {

        return !(status.equals(EstadoReserva.CREADA.getStatus()) || status.equals(EstadoReserva.CAIDA_FALTA_PAGO.getStatus()) || status.equals(EstadoReserva.ACEPTADA_CUIDADOR.getStatus()) || status.equals(EstadoReserva.RECHAZADA_CUIDADOR.getStatus()) || status.equals(EstadoReserva.RECHAZADA_DUEÑO.getStatus()));
    }
}
