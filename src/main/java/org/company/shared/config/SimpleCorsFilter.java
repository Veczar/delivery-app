package org.company.shared.config;

import org.springframework.stereotype.Component;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;


@Component
@EnableWebMvc
public class SimpleCorsFilter implements WebMvcConfigurer  {
    
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        
        registry.addMapping("/api/**")
                .allowedOrigins("http://localhost:4200", "http://localhost:8080")
                .allowedMethods("POST", "GET", "PUT", "DELETE")
                .allowedHeaders("Content-Type", "Authorization");
    }
}
