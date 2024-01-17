package org.company.modules.auth.web;

import lombok.RequiredArgsConstructor;
import org.company.modules.auth.AuthService;
import org.company.modules.partner.application.web.PartnerDto;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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
    public ResponseEntity<RegisterResponseDto> registerUser(@RequestBody RegisterUserDto registerUserDto) {
        return ResponseEntity.ok(authService.registerUser(registerUserDto));
    }
    
    @PostMapping("/register/admin")
    public ResponseEntity<RegisterResponseDto> registerAdmin(@RequestBody RegisterUserDto registerUserDto) {
        return ResponseEntity.ok(authService.registerAdmin(registerUserDto));
    }

    @PostMapping("/register/partner")
    public ResponseEntity<RegisterResponseDto> registerPartner(@RequestPart("photo") MultipartFile photo,
                                                               @RequestPart(name = "partner") RegisterPartnerDto registerDeliveryManDto) {
        return ResponseEntity.ok(authService.registerPartner(registerDeliveryManDto, photo));
    }

    @PostMapping("/register/courier")
    public ResponseEntity<RegisterResponseDto> registerCourier(@RequestBody RegisterDeliveryManDto registerDeliveryManDto) {
        return ResponseEntity.ok(authService.registerCourier(registerDeliveryManDto));
    }
}
