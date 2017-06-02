/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package app.controlador;

import app.modelo.entidades.Cuidador;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import app.persistencia.CuidadorDAO;

import org.springframework.web.bind.annotation.PathVariable;
import java.util.List;

@RestController
@RequestMapping(value = "/api/cuidadores")
public class CuidadorREST {

    public CuidadorREST() {
    }

    @RequestMapping(method = RequestMethod.GET)
    public List<Cuidador> findAll() throws Exception {
        CuidadorDAO cuidadorDAO = new CuidadorDAO();
        return cuidadorDAO.findAll();
    }

    @RequestMapping(value = "localidades/{id}", method = RequestMethod.GET)
    public List<Cuidador> findPorLocalidad(@PathVariable("id") Long id) throws Exception {
        CuidadorDAO cuidadorDAO = new CuidadorDAO();
        return cuidadorDAO.findPorLocalidad(id.intValue());

    }

    @RequestMapping(value = "{id}", method = RequestMethod.GET)
    public Cuidador find(@PathVariable("id") Long id) throws Exception {
        CuidadorDAO cuidadorDAO = new CuidadorDAO();
        return cuidadorDAO.find(id);

    }

    @RequestMapping(value = "{id}", method = RequestMethod.DELETE)
    public void delete(@PathVariable("id") Long id) throws Exception {
        CuidadorDAO cuidadorDAO = new CuidadorDAO();
        cuidadorDAO.removeID(id);
        System.out.println("Eliminar " + id);
        //return cuidadorDAO.find(id);
    }

    @RequestMapping(method = RequestMethod.POST)
    public void create(@RequestBody Cuidador entity) throws Exception {
        System.out.println(entity);
        CuidadorDAO cuidadorDAO = new CuidadorDAO();
        cuidadorDAO.create(entity);
    }

}
