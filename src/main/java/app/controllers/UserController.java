/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package app.controllers;

import app.exception.EmailExistsException;
import app.exception.PasswordDoesNotMatchException;
import app.exception.TokenException;
import app.exception.UserNotFoundException;
import app.models.entities.User;
import app.security.MyUserPrincipal;
import app.services.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.security.Principal;
import java.util.UUID;


@RestController
@RequestMapping(value = "/api/user/")
public class UserController {

    private final UserService userService;
    private static final Logger LOG = LoggerFactory.getLogger(UserController.class);


    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    /**
     * http://www.baeldung.com/get-user-in-spring-security
     */
    @PreAuthorize("isAuthenticated()")
    @RequestMapping(method = RequestMethod.GET, value = "/me")
    public ResponseEntity getProfile(HttpServletRequest request) {
        LOG.info("Timeout: " + request.getSession().getMaxInactiveInterval());
        Principal principal = request.getUserPrincipal();
        return new ResponseEntity(principal, HttpStatus.OK);
    }

    /**
     * http://www.baeldung.com/registration-with-spring-mvc-and-spring-security
     * http://www.baeldung.com/spring-security-registration-password-encoding-bcrypt
     */
    @RequestMapping(method = RequestMethod.POST, value = "/registration")
    public ResponseEntity registerUserAccount(@RequestBody @Valid User user) throws EmailExistsException, PasswordDoesNotMatchException {
        userService.registerNewUserAccount(user);

        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @RequestMapping(method = RequestMethod.GET, value = "/get-mp-token")
    public RedirectView setMercadoPagoToken(@RequestParam String code, @RequestParam String email) {
        userService.setMercadoPagoToken(code, email);
        return new RedirectView("/views/cuidadores/alta-cuidador.html");
    }

    @RequestMapping(method = RequestMethod.GET, value = "/has-mp-token")
    public boolean userHasMpToken(@RequestParam String email) {
        return userService.userHasMpToken(email);
    }

    @RequestMapping(value = "{id}", method = RequestMethod.GET)
    public User getUser(@PathVariable("id") Long id) {
        return userService.getUser(id);
    }

    @PreAuthorize("hasAuthority('ROLE_USER') or hasAuthority('ROLE_CUIDADOR')")
    @RequestMapping(value = "{id}", method = RequestMethod.PUT)
    public User editUser(@PathVariable("id") Long id, @RequestBody User entity) {
        entity.setId(id);
        User user = userService.editUser(entity);
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext()
                .getAuthentication()
                .getPrincipal();
        MyUserPrincipal myUserPrincipal = (MyUserPrincipal) userDetails;
        myUserPrincipal.setUser(user);

        //update session information
        UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(userDetails, userDetails.getPassword(), userDetails.getAuthorities());
        SecurityContextHolder.getContext()
                .setAuthentication(usernamePasswordAuthenticationToken);
        return user;

    }

    @RequestMapping(method = RequestMethod.GET, value = "/get-mp-url")
    public String getMercadoPagoUrl(@RequestParam String email) {
        return userService.getMercadoPagoUrl(email);
    }

    @RequestMapping(value = "/resetPassword", method = RequestMethod.POST)
    public ResponseEntity resetPassword(@RequestParam("email") String userEmail) throws UserNotFoundException {
        userService.createPasswordResetTokenForUser(userEmail);
        return new ResponseEntity(HttpStatus.OK);
    }

    @RequestMapping(value = "/changePassword", method = RequestMethod.POST)
    public ResponseEntity changePassword(@RequestParam String email,@RequestParam String token, @RequestParam String passwordUpdated, @RequestParam String passwordMatch) throws UserNotFoundException, PasswordDoesNotMatchException, TokenException {
        userService.changePassword(email, token, passwordUpdated, passwordMatch);
        return new ResponseEntity(HttpStatus.OK);
    }
}