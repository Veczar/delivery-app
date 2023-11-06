package org.company.modules.user.application;

import lombok.AllArgsConstructor;
import org.company.modules.user.application.web.UserDto;
import org.company.modules.user.domain.User;
import org.springframework.stereotype.Component;


@Component
@AllArgsConstructor
public class UserAssembler {
    
    
    
    //map
    public UserDto toDto(User user) {
        UserDto userDto = new UserDto();
        userDto.setId(user.getId());
        userDto.setFirstName(user.getFirstName());
        userDto.setLastName(user.getLastName());
        userDto.setEmail(user.getEmail());
        userDto.setLogin(user.getLogin());
        userDto.setPassword(user.getPassword());
        userDto.setTelephoneNumber(user.getTelephoneNumber());
        userDto.setRole(user.getRole());
        
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
        user.setEmail(userDto.getEmail());
        user.setLogin(user.getLogin());
        user.setPassword(userDto.getPassword());
        user.setTelephoneNumber(userDto.getTelephoneNumber());
        user.setRole(userDto.getRole());
    }
}
