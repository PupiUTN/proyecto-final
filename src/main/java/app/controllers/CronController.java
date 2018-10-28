package app.controllers;

import app.services.CronService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by joseboretto on 07/18/2018.
 */
@RestController
@RequestMapping(value = "/api/cron")
public class CronController {


    private CronService cronService;

    @Autowired
    public CronController(CronService cronService) {
        this.cronService = cronService;
    }


    @RequestMapping(value = "/moverEstadoDeEjecucionAFinalizada", method = RequestMethod.POST)
    @Scheduled(cron = "0 0 0/1 * * ?") // every 1 hour
    public ResponseEntity moverEstadoDeEjecucionAFinalizada() {
        Integer updates = cronService.moverEstadoDeEjecucionAFinalizada();
        return new ResponseEntity<>("{\"updates\": " + updates + "}", HttpStatus.OK);
    }


    @RequestMapping(value = "/moverEstadoDeAceptadaCuidadorACaido", method = RequestMethod.POST)
    @Scheduled(cron = "0 0 0/1 * * ?") // every 1 hour
    public ResponseEntity moverEstadoDeAceptadaCuidadorACaido() {
        Integer updates = cronService.moverEstadoDeAceptadaCuidadorACaido();
        return new ResponseEntity<>("{\"updates\": " + updates + "}", HttpStatus.OK);
    }

    @RequestMapping(value = "/moverEstadoDeCreadaARechazada", method = RequestMethod.POST)
    @Scheduled(cron = "0 0 0/1 * * ?") // every 1 hour
    public ResponseEntity moverEstadoDeCreadaARechazada() {
        Integer updates = cronService.moverEstadoDeCreadaDueñoARechazado();
        return new ResponseEntity<>("{\"updates\": " + updates + "}", HttpStatus.OK);
    }


    @RequestMapping(value = "/moverEstadoDeCreadaDueñoAAceptadaCuidador", method = RequestMethod.POST)
    @Scheduled(cron = "0 0 0/1 * * ?") // every 1 hour
    public ResponseEntity moverEstadoDeCreadaDueñoAAceptadaCuidador() {
        Integer updates = cronService.moverEstadoDeCreadaDueñoAAceptadaCuidador();
        return new ResponseEntity<>("{\"updates\": " + updates + "}", HttpStatus.OK);
    }


    @RequestMapping(value = "/moverEstadoDePagadaAEjecucion", method = RequestMethod.POST)
    @Scheduled(cron = "0 0 0/1 * * ?") // every 1 hour
    public ResponseEntity moverEstadoDePagadaAEjecucion() {
        Integer updates = cronService.moverEstadoDePagadaAEjecucion();
        return new ResponseEntity<>("{\"updates\": " + updates + "}", HttpStatus.OK);
    }


    @RequestMapping(value = "/moverEstadoDeNoCerradaACerrada", method = RequestMethod.POST)
    @Scheduled(cron = "0 0 0/1 * * ?") // every 1 hour
    public ResponseEntity moverEstadoDeNoCerradaACerrada() {
        Integer updates = cronService.moverEstadoDeNoComentadoACerrado();
        return new ResponseEntity<>("{\"updates\": " + updates + "}", HttpStatus.OK);
    }


}
