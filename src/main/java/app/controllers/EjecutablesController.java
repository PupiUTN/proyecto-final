/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package app.controllers;

import app.services.EjecutablesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import java.util.Date;

@RestController
@RequestMapping(value = "/api/test")
public class EjecutablesController {

    @Autowired
    EjecutablesService ejecutablesService;

    @RequestMapping(value = "ping", method = RequestMethod.GET)
    public String ping() {
        return " Ping : " + new Date();
    }

    @RequestMapping(value = "insert", method = RequestMethod.GET)
    public String insert() throws Exception {

       return ejecutablesService.insert();
    }

    @RequestMapping(value = "drop", method = RequestMethod.GET)
    public String drop() throws Exception {
        return ejecutablesService.drop();
    }

}
