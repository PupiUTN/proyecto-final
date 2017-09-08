/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package app.controllers;

import app.models.entities.Cuidador;
import app.models.entities.Servicio;
import app.services.CuidadorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping(value = "/api/cuidadores")
public class CuidadorController {

    @Autowired
    private CuidadorService cuidadorService;

    @RequestMapping(method = RequestMethod.GET)
    public List<Cuidador> getCuidadores() throws Exception {
        return cuidadorService.getCuidadores();
    }

//    @RequestMapping(value = "/search/", method = RequestMethod.GET)
//    public List<Cuidador> getCuidadoresPorDireccion(
//            @RequestParam(value = "ciudadPlaceId", required = false) String ciudadPlaceId) throws Exception {
//
//        return cuidadorService.getCuidadoresPorCiudadPlaceId(ciudadPlaceId);
//
//    }
    @RequestMapping(value = "/search/", method = RequestMethod.GET)
    public List<Cuidador> getCuidadoresPorDireccionYFechasReseva(
            @RequestParam(value = "ciudadPlaceId", required = false) String ciudadPlaceId,
            @RequestParam(value = "from", required = false) Date from,
            @RequestParam(value = "to", required = false) Date to) throws Exception {

        if(from==null&& to==null){
            return cuidadorService.getCuidadoresPorCiudadPlaceId(ciudadPlaceId);
        }
        return cuidadorService.getCuidadoresPorCiudadYFecha(ciudadPlaceId,from,to);

    }

   /* @RequestMapping(value = "/localidades/{id}", method = RequestMethod.GET)
    public List<Cuidador> getCuidadoresPorLocalidad(@PathVariable("id") Long id) {
        return cuidadorService.getCuidadoresPorLocalidad(id);
    }*/


    @RequestMapping(value = "{id}", method = RequestMethod.GET)
    public Cuidador getCuidador(@PathVariable("id") Long id) {
        return cuidadorService.getCuidador(id);
    }

    @RequestMapping(value = "{id}", method = RequestMethod.DELETE)
    public void deleteCuidador(@PathVariable("id") Long id) {
        cuidadorService.deleteCuidador(id);
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity createCuidador(@RequestBody @Valid Cuidador entity) {
        cuidadorService.createCuidador(entity);
        return new ResponseEntity<>(entity, HttpStatus.OK);
    }

    @RequestMapping(value = "{id}", method = RequestMethod.PUT)
    public @ResponseBody Cuidador editCuidador(@PathVariable("id") Long id, @RequestBody Cuidador entity) throws Exception {
        entity.setId(id);
        return cuidadorService.editCuidador(entity);
    }

    @RequestMapping(value = "/searchServicios/", method = RequestMethod.GET)
    public List<Servicio> getServicios() throws Exception {

        return cuidadorService.getListaServicios();

    }


    @RequestMapping(value = "/SearchCuidadorxUser/", method = RequestMethod.GET)
    public Cuidador getCuidadorxUsuario(@RequestParam(value = "id", required = false) long id )throws Exception {

          return cuidadorService.cuidadorXUser(id);

    }

}
