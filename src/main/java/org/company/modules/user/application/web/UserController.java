package org.company.modules.user.application.web;

import lombok.AllArgsConstructor;
import org.company.modules.user.application.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("api/users")
@CrossOrigin(origins = "http://localhost:4200")
@AllArgsConstructor
public class UserController {
    
    private final UserService userService;
    
    
    //    @PostMapping("/read/page")
    //    public ResponseEntity<Page<UserReadDto>> getUsers(@RequestBody UserCriteria criteria) {
    //        Page<UserReadDto> users = userService.getUsers(criteria);
    //        return ResponseEntity.ok(users);
    //    }
    
    //    @PostMapping("/read")
    //    public List<UserReadDto> getAllUsersRead(@RequestBody UserCriteria userCriteria) {
    //        return userService.getAllUsersWithCriteria(userCriteria);
    //    }
    
    @GetMapping
    public List<UserDto> getAllUsers() {
        return userService.getAllUsers();
    }
    
    @GetMapping("/read")
    public List<UserReadDto> getAllUsersRead() {
        return userService.getAllUsersRead();
    }
    
    @GetMapping("/{id}")
    public UserDto getUser(@PathVariable Long id) {
        return userService.getUser(id);
    }
    
    @DeleteMapping("/{id}")
    public UserDto removeUser(@PathVariable Long id) {
        return userService.removeUser(id);
    }
    
    @PostMapping
    public UserDto createUser(@RequestBody UserDto user) {
        return userService.saveUser(user);
    }
    
    @PutMapping("/{id}")
    public UserDto updateUser(@PathVariable Long id, @RequestBody UserDto user) {
        return userService.update(id, user);
    }
}
