package org.company.modules.user.application;

import lombok.RequiredArgsConstructor;
import org.company.modules.user.application.web.UserDto;
import org.company.modules.user.application.web.UserReadDto;
import org.company.modules.user.domain.User;
import org.company.modules.user.domain.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
public class UserService {
    
    private final UserRepository userRepository;
    private final UserAssembler userAssembler;
    private final UserReadAssembler userReadAssembler;
    
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
    
    public List<UserDto> getAllUsers() {
        return userRepository.findAll()
                .stream()
                .map(userAssembler::toDto)
                .collect(Collectors.toList());
    }
    
    public List<UserReadDto> getAllUsersRead() {
        return userRepository.findAll()
                .stream()
                .map(userReadAssembler::toDto)
                //                .sorted(Comparator.comparing(UserReadDto::getLastName)
                //                        .thenComparing(UserReadDto::getFirstName))
                .collect(Collectors.toList());
    }
    
    public UserDto getUser(Long id) {
        User user = userRepository.findById(id).orElse(null);
        
        if (user == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
        return userAssembler.toDto(user);
    }
    
    // statements printed twice is the result of p6spy logging error
    // hibernate displays it correctly
    @Transactional
    public UserDto removeUser(Long id) {
        User user = userRepository.findById(id).orElse(null);
        
        if (user == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
        userRepository.deleteById(id);
        return userAssembler.toDto(user);
    }
    
    public UserDto saveUser(UserDto dto) {
        User user = new User();
        userAssembler.toUser(dto, user);
        userRepository.save(user);
        return userAssembler.toDto(user);
    }
    
    @Transactional
    public UserDto update(Long id, UserDto userDto) {
        User userToUpdate = userRepository.findById(id).orElse(null);
        
        if (userToUpdate == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
        
        userAssembler.toUser(userDto, userToUpdate);
        userRepository.save(userToUpdate); // nie trzeba przy transakcjach ale widac id od razu
        return userAssembler.toDto(userToUpdate);
    }
}
