package com.project.JSpotlight;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;
import java.io.IOException;
import java.nio.file.Files;
import java.util.*;

@Service
public class ImageTaggingService {
    
    @Value("${ai.service.url:http://localhost:5000/predict}")
    private String aiServiceUrl;

    public List<String> getTagsForImage(String filePath) throws IOException {
        try {
            byte[] imageBytes = Files.readAllBytes(new java.io.File(filePath).toPath());

            RestTemplate restTemplate = new RestTemplate();
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
            HttpEntity<byte[]> request = new HttpEntity<>(imageBytes, headers);

            ResponseEntity<Map> response = restTemplate.exchange(
                aiServiceUrl,
                HttpMethod.POST,
                request,
                Map.class
            );

            if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
                return (List<String>) response.getBody().get("tags");
            } else {
                return Arrays.asList("unknown");
            }
        } catch (Exception e) {
            System.err.println("Error calling AI service: " + e.getMessage());
            return Arrays.asList("error", "ai-service-unavailable");
        }
    }
}
