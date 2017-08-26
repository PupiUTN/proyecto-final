package app.services;


import app.exception.EmailExistsException;
import app.exception.PasswordDoesNotMatchException;
import app.models.entities.Owner;
import app.persistence.OwnerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserService{
    @Autowired
    private OwnerRepository repository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Transactional
    public Owner registerNewUserAccount(Owner owner)
            throws EmailExistsException, PasswordDoesNotMatchException {

        if (!owner.passwordMatchingValidation()) {
            throw new PasswordDoesNotMatchException(
                    "Password does not match");
        }
        if (emailExist(owner.getEmail())) {
            throw new EmailExistsException(
                    "There is an account with that email address:"  + owner.getEmail());
        }

        owner.setPassword(passwordEncoder.encode(owner.getPassword()));
        owner.setRole("ROLE_USER");
        return repository.save(owner);
    }

    private boolean emailExist(String email) {
        Owner owner = repository.findByEmail(email);
        if (owner != null) {
            return true;
        }
        return false;
    }

    public Owner getUser(Long id) throws Exception {
        return repository.findOne(id);
    }

    public Owner editUser(Owner entity) throws Exception {
        return repository.save(entity);
    }
}