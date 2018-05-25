package app.models.entities;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Created by gabriellorenzatti on 25/5/18.
 */
@Getter
@Setter
@NoArgsConstructor
public class EstadisticaUser {

    int[] cantidadPorMes;
    int[] totalPorTipo;
    float promedio;
    long cantidadTotal;
    String nombrePerro;
    String nombreDueño;
     int idPerro;

}
