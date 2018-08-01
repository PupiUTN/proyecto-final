package app.services;


import app.exception.EmailExistsException;
import app.exception.PasswordDoesNotMatchException;
import app.models.entities.User;
import app.persistence.UserRepository;
import app.security.Encryptor;
import app.utils.PaymentsUtils;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.mercadopago.MercadoPago;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.crypto.Cipher;

@Service
public class UserService extends AbstractRestClientService {
    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;

    @Value("${app.mp.pupi.encryptKey}")
    private String KEY;

    @Value("${app.mp.pupi.encryptVector}")
    private String VECTOR;

    @Value("${app.mp.pupi.url}")
    private String MP_URL;

    @Value("${app.mp.pupi.redirectUri}")
    private String MP_REDIRECT_URI;

    @Autowired
    public UserService(UserRepository repository, PasswordEncoder passwordEncoder) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
    }

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


    public void setMercadoPagoToken(String code, String email) {
        User mpUser = repository.findByEmail(email);
        JsonNode json = post("https://api.mercadopago.com/oauth/token", getPostEntity(code, email));
        String mpToken = json.get("access_token")
                .toString();
        mpUser.setMpToken(Encryptor.run(KEY, VECTOR, mpToken, Cipher.ENCRYPT_MODE));
        repository.save(mpUser);
    }

    public String getMercadoPagoToken(String email) {
        User mpUser = repository.findByEmail(email);
        return Encryptor.run(KEY, VECTOR, mpUser.getMpToken(), Cipher.DECRYPT_MODE);
    }

    public boolean userHasMpToken(String email) {
        return repository.findByEmail(email)
                .getMpToken() != null;
    }

    private HttpEntity<JsonNode> getPostEntity(String code, String email) {
        ObjectNode json = mapper.createObjectNode();
        json.put("client_id", MercadoPago.SDK.getClientId());
        json.put("client_secret", MercadoPago.SDK.getClientSecret());
        json.put("grant_type", "authorization_code");
        json.put("code", code);
        json.put("redirect_uri", "http://localhost:5000/api/user/get-mp-token?email=" + email);
        return new HttpEntity<>(json, PaymentsUtils.getMercadoPagoHeaders());
    }

    public String getMercadoPagoUrl(String email) {
        String redirectUri = String.format(MP_REDIRECT_URI, email);

        return String.format(MP_URL, MercadoPago.SDK.getClientId(), redirectUri);
    }


}