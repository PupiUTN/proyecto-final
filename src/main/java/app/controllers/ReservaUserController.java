/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package app.controllers;

import app.models.entities.*;
import app.security.MyUserPrincipal;
import app.services.CalificacionService;
import app.services.MailService;
import app.services.PerroService;
import app.services.ReservaService;
import app.utils.MailType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping(value = "/api/user/me/reservas")
public class ReservaUserController {


    private final ReservaService reservaService;
    private final MailService mailService;
    private final PerroService perroService;
    private final CalificacionService calificacionService;

    @Autowired
    public ReservaUserController(ReservaService reservaService, MailService mailService, PerroService perroService,CalificacionService calificacionService) {
        this.reservaService = reservaService;
        this.mailService = mailService;
        this.perroService = perroService;
        this.calificacionService = calificacionService;
    }

    @PreAuthorize("isAuthenticated()")
    @RequestMapping(method = RequestMethod.POST)
    public Reserva post(@RequestBody Reserva entity) throws Exception {
        //TODO setear info del cuidador asi nadie puede meter info que no es.
        mailService.sendEmail(entity.getCuidador().getUser(), MailType.BOOKING_REQUEST);
        return reservaService.save(entity);

    }

    @PreAuthorize("isAuthenticated()")
    @RequestMapping(method = RequestMethod.GET)
    public List<Reserva> get(@RequestParam("status") String status) throws Exception {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        MyUserPrincipal myUserPrincipal = (MyUserPrincipal) userDetails;
        long id = myUserPrincipal.getUser().getId();
        return reservaService.getReservasByUserIdAndStatus(id, status);
    }


    @PreAuthorize("isAuthenticated()")
    @RequestMapping(method = RequestMethod.PUT, value = "{reservaId}/cancelarUsuario")
    public ResponseEntity cancelarCausaUsuario(@PathVariable Long reservaId) throws Exception {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        MyUserPrincipal myUserPrincipal = (MyUserPrincipal) userDetails;
        long id = myUserPrincipal.getUser().getId();
        reservaService.cancelarCausaUsuario(reservaId, id);
        mailService.sendEmail(reservaService.getReserva(reservaId).getCuidador().getUser(), MailType.BOOKING_CANCELLATION_BY_USER);
        return new ResponseEntity(HttpStatus.OK);
    }

    @PreAuthorize("isAuthenticated()")
    @RequestMapping(value = "{id}", method = RequestMethod.GET)
    public Reserva getReserva(@PathVariable("id") Long id) {
        return reservaService.getReserva(id);
    }

    @PreAuthorize("isAuthenticated()")

    @RequestMapping(value = "/PendientesReview/", method = RequestMethod.GET)
    public long getPendientesReview() throws Exception {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        MyUserPrincipal myUserPrincipal = (MyUserPrincipal) userDetails;
        long id = myUserPrincipal.getUser().getId();
        String status = "finalizada";
        List reserva = reservaService.getReservasByUserIdAndStatus(id, status);
        return reserva.size();

    }


    @PreAuthorize("isAuthenticated()")
    @RequestMapping(value = "/estadisticas/", method = RequestMethod.GET)
    public List<EstadisticaUser> getEstadisticas() throws Exception {
        long id = getId();
        List<EstadisticaUser> estadisticaUserList = new ArrayList<>();

        List<Reserva> list = reservaService.getReservasByUserId(id);
        if (list.size() == 0)
        {
            return estadisticaUserList;
        }
        User user = list.get(0).getPerro().getUser();
        List<Perro> listPerro = perroService.getPerrosByUserId(user.getId());
        EstadisticaUser estadisticaUser;
        for (Perro item : listPerro) {
            estadisticaUser = new EstadisticaUser();
            int[] aux = getCantidadXTipo(item.getId(), list);
            estadisticaUser.setTotalPorTipo(aux);
            estadisticaUser.setNombrePerro(item.getNombre());
            estadisticaUser.setNombre(user.getUsername());
            estadisticaUser.setCantidadPorMes(getReservasXMes(list, item.getId()));
            estadisticaUser.setCantidadTotal(getCantidadTotal(aux));
            estadisticaUser.setPromedio(getPromedio(item.getId()));
            estadisticaUser.setIdPerro(item.getId().intValue());
            estadisticaUser.setTotalCuidadores(getCuidadoresXPerro(list, item.getId()));
            estadisticaUserList.add(estadisticaUser);
        }

        return estadisticaUserList;

    }


