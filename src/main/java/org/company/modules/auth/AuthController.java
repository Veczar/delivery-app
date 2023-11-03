package org.company.modules.auth;

import lombok.RequiredArgsConstructor;
import org.company.modules.user.application.web.UserCredentialsDto;
import org.company.modules.user.application.web.UserReadDto;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("api/auth")
@RequiredArgsConstructor
public class AuthController {
    
    private final AuthService authService;
    
    @PostMapping("/login")
    public UserReadDto login(@RequestBody UserCredentialsDto credentials) {
        authService.checkCredentials(
                credentials.getFirstName(),
                credentials.getLastName(),
                credentials.getPassword()
        );
        return authService.getLoggedUser();
    }
    
    @GetMapping
    public UserReadDto getLoggedUser() {
        return authService.getLoggedUser();
    }
    
    @DeleteMapping("/logout")
    public void logOut() {
        authService.logOut();
    }
}
