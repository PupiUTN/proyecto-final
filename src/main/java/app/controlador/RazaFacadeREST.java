
package app.controlador;

import app.modelo.entidades.Cuidador;
import app.modelo.entidades.Raza;
import org.springframework.web.bind.annotation.*;
import app.persistencia.CuidadorDAO;
import app.persistencia.RazaDAO;

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
    public void delete(@RequestParam("id") Long id) throws Exception {
        RazaDAO razaDAO = new RazaDAO();
        razaDAO.removeID(id);
        System.out.println("Eliminar "+id);
    }


    @RequestMapping(method = RequestMethod.PUT )
    public void put(@RequestBody Raza entity) throws Exception {
        RazaDAO razaDAO = new RazaDAO();
        razaDAO.edit(entity);
        System.out.println("editar "+entity.getId());
    }
}
