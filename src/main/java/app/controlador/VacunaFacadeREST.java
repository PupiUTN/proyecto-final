/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package app.controlador;

import app.modelo.entidades.Vacuna;
import org.springframework.web.bind.annotation.*;
import app.persistencia.VacunaDAO;
import java.util.List;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping(value = "/api/vacunas")
public class VacunaFacadeREST {

    private VacunaDAO instance;

    public VacunaFacadeREST() {
    }

    private VacunaDAO getInstance() {
        if (instance == null) {
            try {
                instance = new VacunaDAO<>();
                System.out.println("Instancia creada con exito");
            } catch (Exception e) {
                System.out.println("Error al crear la instancia: "e.toString());
            }
        }
        return instance;
    }


    @RequestMapping(method = RequestMethod.GET)
    public List<Vacuna> findAll() throws Exception {
        return getInstance().findAll();
    }

    @RequestMapping(method = RequestMethod.POST)
    public void create(@RequestBody Vacuna entity) throws Exception {
        getInstance().create(entity);
    }

    @RequestMapping(method = RequestMethod.DELETE)
    public void delete(@RequestParam("Id") Long id) throws Exception {
        VacunaDAO vacunaDAO = new VacunaDAO();
        vacunaDAO.removeID(id);
    }

    @RequestMapping(method = RequestMethod.PUT)
    @ResponseBody
    public void update(@RequestBody Vacuna entity) throws Exception {
        getInstance().edit(entity);
    }
}

}