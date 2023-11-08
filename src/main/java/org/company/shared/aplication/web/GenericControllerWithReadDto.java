package org.company.shared.aplication.web;

import org.company.shared.aplication.IServiceWithReadDto;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

public class GenericControllerWithReadDto<Dto, ReadDto, Service extends IServiceWithReadDto<Dto, ReadDto>>
        extends  GenericController<Dto, Service>
        //TODO:Verify if this class is not necessary (if it is used no more than once) if so delete it
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
