package org.company.shared.aplication.web;

import lombok.AllArgsConstructor;
import org.company.shared.aplication.IService;
import org.springframework.web.bind.annotation.*;
import java.util.List;


@AllArgsConstructor
public class GenericController<Dto, EntityKey, Service extends IService<Dto, EntityKey>> implements  IController{
    
    public final Service service;
    @GetMapping
    public List<Dto> getAllItems() {
        return service.getAllItems();
    }

    @GetMapping("/{id}")
    public Dto getItem(@PathVariable EntityKey id) {
        return service.getItem(id);
    }

    @DeleteMapping("/{id}")
    public Dto removeItem(@PathVariable EntityKey id) {
        return service.removeItem(id);
    }

    @PostMapping
    public Dto createItem(@RequestBody Dto dto) {
        return service.saveItem(dto);
    }

    @PutMapping("/{id}")
    public Dto updateItem(@PathVariable EntityKey id, @RequestBody Dto user) {
        return service.updateItem(id, user);
    }

}
