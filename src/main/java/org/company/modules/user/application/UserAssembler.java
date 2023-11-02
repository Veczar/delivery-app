package org.company.modules.user.application;

import lombok.AllArgsConstructor;
import org.company.modules.user.application.web.UserDto;
import org.company.modules.user.domain.User;
import org.springframework.stereotype.Component;


@Component
@AllArgsConstructor
public class UserAssembler {
    
    //private AddressMapper addressMapper;
    
    //map
    public UserDto toDto(User user) {
        UserDto userDto = new UserDto();
        userDto.setId(user.getId());
        userDto.setFirstName(user.getFirstName());
        userDto.setLastName(user.getLastName());
        userDto.setTelephoneNumber(user.getTelephoneNumber());
        
        //userDto.setAddresses(user.getAddresses().stream().map(addressMapper::toDto).collect(Collectors.toList()));
        
        return userDto;
    }
    
    /**
     * @param userDto Dto containing the data from the outside (JSON)
     * @param user    user to put the Dto's data in
     */
    //update
    public void toUser(UserDto userDto, User user) {
        user.setFirstName(userDto.getFirstName());
        user.setLastName(userDto.getLastName());
        user.setTelephoneNumber(userDto.getTelephoneNumber());
        
        //updateUserAdresses(userDto, user);
    }
}
