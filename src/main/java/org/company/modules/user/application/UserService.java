package org.company.modules.user.application;

import org.company.modules.user.application.web.UserDto;
import org.company.modules.user.application.web.UserReadDto;
import org.company.modules.user.domain.User;
import org.company.modules.user.domain.UserRepository;
import org.company.shared.aplication.GenericService;
import org.company.shared.aplication.GenericServiceWithReadDto;
import org.springframework.stereotype.Service;


@Service
public class UserService extends GenericServiceWithReadDto<User, UserDto, UserReadDto, UserRepository, UserAssembler, UserReadAssembler> {
    public UserService(UserRepository repository, UserAssembler assembler, UserReadAssembler readAssembler) {
        super(repository, assembler, readAssembler);
    }

    //todo: czy nie lepiej zrobic metody mapperów static
    
    
    //    public Page<UserReadDto> getUsers(UserCriteria userCriteria) {
    //        Specification<UserRead> specification = UserReadSpecification.build(userCriteria);
    //        Pageable pageable = userCriteria.getPageRequestDto().getPageRequest();
    //
    //        Page<UserRead> usersPage = userReadRepository.findAll(specification, pageable);
    //        return usersPage.map(userReadMapper::toDto);
    //    }
    
    //    public List<UserReadDto> getAllUsersWithCriteria(UserCriteria userCriteria) {
    //        Specification<UserRead> specification = UserReadSpecification.build(userCriteria);
    //
    //        return userReadRepository.findAll(specification)
    //                .stream()
    //                .map(userReadMapper::toDto)
    //                .collect(Collectors.toList());
    //    }
}
