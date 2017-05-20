/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package persistencia;

import modelo.Califiacion;
import modelo.Reserva;

import java.util.List;

/**
 *
 * @author agile
 */
public class CalificacionDAO extends DAO<Califiacion> {

    public CalificacionDAO() throws Exception {
        super(Califiacion.class);
    }

    public void cargarDatos() throws Exception {
        if (count() == 0) {

            ReservaDAO reservaDAO = new ReservaDAO();
            List<Reserva> findAllReservas = reservaDAO.findAll();

            Califiacion califiacion = new Califiacion();
            califiacion.setPuntaje(5);
            califiacion.setComentario("Muy recomendadro porque volvio mi perro contento");
            califiacion.setReserva(findAllReservas.remove(0));

            create(califiacion);

        }
    }

}
