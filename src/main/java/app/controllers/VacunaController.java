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


@RestController
@RequestMapping(value = "/api/vacunas")
public class VacunaController {

    private final VacunaService vacunaService;

    @Autowired
    public VacunaController(VacunaService vacunaService) {
        this.vacunaService = vacunaService;
    }

    @RequestMapping(method = RequestMethod.GET)
    public List<Vacuna> getVacunas() {
        return vacunaService.getVacunas();
    }

    @RequestMapping(method = RequestMethod.POST)
    public Vacuna createVacuna(@RequestBody Vacuna entity) {
        return vacunaService.createVacuna(entity);
    }

    @RequestMapping(value = "{id}", method = RequestMethod.DELETE)
    @ResponseBody
    public void deleteVacuna(@PathVariable Long id) {
        vacunaService.deleteVacuna(id);
    }

    @RequestMapping(value = "{id}", method = RequestMethod.PUT)
    public Vacuna editVacuna(@PathVariable("id") Long id, @RequestBody Vacuna entity) {
        entity.setId(id);
        return vacunaService.editVacuna(entity);
    }

    @RequestMapping(value = "{id}", method = RequestMethod.GET)
    public Vacuna getVacuna(@PathVariable("id") Long id) {
        return vacunaService.getVacuna(id);
    }
}