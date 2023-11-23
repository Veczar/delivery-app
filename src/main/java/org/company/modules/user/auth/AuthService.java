package org.company.modules.user.auth;

import lombok.RequiredArgsConstructor;
import org.company.modules.role.domain.Role;
import org.company.modules.role.domain.RoleRepository;
import org.company.modules.user.application.UserAssembler;
import org.company.modules.user.application.UserReadAssembler;
import org.company.modules.user.application.web.UserCredentialsDto;
import org.company.modules.user.application.web.UserDto;
import org.company.modules.user.auth.web.AuthenticationRequest;
import org.company.modules.user.auth.web.AuthenticationResponse;
import org.company.modules.user.auth.web.RegisterRequest;
import org.company.modules.user.domain.User;
import org.company.modules.user.domain.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;


@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final UserReadAssembler userReadAssembler;
    private final UserAssembler userAssembler;
    private final PasswordEncoder passwordEncoder;
    private final RoleRepository roleRepository;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    
    private User loggedUser = null;
    
    //todo: maven plugin for bcrypt encoder
    //private final PasswordEncoder passwordEncoder;
    
    
    public void checkCredentials(UserCredentialsDto credentialsDto) {
        User user = userRepository.findByEmail(credentialsDto.getEmail())
            .orElseThrow(() ->
                new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found")
            );
        
        //        if (passwordEncoder.matches(providedPassword, user.getPassword())) {
        //            return userAssembler.map(user);
        //        }
        
        String providedPassword = credentialsDto.getPassword();
        if (providedPassword.equals(user.getPassword())) {
            logIn(user);
        }
        else {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "wrong password");
        }
    }
    
    private void logIn(User user) {
        loggedUser = user;
    }
    
    public void logOut() {
        loggedUser = null;
    }
    
//    //todo
//    public UserReadDto registerUser(UserDto userDto) {
//        if (userRepository.findByEmail(userDto.getEmail()).isPresent()) {
//            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "login");
//        }
//
////        User newUser = new User();
////        newUser.setFirstName(userDto.getFirstName());
////        newUser.setLastName(userDto.getLastName());
////        newUser.setEmail(userDto.getEmail());
////        newUser.setPassword(userDto.getPassword());
////        newUser.setTelephoneNumber(userDto.getTelephoneNumber());
////
////        User savedUser = userRepository.save(newUser);
////        return userReadAssembler.toDto(savedUser);
//    }
//
    public UserDto getLoggedUser() {
        if (loggedUser != null) {
            return userAssembler.toDto(loggedUser);
        }
        else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No logged user");
        }
    }
    
 
    
    //-----------------------------------
    
    
    public AuthenticationResponse register(RegisterRequest request) {
        Role role = roleRepository.findById(1L).orElse(null);
        var user = User.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(role)
                .build();
        
        userRepository.save(user);
        var jwtToken = jwtService.generateToken(user);
        
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }
    
    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        
        var user = userRepository.findByEmail(request.getEmail()).orElseThrow();
        var jwtToken = jwtService.generateToken(user);
        
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }
}
