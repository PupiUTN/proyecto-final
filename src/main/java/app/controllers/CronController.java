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


    @RequestMapping(value = "/moverEstadoDeEjecucionACerrada", method = RequestMethod.POST)
    @Scheduled(cron = "0 0 0 * * ?")// at 12:00 AM every day
    public ResponseEntity moverEstadoDeEjecucionACerrada() {
        Integer updates = cronService.moverEstadoDeEjecucionACerrada();
        return new ResponseEntity<>("{\"updates\": " + updates + "}", HttpStatus.OK);
    }


    @RequestMapping(value = "/moverEstadoDeAceptadaCuidadorACaido", method = RequestMethod.POST)
    @Scheduled(cron = "0 0 0 * * ?")// at 12:00 AM every day
    public ResponseEntity moverEstadoDeAceptadaCuidadorACaido() {
        Integer updates = cronService.moverEstadoDeAceptadaCuidadorACaido();
        return new ResponseEntity<>("{\"updates\": " + updates + "}", HttpStatus.OK);
    }


    @RequestMapping(value = "/moverEstadoDeCreadaDueñoAAceptadaCuidador", method = RequestMethod.POST)
    @Scheduled(cron = "0 0 0 * * ?")// at 12:00 AM every day
    public ResponseEntity moverEstadoDeCreadaDueñoAAceptadaCuidador() {
        Integer updates = cronService.moverEstadoDeCreadaDueñoAAceptadaCuidador();
        return new ResponseEntity<>("{\"updates\": " + updates + "}", HttpStatus.OK);
    }


    @RequestMapping(value = "/moverEstadoDePagadaAEjecucion", method = RequestMethod.POST)
    @Scheduled(cron = "0 0 0 * * ?")// at 12:00 AM every day
    public ResponseEntity moverEstadoDePagadaAEjecucion() {
        Integer updates = cronService.moverEstadoDePagadaAEjecucion();
        return new ResponseEntity<>("{\"updates\": " + updates + "}", HttpStatus.OK);
    }

}
