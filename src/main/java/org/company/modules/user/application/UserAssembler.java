package org.company.modules.user.application;

import lombok.AllArgsConstructor;
import org.apache.commons.lang3.ObjectUtils;
import org.company.modules.address.application.AddressAssembler;
import org.company.modules.address.application.web.AddressDto;
import org.company.modules.address.domain.Address;
import org.company.modules.role.application.RoleAssembler;
import org.company.modules.role.domain.Role;
import org.company.modules.role.domain.RoleRepository;
import org.company.modules.user.application.web.UserDto;
import org.company.modules.user.domain.User;
import org.company.shared.aplication.IAssembler;
import org.springframework.stereotype.Component;

import java.util.Map;
import java.util.Objects;
import java.util.Set;
import java.util.function.Function;
import java.util.stream.Collectors;


@Component
@AllArgsConstructor
public class UserAssembler implements IAssembler<User, UserDto> {
    
    private final RoleAssembler roleAssembler;
    private final RoleRepository roleRepository;
    private final AddressAssembler addressAssembler;
    
    //map
    public UserDto toDto(User user) {
        UserDto userDto = new UserDto();
        userDto.setId(user.getId());
        userDto.setFirstName(user.getFirstName());
        userDto.setLastName(user.getLastName());
        userDto.setEmail(user.getEmail());
        userDto.setTelephoneNumber(user.getTelephoneNumber());
        userDto.setRole(roleAssembler.toDto(user.getRole()));
        
        userDto.setAddresses(user.getAddresses()
                .stream()
                .map(addressAssembler::toDto)
                .collect(Collectors.toList()));
        
        return userDto;
    }
    
    /**
     * <ul>
     *     <li>
     *         if you want to add an addr to user: put address object in addresses array (PUT, POST).
     *     </li>
     *     <li>
     *         if you want to remove it: don't include it in PUT request.
     *     </li>
     *     <li>
     *         if you want to keep an addr: put an <B>id</B> of the ones you want to keep (PUT).
     *     </li>
     * </ul>
     * @param userDto Dto containing the data from the outside (JSON)
     * @param user    user to put the Dto's data in
     */
    //update
    public void toEntity(UserDto userDto, User user) {
        user.setFirstName(userDto.getFirstName());
        user.setLastName(userDto.getLastName());
        user.setTelephoneNumber(userDto.getTelephoneNumber());
        user.setEmail(userDto.getEmail());
        updateRole(userDto, user);
        updateUserAdresses(userDto, user);
    }
    
    private void updateRole(UserDto userDto, User user) {
        Role role = roleRepository.findById(userDto.getRole().getId()).orElse(null);
        user.setRole(role);
    }
    
    private void updateUserAdresses(UserDto userDto, User user) {
        if(!user.getAddresses().isEmpty()) {
            Set<Long> adressesIds = userDto.getAddresses()
                    .stream()
                    .map(AddressDto::getId)
                    .filter(Objects::nonNull)
                    .collect(Collectors.toSet());
            
            // gets Set of users' addresses id's and deletes ones that are not in put request
            user.getAddresses().removeIf(
                    addr -> !adressesIds.contains(addr.getId())
            );
        }
        
        // for each address in user add its id and the address obj to a map
//        HashMap<Long, Address> addresses = new HashMap<>();
//        user.getAddresses().forEach(
//                address -> addresses.put(address.getId(), address)
//        );
        Map<Long, Address> addresses = user.getAddresses()
                .stream()
                .collect(Collectors.toMap(Address::getId, Function.identity()));
        
        // checks the addresses in the Dto with the ones in the database
        // if its null it means it's a new one if not it needs an update
        userDto.getAddresses().forEach(
                addressDto -> {
                    Address address = addresses.get(addressDto.getId());
                    
                    if (ObjectUtils.anyNotNull(address)) { // address != null
                        addressAssembler.toEntity(addressDto, address);
                    }
                    else {
                        Address newAddress = new Address();
                        addressAssembler.toEntity(addressDto, newAddress);
                        user.getAddresses().add(newAddress);
                        newAddress.setUser(user);
                    }
                }
        );
        
    }
}
