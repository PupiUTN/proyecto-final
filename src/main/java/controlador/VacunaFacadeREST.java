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

    private VacunaDAO instance;

    public VacunaFacadeREST() {
    }

    private VacunaDAO getInstance() {
        if(instance == null) {
            try {
                instance = new VacunaDAO<>();
                System.out.println("Instancia creada con exito");
            }
            catch(Exception e) {
                System.out.println("Error al crear la instancia: " + e.toString());
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

    @RequestMapping(value = "{id}", method = RequestMethod.DELETE)
    @ResponseBody
    public void delete(@PathVariable Long id) throws Exception {
        getInstance().removeID(id);
        System.out.println("Eliminar "+id);
    }

    @RequestMapping(method = RequestMethod.PUT)
    @ResponseBody
    public void update(@RequestBody Vacuna entity) throws Exception{
        getInstance().edit(entity);
    }
}
