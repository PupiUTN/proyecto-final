package app.services;


import app.exception.EmailExistsException;
import app.exception.PasswordDoesNotMatchException;
import app.models.entities.User;
import app.persistence.UserRepository;
import app.security.Encryptor;
import app.utils.MailType;
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

import javax.annotation.PostConstruct;
import javax.crypto.Cipher;

@Service
public class UserService extends AbstractRestClientService {
    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final Encryptor encryptor;
    private final MailService mailService;


    @Value("${app.mp.pupi.url}")
    private String MP_URL;

    @Value("${app.mp.pupi.redirectUri}")
    private String MP_REDIRECT_URI;

    @Value("${app.environment}")
    private String ENVIRONMENT;

    private String APP_DOMAIN;

    @Autowired
    public UserService(UserRepository repository, PasswordEncoder passwordEncoder, Encryptor encryptor, MailService mailService) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
        this.encryptor = encryptor;
        this.mailService = mailService;
    }

    @PostConstruct
    private void setRedirectUri() {
        if ("prod".equalsIgnoreCase(ENVIRONMENT)) {
            APP_DOMAIN = "https://pupi.com.ar";
        } else {
            APP_DOMAIN = "http://localhost:5000";
        }
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
        User save = repository.save(user);
        mailService.sendEmail(user, MailType.WELCOME);
        return save;
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
        mpUser.setMpToken(encryptor.run(mpToken, Cipher.ENCRYPT_MODE));
        repository.save(mpUser);
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
        json.put("redirect_uri", String.format(APP_DOMAIN + MP_REDIRECT_URI, email));
        return new HttpEntity<>(json, PaymentsUtils.getMercadoPagoHeaders());
    }

    public String getMercadoPagoUrl(String email) {

        String redirectUri = String.format(APP_DOMAIN + MP_REDIRECT_URI, email);

        return String.format(MP_URL, MercadoPago.SDK.getClientId(), redirectUri);
    }


    public Long getTotalDueños() {
        return repository.getTotalDueños();
    }

}