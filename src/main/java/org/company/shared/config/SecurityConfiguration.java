package org.company.shared.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;


@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfiguration {
    
    private final JwtAuthenticationFilter jwtAuthFilter;
    private final AuthenticationProvider authenticationProvider;
    
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .cors(Customizer.withDefaults())
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests((authorize) -> authorize
//                                .anyRequest().permitAll()
                                .requestMatchers("api/auth/**").permitAll()
                        
                                .requestMatchers("api/users/**").hasAnyAuthority("ADMIN", "USER") //user only for himself - will check elsewhere
                                
                                .requestMatchers("api/partners/**").hasAnyAuthority("ADMIN", "PARTNER")
                                .requestMatchers(HttpMethod.GET, "/api/partners/**").hasAuthority("USER")
                                
                                .requestMatchers("api/delivery_mans/**").hasAuthority("ADMIN")
                        
                                .requestMatchers("api/addresses/**").hasAuthority("ADMIN")
                        
                                .requestMatchers("api/products/**").hasAnyAuthority("ADMIN", "PARTNER")
                                .requestMatchers(HttpMethod.GET, "/api/partners/**").hasAuthority("USER")
                                
                                .requestMatchers("api/categories/**").hasAnyAuthority("ADMIN", "PARTNER")
                        
                                .requestMatchers("api/partners/reviews/**").hasAnyAuthority("ADMIN", "USER", "PARTNER", "COURIER")
                        
                                .requestMatchers("api/orders/**").hasAnyAuthority("ADMIN")
                                .requestMatchers(HttpMethod.GET, "/api/partners/**").hasAnyAuthority("USER", "PARTNER")
                                .requestMatchers(HttpMethod.POST, "/api/partners/**").hasAuthority("USER")
                        
                                .requestMatchers("api/product_order/**").hasAnyAuthority("ADMIN", "USER", "PARTNER")
                )
                .sessionManagement((session) -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);
     
        return http.build();
    }
}
