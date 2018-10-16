/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package app.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.annotation.security.PermitAll;

@Controller
@RequestMapping(value = "/")
public class HomeController {


    @RequestMapping(method = RequestMethod.GET)
    @PermitAll
    public String home() {
        return "/views/index/index.html";
    }



}
