package com.project.JSpotlight;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*")
public class AuthController {
    
    @Value("${jwt.secret}")
    private String jwtSecret;

    @PostMapping("/login")
    public Map<String, String> login(@RequestBody Map<String, String> creds) {
        // Simplest hardcoded user; use DB for real users!
        if ("user".equals(creds.get("username")) && "pass".equals(creds.get("password"))) {
            Key key = Keys.hmacShaKeyFor(jwtSecret.getBytes());
            String token = Jwts.builder()
                .setSubject(creds.get("username"))
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 60 * 60 * 1000))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
            HashMap<String, String> out = new HashMap<>();
            out.put("token", token);
            return out;
        }
        throw new RuntimeException("Unauthorized");
    }
}
