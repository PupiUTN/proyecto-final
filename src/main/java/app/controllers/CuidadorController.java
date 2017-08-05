/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package app.controllers;

import app.models.entities.Cuidador;
import app.services.CuidadorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import org.springframework.web.bind.annotation.PathVariable;

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

    @RequestMapping(value = "/search/", method = RequestMethod.GET)
    public List<Cuidador> getCuidadoresPorDireccion(
            @RequestParam(value = "ciudadPlaceId", required = false) String ciudadPlaceId) throws Exception {

        return cuidadorService.getCuidadoresPorCiudadPlaceId(ciudadPlaceId);

    }

    @RequestMapping(value = "/localidades/{id}", method = RequestMethod.GET)
    public List<Cuidador> getCuidadoresPorLocalidad(@PathVariable("id") Long id) {
        return cuidadorService.getCuidadoresPorLocalidad(id);
    }


    @RequestMapping(value = "{id}", method = RequestMethod.GET)
    public Cuidador getCuidador(@PathVariable("id") Long id) {
        return cuidadorService.getCuidador(id);
    }

    @RequestMapping(value = "{id}", method = RequestMethod.DELETE)
    public void deleteCuidador(@PathVariable("id") Long id) {
        cuidadorService.deleteCuidador(id);
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity createCuidador(@RequestBody Cuidador entity) {
        if (StringUtils.isEmpty(entity.getNombre()))
            return new ResponseEntity<>("El nombre es requerido", HttpStatus.UNSUPPORTED_MEDIA_TYPE);
        if (StringUtils.isEmpty(entity.getEmail()))
            return new ResponseEntity<>("El email es requerido", HttpStatus.UNSUPPORTED_MEDIA_TYPE);
        if (entity.getTelefono() == 0l)
            return new ResponseEntity<>("El telefono es requerido", HttpStatus.UNSUPPORTED_MEDIA_TYPE);
        if (entity.getListaImagenes() != null) if (entity.getListaImagenes().size() > 4)
            return new ResponseEntity<>("El maximo de imagenes es 4", HttpStatus.UNSUPPORTED_MEDIA_TYPE);
        cuidadorService.createCuidador(entity);
        return new ResponseEntity<>(entity, HttpStatus.OK);
    }

}
