/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package app.controllers;

import app.exception.EmailExistsException;
import app.exception.PasswordDoesNotMatchException;
import app.models.entities.User;
import app.security.MyUserDetailsService;
import app.security.MyUserPrincipal;
import app.services.MailService;
import app.services.UserService;
import app.utils.MailType;
import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.security.Principal;


@RestController
@RequestMapping(value = "/api/user/")
public class UserController {


    private final UserService userService;
    private final AuthenticationManager authenticationManager;
    private final MyUserDetailsService myUserDetailsService;
    private final MailService mailService;

    @Autowired
    public UserController(UserService userService, AuthenticationManager authenticationManager, MyUserDetailsService myUserDetailsService, MailService mailService) {
        this.userService = userService;
        this.authenticationManager = authenticationManager;
        this.myUserDetailsService = myUserDetailsService;
        this.mailService = mailService;
    }

    /**
     * http://www.baeldung.com/get-user-in-spring-security
     */
    @PreAuthorize("isAuthenticated()")
    @RequestMapping(method = RequestMethod.GET, value = "/me")
    public ResponseEntity getProfile(HttpServletRequest request) throws Exception {
        Principal principal = request.getUserPrincipal();
        return new ResponseEntity(principal, HttpStatus.OK);
    }

    /**
     * http://www.baeldung.com/registration-with-spring-mvc-and-spring-security
     * http://www.baeldung.com/spring-security-registration-password-encoding-bcrypt
     */
    @RequestMapping(method = RequestMethod.POST, value = "/registration")
    public ResponseEntity registerUserAccount(@RequestBody @Valid User user) throws EmailExistsException, PasswordDoesNotMatchException {
        User userSaved = userService.registerNewUserAccount(user);
        mailService.sendEmail(user, MailType.WELCOME);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @RequestMapping(method = RequestMethod.GET, value="/get-mp-token")
    public ResponseEntity getMercadoPagoToken(@RequestParam String code) {
        JsonNode json = userService.getMercadoPagoToken(code);
        return new ResponseEntity(json, HttpStatus.OK);
    }

    @RequestMapping(value = "{id}", method = RequestMethod.GET)
    public User getUser(@PathVariable("id") Long id) throws Exception {
        User user = userService.getUser(id);
        return user;
    }

    @PreAuthorize("hasAuthority('ROLE_USER') or hasAuthority('ROLE_CUIDADOR')")
    @RequestMapping(value = "{id}", method = RequestMethod.PUT)
    public User editUser(@PathVariable("id") Long id, @RequestBody User entity) throws Exception {
        entity.setId(id);
        User user = userService.editUser(entity);
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        MyUserPrincipal myUserPrincipal = (MyUserPrincipal) userDetails;
        myUserPrincipal.setUser(user);

        //update session information
        UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(userDetails, userDetails.getPassword(), userDetails.getAuthorities());
        SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
        return user;

    }
}