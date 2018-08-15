package app.services;

import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.http.HttpEntity;

public interface RestClientInterface {

    JsonNode post(String uri, HttpEntity<JsonNode> entity);
}
