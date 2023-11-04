package org.company.modules.auth;

import lombok.RequiredArgsConstructor;
import org.company.modules.user.application.UserAssembler;
import org.company.modules.user.application.UserReadAssembler;
import org.company.modules.user.application.web.UserCredentialsDto;
import org.company.modules.user.application.web.UserDto;
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
    private final UserAssembler userAssembler;
    private User loggedUser = null;
    
    //todo: maven plugin for bcrypt encoder
    //private final PasswordEncoder passwordEncoder;
    
    
    public void checkCredentials(UserCredentialsDto credentialsDto) {
        User user = userRepository.findByLogin(credentialsDto.getLogin())
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
    
    //todo
    public UserReadDto registerUser(UserDto userDto) {
        if (userRepository.findByLogin(userDto.getLogin()).isPresent()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "login");
        }
        
        User newUser = new User();
        newUser.setFirstName(userDto.getFirstName());
        newUser.setLastName(userDto.getLastName());
        newUser.setEmail(userDto.getEmail());
        newUser.setLogin(userDto.getLogin());
        newUser.setPassword(userDto.getPassword());
        newUser.setTelephoneNumber(userDto.getTelephoneNumber());
        
        User savedUser = userRepository.save(newUser);
        return userReadAssembler.toDto(savedUser);
    }
    
    public UserDto getLoggedUser() {
        if (loggedUser != null) {
            return userAssembler.toDto(loggedUser);
        }
        else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No logged user");
        }
    }
}
