package app.models.entities;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

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
    List<Reserva> reservas;
    int[] cantidadPorMes;
    int[] totalPorTipo;
    int[] totalPorProvincia;
    int[] totalCuidadoresPorProvincia;
    long totalDueños;
    long totalOperativos;


}
