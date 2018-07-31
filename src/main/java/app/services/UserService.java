package app.services;


import app.exception.EmailExistsException;
import app.exception.PasswordDoesNotMatchException;
import app.models.entities.User;
import app.persistence.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserService {
    @Autowired
    private UserRepository repository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Transactional
    public User registerNewUserAccount(User user)
            throws EmailExistsException, PasswordDoesNotMatchException {

        if (!user.passwordMatchingValidation()) {
            throw new PasswordDoesNotMatchException(
                    "Password does not match");
        }
        if (emailExist(user.getEmail())) {
            throw new EmailExistsException(
                    "There is an account with that email address:" + user.getEmail());
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole("ROLE_USER");
        return repository.save(user);
    }

    private boolean emailExist(String email) {
        User user = repository.findByEmail(email);
        return user != null;
    }

    public User getUser(Long id) {
        return repository.findOne(id);
    }

    public User editUser(User entity) {
        return repository.save(entity);
    }
}