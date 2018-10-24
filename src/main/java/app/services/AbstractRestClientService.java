package app.services;

import app.models.entities.User;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;

public abstract class AbstractRestClientService implements RestClientInterface {

    protected ObjectMapper mapper;
    private RestTemplate restTemplate;

    public AbstractRestClientService() {
        restTemplate = new RestTemplate();
        mapper = new ObjectMapper();
    }

    @Override
    public JsonNode post(String uri, HttpEntity<JsonNode> entity) {
        if (uri == null) {
            throw new RuntimeException("Uri can't be null");
        }
        ResponseEntity<String> response = restTemplate.postForEntity(uri, entity, String.class);
        JsonNode resp = null;
        if (response.getStatusCode() == HttpStatus.OK) {
            try {
                resp = mapper.readTree(response.getBody());
            } catch (IOException e) {
                e.printStackTrace();
            }
        } else if (response.getStatusCode() == HttpStatus.NOT_FOUND) {
            resp = mapper.createObjectNode();
        }
        return resp;
    }
}
