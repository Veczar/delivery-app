package org.company.modules.role.application;

import org.company.modules.role.application.web.RoleDto;
import org.company.modules.role.domain.Role;
import org.springframework.stereotype.Component;


@Component
public class RoleAssembler {
    
    public RoleDto toDto(Role role) {
        RoleDto roleDto = new RoleDto();
        roleDto.setId(role.getId());
        roleDto.setName(role.getName());
        return roleDto;
    }
    
    public void toEntity(RoleDto roleDto, Role role) {
        role.setName(roleDto.getName());
    }
}
