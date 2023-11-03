package org.company.modules.auth;

import lombok.RequiredArgsConstructor;
import org.company.modules.user.application.UserReadAssembler;
import org.company.modules.user.application.web.UserReadDto;
import org.company.modules.user.domain.User;
import org.company.modules.user.domain.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;


@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final UserReadAssembler userReadAssembler;
    private UserReadDto loggedUser = null;
    
    //todo: maven plugin for bcrypt encoder
    //private final PasswordEncoder passwordEncoder;
    
    public void checkCredentials(String firstName, String lastName, String providedPassword) {
        User user = userRepository.findByFirstNameAndLastName(firstName, lastName).orElseThrow(() ->
                new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found")
        );
        
        //        if (passwordEncoder.matches(providedPassword, user.getPassword())) {
        //            return userAssembler.map(user);
        //        }
        
        if (providedPassword.equals(user.getPassword())) {
            loggedUser = userReadAssembler.toDto(user);
        }
        else {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "wrong password");
        }
    }
    
    public UserReadDto getLoggedUser() {
        if (loggedUser != null) {
            return loggedUser;
        }
        else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No logged user");
        }
    }
    
    public void logOut() {
        loggedUser = null;
    }
}
