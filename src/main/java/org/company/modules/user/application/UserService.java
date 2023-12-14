package org.company.modules.user.application;

import org.company.modules.role.domain.RoleRepository;
import org.company.modules.user.application.web.UserDto;
import org.company.modules.user.application.web.UserReadDto;
import org.company.modules.user.domain.User;
import org.company.modules.user.domain.UserCriteria;
import org.company.modules.user.domain.UserRepository;
import org.company.modules.user.domain.UserSpecification;
import org.company.shared.aplication.GenericServiceWithReadDto;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.company.shared.aplication.IServiceWithReadDto;

import java.util.List;
import java.util.stream.Collectors;


@Service
public class UserService extends GenericServiceWithReadDto<User, UserDto, UserReadDto, UserRepository, UserAssembler, UserReadAssembler>
        implements IServiceWithReadDto<UserDto, UserReadDto> {
    
    private final UserReadAssembler userReadAssembler;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final UserAssembler userAssembler;
    
    public UserService(UserRepository repository, UserAssembler assembler, UserReadAssembler readAssembler, RoleRepository roleRepository, UserAssembler userAssembler) {
        super(repository, assembler, readAssembler);
        this.userReadAssembler = readAssembler;
        this.userRepository = repository;
        this.roleRepository = roleRepository;
        this.userAssembler = userAssembler;
    }
    
    public Page<UserReadDto> getUsersPage(UserCriteria userCriteria) {
        Specification<User> specification = UserSpecification.build(userCriteria);
        Pageable pageable = userCriteria.getPageRequestDto().getPageRequest();
        
        Page<User> usersPage = userRepository.findAll(specification, pageable);
        return usersPage.map(userReadAssembler::toDto);
    }
    
    public List<UserDto> getAllUsersRoleUser() {
        return userRepository.findByRole(roleRepository.findById(1L).orElse(null))
                .stream().map(userAssembler::toDto).collect(Collectors.toList());
    }
}
