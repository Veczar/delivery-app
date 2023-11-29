package org.company.modules.user.application.web;

import org.company.modules.user.application.UserService;
import org.company.modules.user.domain.UserCriteria;
import org.company.shared.aplication.web.GenericControllerWithReadDto;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("api/users")
@CrossOrigin(origins = "http://localhost:4200")
public class UserController extends GenericControllerWithReadDto<UserDto, UserReadDto, UserService> {
    private final UserService userService;
    
    public UserController(UserService userService)
    {
        super(userService);
        this.userService = userService;
    }
    
    @PostMapping("/read/page")
    public ResponseEntity<Page<UserReadDto>> getUsersPage(@RequestBody UserCriteria criteria) {
        Page<UserReadDto> users = userService.getUsersPage(criteria);
        return ResponseEntity.ok(users);
    }
}
