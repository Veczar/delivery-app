package org.company.shared.aplication.web;

import lombok.AllArgsConstructor;
import org.company.shared.aplication.IService;
import org.springframework.web.bind.annotation.*;
import java.util.List;


@CrossOrigin(origins = "http://localhost:4200")
@AllArgsConstructor
public class GenericController<Dto, Service extends IService<Dto>> {
    
    protected final Service service;
    @GetMapping
    public List<Dto> getAllItems() {
        return service.getAllItems();
    }

    @GetMapping("/{id}")
    public Dto getItem(@PathVariable Long id) {
        return service.getItem(id);
    }

    @DeleteMapping("/{id}")
    public Dto removeItem(@PathVariable Long id) {
        return service.removeItem(id);
    }

    @PostMapping
    public Dto createUser(@RequestBody Dto user) {
        return service.saveItem(user);
    }

    @PutMapping("/{id}")
    public Dto updateUser(@PathVariable Long id, @RequestBody Dto user) {
        return service.updateItem(id, user);
    }

}
