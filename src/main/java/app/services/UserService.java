package app.services;


import app.exception.EmailExistsException;
import app.models.entities.User;
import app.persistence.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserService{
    @Autowired
    private UserRepository repository;

    @Transactional
    public User registerNewUserAccount(User user)
            throws EmailExistsException {

        if (emailExist(user.getEmail())) {
            throw new EmailExistsException(
                    "There is an account with that email address:"  + user.getEmail());
        }
        user.setRole("ROLE_USER");
        return repository.save(user);
    }

    private boolean emailExist(String email) {
        User user = repository.findByEmail(email);
        if (user != null) {
            return true;
        }
        return false;
    }
}