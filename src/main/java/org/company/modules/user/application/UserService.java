package org.company.modules.user.application;

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


@Service
public class UserService extends GenericServiceWithReadDto<User, UserDto, UserReadDto, UserRepository, UserAssembler, UserReadAssembler> {
    
    private final UserReadAssembler userReadAssembler;
    private final UserRepository userRepository;
    
    public UserService(UserRepository repository, UserAssembler assembler, UserReadAssembler readAssembler, UserReadAssembler userReadAssembler, UserRepository userRepository) {
        super(repository, assembler, readAssembler);
        this.userReadAssembler = userReadAssembler;
        this.userRepository = userRepository;
    }
    
    public Page<UserReadDto> getUsersPage(UserCriteria userCriteria) {
        Specification<User> specification = UserSpecification.build(userCriteria);
        Pageable pageable = userCriteria.getPageRequestDto().getPageRequest();

        Page<User> usersPage = userRepository.findAll(specification, pageable);
        return usersPage.map(userReadAssembler::toDto);
    }
    
//        public List<UserReadDto> getAllUsersWithCriteria(UserCriteria userCriteria) {
//            Specification<UserRead> specification = UserSpecification.build(userCriteria);
//
//            return userReadRepository.findAll(specification)
//                    .stream()
//                    .map(userReadMapper::toDto)
//                    .collect(Collectors.toList());
//        }
}
