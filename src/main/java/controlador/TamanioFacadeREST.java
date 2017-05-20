/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package controlador;

import modelo.Tamanio;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import persistencia.TamanioDAO;
import java.util.List;


@RestController
@RequestMapping(value = "/tamanios")
public class TamanioFacadeREST {

    public TamanioFacadeREST() {
    }

    @RequestMapping(method = RequestMethod.GET)
    public List<Tamanio> findAll() throws Exception {
        return new TamanioDAO().findAll();
    }

 
}
