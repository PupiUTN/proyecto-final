/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package app.controlador;


import app.modelo.entidades.Localidad;
import app.modelo.entidades.Provincia;
import app.persistencia.LocalidadDAO;
import app.persistencia.ProvinciaDAO;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;


import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@RestController
@RequestMapping(value = "/api/provincias")
public class ProvinciaREST {

    public ProvinciaREST() {
    }

    @RequestMapping(method = RequestMethod.GET)
    public List<Provincia> findAll() throws Exception {
        ProvinciaDAO provinciaDAO = new ProvinciaDAO();
        List<Provincia> findAll = provinciaDAO.findAll();
        return findAll;
    }

    @RequestMapping(value = "{id}/localidades", method = RequestMethod.GET)
    public List<Localidad> findAll(@PathVariable("id") Long id) throws Exception {
        LocalidadDAO localidadDAO = new LocalidadDAO();
        List<Localidad> findAll = localidadDAO.findAll("provincia",id);
        return findAll;
    }
}
