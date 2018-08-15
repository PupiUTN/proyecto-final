/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package app.controllers;

import app.models.entities.Perro;
import app.security.MyUserPrincipal;
import app.services.PerroService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping(value = "/api/user/")
public class PerroUserController {
    @Autowired
    PerroService perroService;

    public PerroUserController() {
    }

    @RequestMapping(method = RequestMethod.POST, value = "createPerro/")
    public Perro createPerro( @RequestBody @Valid Perro entity)  {
        return perroService.createPerro(entity);
    }

    @RequestMapping(method = RequestMethod.GET, value = "{idUser}/perros")
    public List<Perro> getPerros(@PathVariable("idUser") Long id) throws Exception {
        return perroService.getPerrosByUserId(id);
    }

    @RequestMapping(value = "{idUser}/perros/{perroId}", method = RequestMethod.GET)
    public Perro getPerro(@PathVariable("idUser") Long userId, @PathVariable("perroId") Long perroId) throws Exception {
        return perroService.getPerro(perroId);
    }

    @PreAuthorize("isAuthenticated()")
    @RequestMapping(method = RequestMethod.GET, value = "me/perros")
    public List<Perro> getPerros() throws Exception {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        MyUserPrincipal myUserPrincipal = (MyUserPrincipal) userDetails;
        long id = myUserPrincipal.getUser().getId();
        return perroService.getPerrosByUserId(id);
    }

}