    private int getCantidadTotal(int[] aux) {
        int cont = 0;

        for (int i = 0; i < aux.length; i++) {
            cont += aux[i];
        }
        return cont;
    }


    private float getPromedio(Long id) throws Exception
    { float cont =0;

        List<Calificacion> list =  calificacionService.getCalificacionesPerro(id);

        if (list.size() >0 ) {
            for (Calificacion calificacion : list) {
                cont += calificacion.getPuntaje();
            }

            return cont / list.size();
        }
        else
        {
             return cont;
        }
    }

    private int[] getCantidadXTipo(Long id,  List<Reserva> list)
    {  int[] cantidadXtipo = new int[6];
        for (Reserva item : list) {
             if(item.getPerro().getId().equals(id))
             {
                 switch (item.getStatus()) {
                     case "finalizada":
                         cantidadXtipo[0]++;
                         break;
                     case "creada-dueño":
                         cantidadXtipo[2]++;
                         break;
                     case "pagada-dueño":
                         cantidadXtipo[1]++;
                         break;
                     case "aceptada-cuidador":
                         cantidadXtipo[3]++;
                         break;
                     case "rechazada-dueño":
                         cantidadXtipo[4]++;
                         break;
                     case "rechazada-cuidador":
                         cantidadXtipo[4]++;
                         break;
                     case "cerrada":
                         cantidadXtipo[5]++;
                         break;
                     default:

                 }
             }

        }
        return cantidadXtipo;
    }


    private long getId() {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        MyUserPrincipal myUserPrincipal = (MyUserPrincipal) userDetails;
        return myUserPrincipal.getUser().getId();
    }


    private int[] getReservasXMes(List<Reserva> reservas, Long id) {
        int[] cantidad = new int[7];
        int month, beforeMonth, position;
        Calendar date;

        Date referenceDate = new Date();
        Calendar c = Calendar.getInstance();
        c.setTime(referenceDate);
        c.add(Calendar.MONTH, -6);
        beforeMonth = c.get(Calendar.MONTH);
        c.set(c.get(Calendar.YEAR), c.get(Calendar.MONTH),1);
        month = 12- beforeMonth;

        for (Reserva item : reservas) {

            if (item.getPerro().getId().equals(id)) {

            date = getDateReserva(item.getFechaTransaccion());
            if (date.getTime().after(c.getTime())) {

                position = beforeMonth - date.get(Calendar.MONTH);
                if (position <= 0) {
                    cantidad[Math.abs(position)] = cantidad[Math.abs(position)] + 1;
                } else {

                    cantidad[date.get(Calendar.MONTH) + month] = cantidad[date.get(Calendar.MONTH) + 1] + 1;

                }

            }
        }
        }

        return cantidad;
    }


    private Calendar getDateReserva(Date item){
        Calendar reservaDate = Calendar.getInstance();
        reservaDate.setTime(item);
        return reservaDate;

    }

    public int getCuidadoresXPerro(List<Reserva> reservas, Long id) {
        int cont = 0;

        ArrayList<Integer> aux = new ArrayList<>();
        for (Reserva item : reservas) {
            if (item.getPerro().getId().equals(id)) {
                if (cont == 0) {
                    aux.add(item.getCuidador().getId().intValue());
                    cont++;

                } else {
                    if (!aux.contains(item.getCuidador().getId().intValue())) {
                        aux.add(item.getCuidador().getId().intValue());
                        cont++;
                    }


                }


            }

        }

        return cont;
    }

}
