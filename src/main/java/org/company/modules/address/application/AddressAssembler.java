package org.company.modules.address.application;

import org.company.modules.address.application.web.AddressDto;
import org.company.modules.address.domain.Address;
import org.company.shared.aplication.IAssembler;
import org.springframework.stereotype.Component;


@Component
public class AddressAssembler implements IAssembler<Address, AddressDto> {
    
    @Override
    public AddressDto toDto(Address address) {
        AddressDto addressDto = new AddressDto();
        addressDto.setId(address.getId());
        addressDto.setCity(address.getCity());
        addressDto.setStreet(address.getStreet());
        addressDto.setPostalCode(address.getPostalCode());
        addressDto.setUserId(address.getUser().getId());
        return addressDto;
    }
    
    @Override
    public void toEntity(AddressDto addressDto, Address address) {
        address.setCity(addressDto.getCity());
        address.setStreet(addressDto.getStreet());
        address.setPostalCode(addressDto.getPostalCode());
    }
}
