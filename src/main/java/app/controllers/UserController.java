/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package app.controllers;

import app.exception.EmailExistsException;
import app.models.entities.User;
import app.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;


@RestController
@RequestMapping(value = "/api/user/")
public class UserController {


    @Autowired
    private UserService userService;

    @RequestMapping(method = RequestMethod.GET, value = "/me")
    public UserDetails getProfile(Authentication authentication) throws Exception {
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        return userDetails;
    }


    @RequestMapping(method = RequestMethod.POST,value = "/registration")
    public ResponseEntity registerUserAccount(@RequestBody @Valid User user) throws EmailExistsException {
        userService.registerNewUserAccount(user);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @RequestMapping(value = "{id}", method = RequestMethod.GET)
    public User getUser(@PathVariable ("id") Long id) throws Exception {
        return userService.getUser(id);
    }
}