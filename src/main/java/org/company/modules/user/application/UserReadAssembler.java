package org.company.modules.user.application;

import org.company.modules.user.application.web.UserReadDto;
import org.company.modules.user.domain.User;
import org.company.shared.aplication.IAssembler;
import org.springframework.stereotype.Component;


@Component
public class UserReadAssembler implements IAssembler<User, UserReadDto> {
    
    //map
    public UserReadDto toDto(User user) {
        UserReadDto userReadDto = new UserReadDto();
        userReadDto.setId(user.getId());
        userReadDto.setFirstName(user.getFirstName());
        userReadDto.setLastName(user.getLastName());
        return userReadDto;
    }
    
    //update
    public void toEntity(UserReadDto userReadDto, User user) {
        user.setFirstName(userReadDto.getFirstName());
        user.setLastName(userReadDto.getLastName());
    }
}
