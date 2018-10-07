package app.controllers;

import app.models.entities.Cuidador;
import app.models.entities.EstadisticaAdmin;
import app.models.entities.Reserva;
import app.services.*;
import app.utils.EstadoReserva;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

/**
 * Created by gabriellorenzatti on 5/6/18.
 */
@RestController
@RequestMapping(value = "/api/admin/estadisticas")
public class EstadisticaAdminController {
    private final ReservaService reservaService;
    private final CuidadorService cuidadorService;
    private final PerroService perroService;
    private final CalificacionService calificacionService;
    private final UserService userService;

    @Autowired
    public EstadisticaAdminController(ReservaService reservaService, CuidadorService cuidadorService, PerroService perroService, CalificacionService calificacionService, UserService userService) {
        this.reservaService = reservaService;
        this.cuidadorService = cuidadorService;
        this.perroService = perroService;
        this.calificacionService = calificacionService;
        this.userService = userService;

    }

    @PreAuthorize("isAuthenticated()")
    @RequestMapping(value = "/me/", method = RequestMethod.GET)
    public EstadisticaAdmin getEstadisticas() {
        DecimalFormat df = new DecimalFormat("#.00");
        EstadisticaAdmin estadisticaAdmin = new EstadisticaAdmin();
        List<Reserva> reservas = reservaService.getCantidadReservasTotal();
        List<Reserva> aux = new ArrayList<>();
        Long cantPerros = perroService.getPerrosTotal();
        Long CantCuidadores = cuidadorService.getTotalCuidadores();
        int cantSolicitudes = cuidadorService.getSolicitudes().size();
        Long CantCalificaciones = calificacionService.getTotalCalificaciones();
        Long cantDueños = userService.getTotalDueños();
        int totalDenuncias = 1;
        Double cont = 0.0;
        if (reservas.size() > 0) {
            estadisticaAdmin.setTotalReservas(reservas.size());


            for (Reserva item : reservas) {

                if(statusOk(item.getStatus())){
                    cont += item.getPrecioTotal();
                }


                if (item.getStatus().equals("pagada-dueño")) {
                    aux.add(item);

                }

            }
            estadisticaAdmin.setTotalDineroActual(df.format(cont * 0.2));
            estadisticaAdmin.setTotalPerros(cantPerros);
            estadisticaAdmin.setTotalCuidadores(CantCuidadores);
            estadisticaAdmin.setTotalSolicitudes(cantSolicitudes);
            estadisticaAdmin.setTotalCalificaciones(CantCalificaciones);
            estadisticaAdmin.setTotalDenuncias(totalDenuncias);
            estadisticaAdmin.setTotalDueños(cantDueños);
            estadisticaAdmin.setReservas(aux);

        }

        return estadisticaAdmin;
    }

    private boolean statusOk(String status) {

        return !(status.equals(EstadoReserva.CREADA.getStatus()) || status.equals(EstadoReserva.CAIDA_FALTA_PAGO.getStatus()) || status.equals(EstadoReserva.ACEPTADA_CUIDADOR.getStatus()) || status.equals(EstadoReserva.RECHAZADA_CUIDADOR.getStatus()) || status.equals(EstadoReserva.RECHAZADA_DUEÑO.getStatus()));
    }

    @PreAuthorize("isAuthenticated()")
    @RequestMapping(value = "/getReservas", method = RequestMethod.GET)
    public List<Reserva> getReservasByStatus(@RequestParam("status") int value) {
        EstadoReserva estadoReserva = EstadoReserva.FINALZADA;

        switch (value) {
            case 1:
                estadoReserva = EstadoReserva.CREADA;
                break;
            case 2:
                estadoReserva = EstadoReserva.ACEPTADA_CUIDADOR;
                break;
            case 3:
                estadoReserva = EstadoReserva.PAGADA_DUEÑO;
                break;
            case 4:
                estadoReserva = EstadoReserva.RECHAZADA_CUIDADOR;
                break;
            case 5:
                estadoReserva = EstadoReserva.FINALZADA;
                break;
            case 6:
                estadoReserva = EstadoReserva.CERRADA;
                break;
            case 7:
                estadoReserva = EstadoReserva.COMENTARIO_CUIDADOR;
                break;
            case 8:
                estadoReserva = EstadoReserva.COMENTARIO_DUEÑO;
                break;
            case 9:
                estadoReserva = EstadoReserva.EJECUCION;
                break;
            default:

        }


        return reservaService.getReservasByStatus(estadoReserva);
    }


    @PreAuthorize("isAuthenticated()")
    @RequestMapping(value = "/getReservasAdmin/", method = RequestMethod.GET)
    public EstadisticaAdmin getReservasAdmin() {
        EstadisticaAdmin estadisticaAdmin = new EstadisticaAdmin();
        List<Reserva> reservas = reservaService.getCantidadReservasTotal();

        //  EstadisticaAdmin aux = getReservasxProvincia(reservas);
        estadisticaAdmin.setTotalPorProvincia(getReservasxProvincia(reservas));
        estadisticaAdmin.setTotalCuidadoresPorProvincia(getTotalCuidadoresPorProvincia());
        estadisticaAdmin.setTotalPorTipo(getTotalReservasxTipo(reservas));
        estadisticaAdmin.setCantidadPorMes(getTotalReservasxMes(reservas));


        return estadisticaAdmin;
    }


