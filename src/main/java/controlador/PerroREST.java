/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package controlador;

import modelo.Perro;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import persistencia.PerroDAO;
import java.util.List;

@RestController
@RequestMapping(value = "/api/perros")
public class PerroREST {

    public PerroREST() {
    }

    @RequestMapping(method = RequestMethod.POST)
    public void create(@RequestBody Perro entity) throws Exception {
        System.out.println(entity);
        PerroDAO perroDAO = new PerroDAO();
        perroDAO.create(entity);
    }

    @RequestMapping(method = RequestMethod.GET)
    public List<Perro> findAll() throws Exception {
        PerroDAO perroDAO = new PerroDAO();
        List<Perro> findAll = perroDAO.findAll();
        return findAll;
    }

}
