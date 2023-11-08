package org.company.modules.user.application.web;

import org.company.modules.user.application.UserService;
import org.company.shared.aplication.web.GenericController;
import org.company.shared.aplication.web.GenericControllerWithReadDto;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/users")
public class UserController extends GenericControllerWithReadDto<UserDto, UserReadDto, UserService> {
    public UserController(UserService userService)
    {
        super(userService);
    }
    //    @PostMapping("/read/page")
    //    public ResponseEntity<Page<UserReadDto>> getUsers(@RequestBody UserCriteria criteria) {
    //        Page<UserReadDto> users = userService.getUsers(criteria);
    //        return ResponseEntity.ok(users);
    //    }
    
    //    @PostMapping("/read")
    //    public List<UserReadDto> getAllUsersRead(@RequestBody UserCriteria userCriteria) {
    //        return userService.getAllUsersWithCriteria(userCriteria);
    //    }

}