    public int[] getReservasxProvincia(List<Reserva> reservas) {
        //   EstadisticaAdmin  aux = new EstadisticaAdmin();
        int[] cuidadores = new int[24];
        int[] arrayReservas = new int[24];
        List<Long> id = new ArrayList<>();
        for (Reserva item : reservas) {
            Long idAux = item.getCuidador().getUser().getId();
            switch (item.getCuidador().getUser().getDireccion().getProvincia()) {
                case "Buenos Aires":
                    if (!id.contains(idAux)) {
                        cuidadores[0]++;
                        id.add(idAux);
                    }
                    arrayReservas[0]++;
                    break;
                case "Catamarca":
                    if (!id.contains(idAux)) {
                        cuidadores[1]++;
                        id.add(idAux);
                    }
                    arrayReservas[1]++;
                    break;
                case "Chaco":
                    if (!id.contains(idAux)) {
                        cuidadores[2]++;
                        id.add(idAux);
                    }
                    arrayReservas[2]++;
                    break;
                case "Chubut":
                    if (!id.contains(idAux)) {
                        cuidadores[3]++;
                        id.add(idAux);
                    }
                    arrayReservas[3]++;
                    break;
                case "Ciudad de Buenos Aires":
                    if (!id.contains(idAux)) {
                        cuidadores[4]++;
                        id.add(idAux);
                    }
                    arrayReservas[4]++;
                    break;
                case "Córdoba":
                    if (!id.contains(idAux)) {
                        cuidadores[5]++;
                        id.add(idAux);
                    }
                    arrayReservas[5]++;
                    break;
                case "Corrientes":
                    if (!id.contains(idAux)) {
                        cuidadores[6]++;
                        id.add(idAux);
                    }
                    arrayReservas[6]++;
                    break;
                case "Entre Ríos":
                    if (!id.contains(idAux)) {
                        cuidadores[7]++;
                        id.add(idAux);
                    }
                    arrayReservas[7]++;
                    break;
                case "Formosa":
                    if (!id.contains(idAux)) {
                        cuidadores[8]++;
                        id.add(idAux);
                    }
                    arrayReservas[8]++;
                    break;
                case "Jujuy":
                    if (!id.contains(idAux)) {
                        cuidadores[9]++;
                        id.add(idAux);
                    }
                    arrayReservas[9]++;
                    break;
                case "La Pampa":
                    if (!id.contains(idAux)) {
                        cuidadores[10]++;
                        id.add(idAux);
                    }
                    arrayReservas[10]++;
                    break;
                case "La Rioja":
                    if (!id.contains(idAux)) {
                        cuidadores[11]++;
                        id.add(idAux);
                    }
                    arrayReservas[11]++;
                    break;
                case "Mendoza":
                    if (!id.contains(idAux)) {
                        cuidadores[12]++;
                        id.add(idAux);
                    }
                    arrayReservas[12]++;
                    break;
                case "Misiones":
                    if (!id.contains(idAux)) {
                        cuidadores[13]++;
                        id.add(idAux);
                    }
                    arrayReservas[13]++;
                    break;
                case "Neuquén":
                    if (!id.contains(idAux)) {
                        cuidadores[14]++;
                        id.add(idAux);
                    }
                    arrayReservas[14]++;
                    break;
                case "Río Negro":
                    if (!id.contains(idAux)) {
                        cuidadores[15]++;
                        id.add(idAux);
                    }
                    arrayReservas[15]++;
                    break;
                case "Salta":
                    if (!id.contains(idAux)) {
                        cuidadores[16]++;
                        id.add(idAux);
                    }
                    arrayReservas[16]++;
                    break;
                case "Santa Cruz":
                    if (!id.contains(idAux)) {
                        cuidadores[17]++;
                        id.add(idAux);
                    }
                    arrayReservas[17]++;
                    break;
                case "Santiago del Estero":
                    if (!id.contains(idAux)) {
                        cuidadores[18]++;
                        id.add(idAux);
                    }
                    arrayReservas[18]++;
                    break;
                case "Santa Fe":
                    if (!id.contains(idAux)) {
                        cuidadores[19]++;
                        id.add(idAux);
                    }
                    arrayReservas[19]++;
                    break;
                case "San Juan":
                    if (!id.contains(idAux)) {
                        cuidadores[20]++;
                        id.add(idAux);
                    }
                    arrayReservas[20]++;
                    break;
                case "San Luis":
                    if (!id.contains(idAux)) {
                        cuidadores[21]++;
                        id.add(idAux);
                    }
                    arrayReservas[21]++;
                    break;
                case "Tierra del Fuego":
                    if (!id.contains(idAux)) {
                        cuidadores[22]++;
                        id.add(idAux);
                    }
                    arrayReservas[22]++;
                    break;
                case "Tucumán":
                    if (!id.contains(idAux)) {
                        cuidadores[23]++;
                        id.add(idAux);
                    }
                    arrayReservas[23]++;
                    break;
                default:

            }

        }
       /*  for (int i = 0; i< array.length; i++){
             array[i] = " Cuidadores: " + cuidadores[i] + " - " + "Reservas: " + arrayReservas[i];
         }*/

        //  aux.setTotalPorProvincia(arrayReservas);
        // aux.setTotalCuidadoresPorProvincia(cuidadores);
        return arrayReservas;

    }

