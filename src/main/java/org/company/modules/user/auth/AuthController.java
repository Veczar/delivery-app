package org.company.modules.user.auth;

import lombok.RequiredArgsConstructor;
import org.company.modules.user.application.web.UserCredentialsDto;
import org.company.modules.user.application.web.UserDto;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("api/auth")
@RequiredArgsConstructor
public class AuthController {
    
    private final AuthService authService;
    
    @PostMapping("/login")
    public UserDto login(@RequestBody UserCredentialsDto credentials) {
        authService.checkCredentials(credentials);
        return authService.getLoggedUser();
    }
    
    @GetMapping
    public UserDto getLoggedUser() {
        return authService.getLoggedUser();
    }
    
    @DeleteMapping("/logout")
    public void logOut() {
        authService.logOut();
    }
}
