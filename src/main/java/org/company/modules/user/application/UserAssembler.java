package org.company.modules.user.application;

import lombok.AllArgsConstructor;
import org.company.modules.role.application.RoleAssembler;
import org.company.modules.role.domain.Role;
import org.company.modules.role.domain.RoleRepository;
import org.company.modules.user.application.web.UserDto;
import org.company.modules.user.domain.User;
import org.company.shared.aplication.IAssembler;
import org.springframework.stereotype.Component;


@Component
@AllArgsConstructor
public class UserAssembler implements IAssembler<User, UserDto> {
    
    private final RoleAssembler roleAssembler;
    private final RoleRepository roleRepository;
    
    //map
    public UserDto toDto(User user) {
        UserDto userDto = new UserDto();
        userDto.setId(user.getId());
        userDto.setFirstName(user.getFirstName());
        userDto.setLastName(user.getLastName());
        userDto.setEmail(user.getEmail());
//        userDto.setLogin(user.getLogin());
        userDto.setPassword(user.getPassword());
        userDto.setTelephoneNumber(user.getTelephoneNumber());
        userDto.setRole(roleAssembler.toDto(user.getRole()));
        
        return userDto;
    }
    
    /**
     * @param userDto Dto containing the data from the outside (JSON)
     * @param user    user to put the Dto's data in
     */
    //update
    public void toEntity(UserDto userDto, User user) {
        user.setFirstName(userDto.getFirstName());
        user.setLastName(userDto.getLastName());
        user.setTelephoneNumber(userDto.getTelephoneNumber());
        user.setEmail(userDto.getEmail());
        user.setPassword(userDto.getPassword());
        updateRole(userDto, user);
        //        user.setLogin(user.getLogin());
    }
    
    private void updateRole(UserDto userDto, User user) {
        Role role = roleRepository.findById(userDto.getRole().getId()).orElse(null);
        user.setRole(role);
    }
}