    private int[] getTotalCuidadoresPorProvincia() {
        List<Cuidador> listacuidadores = cuidadorService.getCuidadores();
        int[] cuidadores = new int[24];
        List<Long> id = new ArrayList<>();

        for (Cuidador item : listacuidadores) {
            if (item.getEstado().equals("completed")) {
                switch (item.getUser().getDireccion().getProvincia()) {
                    case "Buenos Aires":
                        cuidadores[0]++;
                        break;
                    case "Catamarca":
                        cuidadores[1]++;
                    case "Chaco":
                        cuidadores[2]++;
                        break;
                    case "Chubut":
                        cuidadores[3]++;
                        break;
                    case "Ciudad de Buenos Aires":
                        cuidadores[4]++;
                        break;
                    case "Córdoba":
                        cuidadores[5]++;
                        break;
                    case "Corrientes":
                        cuidadores[6]++;
                        break;
                    case "Entre Ríos":
                        cuidadores[7]++;
                        break;
                    case "Formosa":
                        cuidadores[8]++;
                        break;
                    case "Jujuy":
                        cuidadores[9]++;
                        break;
                    case "La Pampa":
                        cuidadores[10]++;
                        break;
                    case "La Rioja":
                        cuidadores[11]++;
                        break;
                    case "Mendoza":
                        cuidadores[12]++;
                        break;
                    case "Misiones":
                        cuidadores[13]++;
                        break;
                    case "Neuquén":
                        cuidadores[14]++;
                        break;
                    case "Río Negro":
                        cuidadores[15]++;
                        break;
                    case "Salta":
                        cuidadores[16]++;
                        break;
                    case "Santa Cruz":
                        cuidadores[17]++;
                        break;
                    case "Santiago del Estero":
                        cuidadores[18]++;
                        break;
                    case "Santa Fe":
                        cuidadores[19]++;
                        break;
                    case "San Juan":
                        cuidadores[20]++;
                        break;
                    case "San Luis":
                        cuidadores[21]++;
                        break;
                    case "Tierra del Fuego":
                        cuidadores[22]++;
                        break;
                    case "Tucumán":
                        cuidadores[23]++;
                        break;
                    default:

                }
            }
        }

        return cuidadores;
    }

    public int[] getTotalReservasxTipo(List<Reserva> reservas) {
        int[] cantidadXtipo = new int[7];
        // 'Creadas', 'Aceptadas', 'Pagadas', 'Rechazadas','Ejecucion', 'Finalizadas','Cerradas'
        for (Reserva item : reservas) {

            switch (item.getStatus()) {
                case "creada-dueño":
                    cantidadXtipo[0]++;
                    break;
                case "aceptada-cuidador":
                    cantidadXtipo[1]++;
                    break;
                case "pagada-dueño":
                    cantidadXtipo[2]++;
                    break;
                case "rechazada-dueño":
                    cantidadXtipo[3]++;
                    break;
                case "rechazada-cuidador":
                    cantidadXtipo[3]++;
                    break;
                case "ejecucion":
                    cantidadXtipo[4]++;
                    break;
                case "finalizada":
                    cantidadXtipo[5]++;
                    break;
                case "comentario-dueño":
                    cantidadXtipo[5]++;
                    break;
                case "comentario-cuidador":
                    cantidadXtipo[5]++;
                    break;
                case "cerrada":
                    cantidadXtipo[6]++;
                    break;
                default:

            }
        }

        return cantidadXtipo;
    }

    private int[] getTotalReservasxMes(List<Reserva> reservas) {
        int[] cantidad = new int[7];
        int month, beforeMonth, position;
        Calendar date;

        Date referenceDate = new Date();
        Calendar c = Calendar.getInstance();
        c.setTime(referenceDate);
        c.add(Calendar.MONTH, -6);
        beforeMonth = c.get(Calendar.MONTH);
        c.set(c.get(Calendar.YEAR), c.get(Calendar.MONTH), 1);
        month = 12 - beforeMonth;

        for (Reserva item : reservas) {
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

        return cantidad;

    }

    private Calendar getDateReserva(Date item) {
     //  Date date = Date.from(localDate.atStartOfDay(ZoneId.systemDefault()).toInstant());
        Calendar reservaDate = Calendar.getInstance();
        reservaDate.setTime(item);
        return reservaDate;

    }


}