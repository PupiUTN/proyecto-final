package app.controllers;


import app.models.entities.Cuidador;
import app.models.entities.Estadistica;
import app.models.entities.Reserva;
import app.models.entities.User;
import app.security.MyUserPrincipal;
import app.services.CuidadorService;
import app.services.MailService;
import app.services.ReservaService;
import app.utils.MailType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import javax.xml.bind.DataBindingException;
import java.util.Calendar;
import java.util.List;
import java.util.Date;
import java.util.Date.*;

@RestController
@RequestMapping(value = "/api/cuidador/me/reservas")
public class ReservaCuidadorController {


    private final ReservaService reservaService;
    private final MailService mailService;
    private final CuidadorService cuidadorService;

    @Autowired
    public ReservaCuidadorController(ReservaService reservaService, MailService mailService, CuidadorService cuidadorService) {
        this.reservaService = reservaService;
        this.mailService = mailService;
        this.cuidadorService = cuidadorService;
    }

    @PreAuthorize("hasAuthority('ROLE_CUIDADOR')")
    @RequestMapping(method = RequestMethod.POST)
    public Reserva post(@RequestBody Reserva entity) throws Exception {
        //TODO setear info del cuidador asi nadie puede meter info que no es.
        return reservaService.save(entity);

    }

    @PreAuthorize("hasAuthority('ROLE_CUIDADOR')")
    @RequestMapping(value = "{id}", method = RequestMethod.GET)
    public Reserva getReserva(@PathVariable("id") Long id) {
        return reservaService.getReserva(id);
    }


    @PreAuthorize("hasAuthority('ROLE_CUIDADOR')")
    @RequestMapping(method = RequestMethod.GET)
    public List<Reserva> get(@RequestParam("status") String status) throws Exception {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        ;
        MyUserPrincipal myUserPrincipal = (MyUserPrincipal) userDetails;
        long id = myUserPrincipal.getUser().getId();
        return reservaService.getReservasByCuidadorIdAndStatus(id, status);
    }


    @PreAuthorize("hasAuthority('ROLE_CUIDADOR')")
    @RequestMapping(method = RequestMethod.PUT, value = "{reservaId}/cancelarReserva")
    public ResponseEntity cancelar(@PathVariable Long reservaId) throws Exception {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        MyUserPrincipal myUserPrincipal = (MyUserPrincipal) userDetails;
        long id = myUserPrincipal.getUser().getId();
        reservaService.cancelar(reservaId, id);
        User user = getReserva(reservaId).getPerro().getUser();
        mailService.sendEmail(user, MailType.BOOKING_CANCELLATION_BY_HOST);
        return new ResponseEntity(HttpStatus.OK);
    }

    @PreAuthorize("hasAuthority('ROLE_CUIDADOR')")
    @RequestMapping(method = RequestMethod.PUT, value = "{reservaId}/confirmarReserva")
    public ResponseEntity Confirmar(@PathVariable Long reservaId) throws Exception {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        MyUserPrincipal myUserPrincipal = (MyUserPrincipal) userDetails;
        long id = myUserPrincipal.getUser().getId();
        reservaService.confirmar(reservaId, id);
        User user = getReserva(reservaId).getPerro().getUser();
        mailService.sendEmail(user, MailType.BOOKING_CONFIRMATION);
        return new ResponseEntity(HttpStatus.OK);

    }

    @PreAuthorize("hasAuthority('ROLE_CUIDADOR')")

    @RequestMapping(value = "/PendientesReview/", method = RequestMethod.GET)
    public int[] getPendientesReview() throws Exception {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        MyUserPrincipal myUserPrincipal = (MyUserPrincipal) userDetails;
        long id = myUserPrincipal.getUser().getId();
        int[] cant = new int[2];
        String status = "finalizada";
        // List reserva = ;
        cant[0] = reservaService.getReservasByCuidadorIdAndStatus(id, status).size();
        cant[1] = reservaService.getReservasByUserIdAndStatus(id, status).size();
        return cant;

    }

    @PreAuthorize("hasAuthority('ROLE_CUIDADOR')")

    @RequestMapping(value = "/estadisticas/", method = RequestMethod.GET)
    public Estadistica getEstadisticas() throws Exception {
        long id = getIdCuidador();
        int[] cantidadXtipo = new int[6];
        Estadistica estadistica = new Estadistica();
        List<Reserva> list = reservaService.findAllByCuidador(id);

        for (Reserva item : list) {

            switch (item.getStatus()) {
                case "finalizada":
                    cantidadXtipo[0]++;
                    break;
                case "pagada-dueño":
                    cantidadXtipo[1]++;
                    break;
                case "creada-dueño":
                    cantidadXtipo[2]++;
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
        Cuidador cuidador = list.get(0).getCuidador();
        estadistica.setTotalPorTipo(cantidadXtipo);
        estadistica.setCantidadTotal(list.size());
        estadistica.setPromedio(cuidador.getPromedioReviews());
        estadistica.setCantidadPorMes(getReservasXMes(list));
        estadistica.setTotalVisitas(cuidador.getCantidadVisitas());
        estadistica.setNombre(cuidador.getUser().getUsername());
        return estadistica;

    }


    private long getIdCuidador() {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        MyUserPrincipal myUserPrincipal = (MyUserPrincipal) userDetails;
        return myUserPrincipal.getUser().getId();
    }


    private int[] getReservasXMes(List<Reserva> reservas) {
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
            date = getDateReserva(item.getFechaTransaccion());
            if (date.getTime().after(c.getTime())) {

            position = beforeMonth -date.get(Calendar.MONTH);
                  if(position <=0) {
                      cantidad[Math.abs(position)] = cantidad[Math.abs(position)] + 1;
                  } else{

                      cantidad[date.get(Calendar.MONTH) +month] = cantidad[date.get(Calendar.MONTH) +1] + 1;

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

}
