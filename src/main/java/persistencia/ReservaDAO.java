/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package persistencia;

import java.util.Date;
import java.util.List;
import modelo.Cuidador;
import modelo.Dueno;
import modelo.Perro;
import modelo.Raza;
import modelo.Reserva;

/**
 *
 * @author agile
 */
public class ReservaDAO extends DAO<Reserva> {

    public ReservaDAO() throws Exception {
                super(Reserva.class);
        cargarDatos();
    }

    private void cargarDatos() throws Exception {
        if (count() == 0) {
            CuidadorDAO cuidadorDAO = new CuidadorDAO();
            List<Cuidador> findAllCuidadores = cuidadorDAO.findAll();
            PerroDAO perroDAO = new PerroDAO();
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
