package app.models.entities;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;



/**
 * Created by gabriellorenzatti on 2/5/18.
 */

@Getter
@Setter
@NoArgsConstructor
public class Estadistica {


    int[] cantidadPorMes;
    int[] totalPorTipo;
    float promedio;
    long totalVisitas;
    long cantidadTotal;
}
