package app.services;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;

public abstract class AbstractRestClientService implements RestClientInterface {

    private RestTemplate restTemplate;
    protected ObjectMapper mapper;

    public AbstractRestClientService() {
        restTemplate = new RestTemplate();
        mapper = new ObjectMapper();
    }

    @Override
    public JsonNode post(String uri, HttpEntity<JsonNode> entity) {
        JsonNode resp = null;
        if (uri == null) {
            throw new RuntimeException("Uri can't be null");
        }
        ResponseEntity<String> response = restTemplate.postForEntity(uri, entity, String.class);
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
