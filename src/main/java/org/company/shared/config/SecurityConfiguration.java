package org.company.shared.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
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
                                .requestMatchers("api/auth/**").permitAll()
                                .requestMatchers("api/users/**").hasAuthority("ADMIN")
                                .requestMatchers("api/partners/**").hasAuthority("ADMIN")
                                .requestMatchers("api/delivery_mans/**").hasAuthority("ADMIN")
                                .requestMatchers("api/addresses/**").hasAuthority("ADMIN")
                                .requestMatchers("api/products/**").hasAuthority("ADMIN")
                                .requestMatchers("api/categories/**").hasAuthority("ADMIN")
                                .requestMatchers("api/partners/reviews/**").hasAuthority("ADMIN")
                                .requestMatchers("api/orders/**").hasAuthority("ADMIN")
                )
                .sessionManagement((session) -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);
     
        return http.build();
    }
}
