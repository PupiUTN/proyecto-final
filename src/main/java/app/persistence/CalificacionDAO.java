/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package app.persistence;

import app.models.entities.Calificacion;
import app.models.entities.Reserva;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 *
 * @author agile
 */
@Repository
public class CalificacionDAO extends DAO<Calificacion> {
    @Autowired
    ReservaDAO reservaDAO;

    public CalificacionDAO() throws Exception {
        super(Calificacion.class);
    }

    public void cargarDatos() throws Exception {
        if (count() == 0) {
            List<Reserva> findAllReservas = reservaDAO.findAll();
            Calificacion calificacion = new Calificacion();
            calificacion.setPuntaje(5);
            calificacion.setComentario("Muy recomendado porque volvio mi perro contento");
            calificacion.setReserva(findAllReservas.remove(0));
            create(calificacion);
        }
    }

}
