/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package controlador;

import modelo.Cuidador;
import modelo.Raza;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import persistencia.CuidadorDAO;
import persistencia.RazaDAO;

import javax.websocket.server.PathParam;
import java.util.List;

@RestController
@RequestMapping(value = "api/razas")
public class RazaFacadeREST {

    public RazaFacadeREST() {
    }

    @RequestMapping(method = RequestMethod.GET)
    public List<Raza> findAll() throws Exception {
        return new RazaDAO().findAll();
    }

    @RequestMapping(method = RequestMethod.POST)
    public void create(@RequestBody Raza entity) throws Exception {
        System.out.println(entity);
        RazaDAO razaDao = new RazaDAO();
        razaDao.create(entity);
    }


    @RequestMapping(value = "{id}", method = RequestMethod.GET)
    public Raza find(@PathParam("id") Long id) throws Exception {
        RazaDAO razaDAO = new RazaDAO();
        return razaDAO.find(id);

    }

    @RequestMapping(method = RequestMethod.DELETE)
    public void delete(@PathParam("id") int id) throws Exception {
        RazaDAO razaDAO = new RazaDAO();
        razaDAO.removeID(id);
        System.out.println("Eliminar " + id);
    }


}