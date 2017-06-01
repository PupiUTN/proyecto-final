/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package controlador;

import modelo.Vacuna;
import org.springframework.web.bind.annotation.*;
import persistencia.VacunaDAO;

import javax.websocket.server.PathParam;
import java.util.List;


@RestController
@RequestMapping(value = "/api/vacunas")
public class VacunaFacadeREST {

    public VacunaFacadeREST() {
    }

    @RequestMapping(method = RequestMethod.GET)
    public List<Vacuna> findAll() throws Exception {
        return new VacunaDAO().findAll();
    }

    @RequestMapping(method = RequestMethod.POST)
    public void create(@RequestBody Vacuna entity) throws Exception {
        System.out.println(entity);
        VacunaDAO vacunaDAO = new VacunaDAO<>();
        vacunaDAO.create(entity);
    }

    @RequestMapping(method = RequestMethod.DELETE)
    public void delete(@RequestParam("Id") Long id) throws Exception {
        VacunaDAO vacunaDAO = new VacunaDAO();
        vacunaDAO.removeID(id);
        System.out.println("Eliminar "+id);
    }
    
}
