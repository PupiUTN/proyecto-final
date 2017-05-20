/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package controlador;

import modelo.Raza;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import persistencia.RazaDAO;

import java.util.List;

@RestController
@RequestMapping(value = "/api/razas")
public class RazaFacadeREST {

    public RazaFacadeREST() {
    }

    @RequestMapping(method = RequestMethod.GET)
    public List<Raza> findAll() throws Exception {
        return new RazaDAO().findAll();
    }
}
