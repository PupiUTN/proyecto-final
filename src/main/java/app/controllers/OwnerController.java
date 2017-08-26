/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package app.controllers;

import app.exception.EmailExistsException;
import app.exception.PasswordDoesNotMatchException;
import app.models.entities.Owner;
import app.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.security.Principal;


@RestController
@RequestMapping(value = "/api/owner/")
public class OwnerController {


    @Autowired
    private UserService userService;

    /**
     * http://www.baeldung.com/get-user-in-spring-security
     */
    @RequestMapping(method = RequestMethod.GET, value = "/me")
    public ResponseEntity getProfile(HttpServletRequest request) throws Exception {
        Principal principal = request.getUserPrincipal();
        if (principal == null) return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        return new ResponseEntity(principal, HttpStatus.OK);
    }


    /**
     * http://www.baeldung.com/registration-with-spring-mvc-and-spring-security
     * http://www.baeldung.com/spring-security-registration-password-encoding-bcrypt
     */
    @RequestMapping(method = RequestMethod.POST, value = "/registration")
    public ResponseEntity registerUserAccount(@RequestBody @Valid Owner owner) throws EmailExistsException, PasswordDoesNotMatchException {
        userService.registerNewUserAccount(owner);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @RequestMapping(value = "{id}", method = RequestMethod.GET)
    public Owner getUser(@PathVariable("id") Long id) throws Exception {
        Owner owner = userService.getUser(id);
        return owner;
    }

    @RequestMapping(value = "{id}", method = RequestMethod.PUT)
    public Owner editUser(@PathVariable("id") Long id, @RequestBody Owner entity) throws Exception {
        entity.setId(id);
        return userService.editUser(entity);
    }
}