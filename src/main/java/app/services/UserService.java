package app.services;


import app.exception.EmailExistsException;
import app.exception.PasswordDoesNotMatchException;
import app.models.entities.User;
import app.persistence.UserRepository;
import app.utils.PaymentsUtils;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.mercadopago.MercadoPago;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserService extends AbstractRestClientService {
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
                    "There is an account with that email address:"  + user.getEmail());
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
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

    public User getUser(Long id) throws Exception {
        return repository.findOne(id);
    }

    public User editUser(User entity) throws Exception {
        return repository.save(entity);
    }

    public JsonNode getMercadoPagoToken(String code) {
        JsonNode json = post("https://api.mercadopago.com/oauth/token", getPostEntity("123"));
        return json;
    }

    private HttpEntity<JsonNode> getPostEntity(String code) {
        ObjectNode json = mapper.createObjectNode();
        json.put("client_id", MercadoPago.SDK.getClientId());
        json.put("client_secret", MercadoPago.SDK.getClientSecret());
        json.put("grant_type", "authorization_code");
        json.put("code", code);
        json.put("redirect_uri", "http://localhost:5000/getOAuthToken");
        return new HttpEntity<>(json, PaymentsUtils.getMercadoPagoHeaders());
    }


}