package org.company.shared.aplication.web;

import org.company.shared.aplication.IServiceWithReadDto;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

public class GenericControllerWithReadDto<Dto, ReadDto, EntityKey,  Service extends IServiceWithReadDto<Dto, EntityKey, ReadDto>>
        extends  GenericController<Dto, EntityKey, Service>
{
    public GenericControllerWithReadDto(Service service)
    {
        super(service);
    }
    @GetMapping("/read")
    public List<ReadDto> getAllItemsRead() {
        return service.getAllItemsRead();
    }
}
