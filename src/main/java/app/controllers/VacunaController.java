/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package app.controllers;

import app.models.entities.Vacuna;
import app.services.VacunaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping(value = "/api/vacunas")
public class VacunaController {

    @Autowired
    VacunaService vacunaService;

    @RequestMapping(method = RequestMethod.GET)
    public List<Vacuna> getVacunas() throws Exception {
        return vacunaService.getVacunas();
    }

    @RequestMapping(method = RequestMethod.POST)
    public void createVacuna(@RequestBody Vacuna entity) throws Exception {
        vacunaService.createVacuna(entity);
    }

    @RequestMapping(value = "{id}", method = RequestMethod.DELETE)
    @ResponseBody
    public void deleteVacuna(@PathVariable Long id) throws Exception {
        vacunaService.deleteVacuna(id);
    }

    @RequestMapping(method = RequestMethod.PUT)
    @ResponseBody
    public void editVacuna(@RequestBody Vacuna entity) throws Exception {
        vacunaService.editVacuna(entity);
    }
}