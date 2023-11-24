package org.company.modules.auth;

import lombok.RequiredArgsConstructor;
import org.company.modules.address.domain.Address;
import org.company.modules.address.domain.AddressRepository;
import org.company.modules.auth.web.*;
import org.company.modules.delivery_man.domain.DeliveryMan;
import org.company.modules.delivery_man.domain.DeliveryManRepository;
import org.company.modules.partner.domain.Partner;
import org.company.modules.partner.domain.PartnerRepository;
import org.company.modules.role.domain.Role;
import org.company.modules.role.domain.RoleRepository;
import org.company.modules.user.domain.User;
import org.company.modules.user.domain.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class AuthService {
    
    private final UserRepository userRepository;
    private final PartnerRepository partnerRepository;
    private final DeliveryManRepository deliveryManRepository;
    private final RoleRepository roleRepository;
    private final AddressRepository addressRepository;
    
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    
    
    // in other words - sign in
    public AuthResponseDto authenticate(AuthRequestDto request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        
        User user = userRepository.findByEmail(request.getEmail()).orElseThrow();
        String jwtToken = jwtService.generateToken(user);
        
        return AuthResponseDto.builder()
                .token(jwtToken)
                .role(user.getRole().getName())
                .build();
    }
    
    public AuthResponseDto registerUser(RegisterUserDto userDto) {
        Role role = roleRepository.findById(1L).orElse(null);
        User user = User.builder()
                .firstName(userDto.getFirstName())
                .lastName(userDto.getLastName())
                .telephoneNumber(userDto.getTelephoneNumber())
                .email(userDto.getEmail())
                .password(passwordEncoder.encode(userDto.getPassword()))
                .role(role)
                .build();
        
        userRepository.save(user);
        String jwtToken = jwtService.generateToken(user);
        
        return AuthResponseDto.builder()
                .token(jwtToken)
                .role(role.getName())
                .build();
    }
    
    public AuthResponseDto registerAdmin(RegisterUserDto userDto) {
        Role role = roleRepository.findById(4L).orElse(null);
        User user = User.builder()
                .firstName(userDto.getFirstName())
                .lastName(userDto.getLastName())
                .telephoneNumber(userDto.getTelephoneNumber())
                .email(userDto.getEmail())
                .password(passwordEncoder.encode(userDto.getPassword()))
                .role(role)
                .build();
        
        userRepository.save(user);
        String jwtToken = jwtService.generateToken(user);
        
        return AuthResponseDto.builder()
                .token(jwtToken)
                .role(role.getName())
                .build();
    }
    
    public AuthResponseDto registerPartner(RegisterPartnerDto partnerDto) {
        Role role = roleRepository.findById(2L).orElse(null);
        Address address = addressRepository.findById(partnerDto.getAddress().getId()).orElse(null);
        
        // create user
        User user = User.builder()
                .firstName(partnerDto.getFirstName())
                .lastName(partnerDto.getLastName())
                .telephoneNumber(partnerDto.getTelephoneNumber())
                .email(partnerDto.getEmail())
                .password(passwordEncoder.encode(partnerDto.getPassword()))
                .role(role)
                .build();
        
        userRepository.save(user);
        
        
        // create partner
        Partner partner = Partner.builder()
                .name(partnerDto.getName())
                .accountNumber(partnerDto.getAccountNumber())
                .contactNumber(partnerDto.getContactNumber())
                .address(address)
                .owner(user)
                .build();
        
        partnerRepository.save(partner);
        
        String jwtToken = jwtService.generateToken(user);
        
        return AuthResponseDto.builder()
                .token(jwtToken)
                .role(role.getName())
                .build();
    }
    
    public AuthResponseDto registerCourier(RegisterDeliveryManDto deliveryManDto) {
        Role role = roleRepository.findById(3L).orElse(null);
        
        // create user
        User user = User.builder()
                .firstName(deliveryManDto.getFirstName())
                .lastName(deliveryManDto.getLastName())
                .telephoneNumber(deliveryManDto.getTelephoneNumber())
                .email(deliveryManDto.getEmail())
                .password(passwordEncoder.encode(deliveryManDto.getPassword()))
                .role(role)
                .build();
        
        userRepository.save(user);
        
        // create delivery man
        DeliveryMan deliveryMan = DeliveryMan.builder()
                .workingArea(deliveryManDto.getWorkingArea())
                .rating(0)
                .user(user)
                .build();
        
        deliveryManRepository.save(deliveryMan);
        
        String jwtToken = jwtService.generateToken(user);
        
        return AuthResponseDto.builder()
                .token(jwtToken)
                .role(role.getName())
                .build();
    }
}
