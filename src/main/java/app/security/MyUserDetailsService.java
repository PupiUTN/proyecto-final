package app.security;

import app.models.entities.Owner;
import app.persistence.OwnerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class MyUserDetailsService implements UserDetailsService {

    @Autowired
    private OwnerRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) {
//        http://www.baeldung.com/spring-security-authentication-with-a-database
        Owner owner = userRepository.findByEmail(username);
        if (owner == null) {
            throw new UsernameNotFoundException(username);
        }
        return new MyUserPrincipal(owner);
    }
}