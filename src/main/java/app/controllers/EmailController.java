/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package app.controllers;

import app.models.entities.User;
import app.persistence.UserRepository;
import app.services.MailService;
import app.utils.MailType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping(value = "/api/email")
public class EmailController {

    private final MailService mailService;
    private final UserRepository repository;

    @Autowired
    public EmailController(MailService mailService, UserRepository repository) {
        this.mailService = mailService;
        this.repository = repository;
    }

    @RequestMapping(value = "{id}", method = RequestMethod.POST)
    @ResponseBody
    public void sendEmail(@PathVariable Long id) {
        User user = repository.getOne(id);
        mailService.sendEmail(user, MailType.WELCOME);
    }
}