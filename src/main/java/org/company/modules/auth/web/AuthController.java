package org.company.modules.auth.web;

import lombok.RequiredArgsConstructor;
import org.company.modules.auth.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("api/auth")
@CrossOrigin(origins = "http://localhost:4200")
@RequiredArgsConstructor
public class AuthController {
    
    private final AuthService authService;
    
    @PostMapping("/authenticate")
    public ResponseEntity<AuthResponseDto> authenticate(@RequestBody AuthRequestDto authRequestDto) {
        return ResponseEntity.ok(authService.authenticate(authRequestDto));
    }
    
    @PostMapping("/register/user")
    public ResponseEntity<AuthResponseDto> registerUser(@RequestBody RegisterUserDto registerUserDto) {
        return ResponseEntity.ok(authService.registerUser(registerUserDto));
    }
    
    @PostMapping("/register/admin")
    public ResponseEntity<AuthResponseDto> registerAdmin(@RequestBody RegisterUserDto registerUserDto) {
        return ResponseEntity.ok(authService.registerAdmin(registerUserDto));
    }
    
    @PostMapping("/register/partner")
    public ResponseEntity<AuthResponseDto> registerPartner(@RequestBody RegisterPartnerDto registerPartnerDto) {
        return ResponseEntity.ok(authService.registerPartner(registerPartnerDto));
    }
    
    @PostMapping("/register/courier")
    public ResponseEntity<AuthResponseDto> registerCourier(@RequestBody RegisterDeliveryManDto registerDeliveryManDto) {
        return ResponseEntity.ok(authService.registerCourier(registerDeliveryManDto));
    }
}
