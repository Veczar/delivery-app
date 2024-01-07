package org.company.modules.auth;

import lombok.RequiredArgsConstructor;
import org.company.modules.address.application.AddressAssembler;
import org.company.modules.address.domain.Address;
import org.company.modules.address.domain.AddressRepository;
import org.company.modules.auth.web.*;
import org.company.modules.category.domain.Category;
import org.company.modules.category.domain.CategoryRepository;
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

import java.text.SimpleDateFormat;
import java.util.Set;



@Service
@RequiredArgsConstructor
public class AuthService {
    
    private final UserRepository userRepository;
    private final PartnerRepository partnerRepository;
    private final DeliveryManRepository deliveryManRepository;
    private final RoleRepository roleRepository;
    private final AddressRepository addressRepository;
    private final CategoryRepository categoryRepository;
    
    private final AddressAssembler addressAssembler;
    
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final SimpleDateFormat isoFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss");
    
    
    // in other words - sign in
    public AuthResponseDto authenticate(AuthRequestDto request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );
        
        User user = userRepository.findByEmail(request.getEmail()).orElseThrow();
        String jwtToken = jwtService.generateToken(user);
        
        return AuthResponseDto.builder()
                .token(jwtToken)
                .role(user.getRole().getName())
                .expirationDate(isoFormat.format(jwtService.extractExpiration(jwtToken)))
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .id(user.getId())
                .build();
    }
    
    public RegisterResponseDto registerUser(RegisterUserDto userDto) {
        if (!isEmailAvailable(userDto.getEmail())) {
            return RegisterResponseDto.builder().message("email not available").build();
        }
        
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
        
        // todo: add address to user registration form
//        Address address = new Address();
//        addressAssembler.toEntity(userDto.getAddress(), address);
//        address.setUser(user);
//        addressRepository.save(address);
//
//        user.getAddresses().add(address);
        
        return RegisterResponseDto.builder().message("success").build();
    }
    
    public RegisterResponseDto registerAdmin(RegisterUserDto userDto) {
        if (!isEmailAvailable(userDto.getEmail())) {
            return RegisterResponseDto.builder().message("email not available").build();
        }
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
        
        return RegisterResponseDto.builder().message("success").build();
    }
    
    public RegisterResponseDto registerPartner(RegisterPartnerDto partnerDto) {
        if (!isEmailAvailable(partnerDto.getEmail())) {
            return RegisterResponseDto.builder().message("email not available").build();
        }
        Role role = roleRepository.findById(2L).orElse(null);

        Category category = categoryRepository.findByName(partnerDto.getCategory()).orElse(null);
        
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
        
        Address address = new Address();
        addressAssembler.toEntity(partnerDto.getAddress(), address);
        address.setUser(user);
        addressRepository.save(address);
        
        user.getAddresses().add(address);
        
        // create partner
        Partner partner = Partner.builder()
                .name(partnerDto.getName())
                .accountNumber(partnerDto.getAccountNumber())
                .contactNumber(partnerDto.getContactNumber())
                .owner(user)
                .categories(Set.of(category))
                .build();
        
        partnerRepository.save(partner);
        
        return RegisterResponseDto.builder().message("success").build();
    }
    
    public RegisterResponseDto registerCourier(RegisterDeliveryManDto deliveryManDto) {
        if (!isEmailAvailable(deliveryManDto.getEmail())) {
            return RegisterResponseDto.builder().message("email not available").build();
        }
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
                .accountNumber(deliveryManDto.getAccountNumber())
                .user(user)
                .build();
        
        deliveryManRepository.save(deliveryMan);
        
        return RegisterResponseDto.builder().message("success").build();
    }
    
    /**
     * checks if account with this email is already created
     * @param providedEmail email from registration form
     * @return true - if email available / no account with this email in database
     */
    private boolean isEmailAvailable(String providedEmail) {
        User user = userRepository.findByEmail(providedEmail).orElse(null);
        return user == null;
    }
}
