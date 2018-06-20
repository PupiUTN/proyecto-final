package app.models.entities;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Created by gabriellorenzatti on 20/6/18.
 */
@Getter
@Setter
@NoArgsConstructor
public class EstadisticaAdmin {


    long totalReservas;
    long totalDenuncias;
    long totalSolicitudes;
    long totalCalificaciones;
    long totalPerros;
    long totalCuidadores;
    String TotalDineroActual;

}
