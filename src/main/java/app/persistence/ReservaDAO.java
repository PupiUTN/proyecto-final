/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package app.persistence;

import app.models.entities.Cuidador;
import app.models.entities.Perro;
import app.models.entities.Reserva;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

/**
 *
 * @author agile
 */
@Repository
public class ReservaDAO extends DAO<Reserva> {

    @Autowired
    CuidadorDAO cuidadorDAO;
    @Autowired
    PerroDAO perroDAO;

    public ReservaDAO() throws Exception {
                super(Reserva.class);
    }
    
    public void cargarDatos() throws Exception {
        if (count() == 0) {
            List<Cuidador> findAllCuidadores = cuidadorDAO.findAll();
            List<Perro> findAllPerros = perroDAO.findAll();
            Reserva reserva1 = new Reserva();
            reserva1.setFechaInicio(new Date(1486821420000L));
            reserva1.setFechaFin(new Date(1492375244L));
            reserva1.setFechaTransaccion(new Date());
            reserva1.setPerro(findAllPerros.remove(0));
            reserva1.setCuidador(findAllCuidadores.remove(0));
            
            
            Reserva reserva2 = new Reserva();
            reserva2.setFechaInicio(new Date(1086821420000L));
            reserva2.setFechaFin(new Date(1592375244L));
            reserva2.setFechaTransaccion(new Date());
            reserva2.setPerro(findAllPerros.remove(0));
            reserva2.setCuidador(findAllCuidadores.remove(0));
            
            create(reserva1);
            create(reserva2);
            
        }
    }

}
