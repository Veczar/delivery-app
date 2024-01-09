package org.company.modules.address.application;

import org.company.modules.address.application.web.AddressDto;
import org.company.modules.address.domain.Address;
import org.company.modules.address.domain.AddressRepository;
import org.company.shared.aplication.GenericService;
import org.springframework.stereotype.Service;


@Service
public class AddressService
        extends GenericService<Address, AddressDto, Long, AddressRepository, AddressAssembler>
{
    
    public AddressService(AddressRepository repository, AddressAssembler assembler) {
        super(repository, assembler);
    }
}
