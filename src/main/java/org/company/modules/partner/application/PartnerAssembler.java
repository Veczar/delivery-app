package org.company.modules.partner.application;

import lombok.AllArgsConstructor;
import org.company.modules.address.application.AddressAssembler;
import org.company.modules.address.domain.Address;
import org.company.modules.address.domain.AddressRepository;
import org.company.modules.category.application.CategoryAssembler;
import org.company.modules.category.application.web.CategoryDto;
import org.company.modules.category.domain.Category;
import org.company.modules.category.domain.CategoryRepository;
import org.company.modules.partner.application.web.PartnerDto;
import org.company.modules.partner.application.web.PartnerReadDto;
import org.company.modules.partner.domain.Partner;
import org.company.modules.user.application.UserAssembler;
import org.company.modules.user.domain.User;
import org.company.modules.user.domain.UserRepository;
import org.company.shared.aplication.IAssembler;
import org.springframework.stereotype.Component;

import java.util.stream.Collectors;


@Component
@AllArgsConstructor
public class PartnerAssembler implements IAssembler<Partner, PartnerDto> {
    
    private final UserAssembler userAssembler;
    private final UserRepository userRepository;
    private final AddressAssembler addressAssembler;
    private final AddressRepository addressRepository;
    private final CategoryAssembler categoryAssembler;
    private final CategoryRepository categoryRepository;

    @Override
    public PartnerDto toDto(Partner partner) {
        PartnerDto partnerDto = new PartnerDto();
        partnerDto.setId(partner.getId());
        partnerDto.setName(partner.getName());
        partnerDto.setAccountNumber(partner.getAccountNumber());
        partnerDto.setContactNumber(partner.getContactNumber());
        partnerDto.setAddress(addressAssembler.toDto(partner.getAddress()));
        partnerDto.setOwner(userAssembler.toDto(partner.getOwner()));
        partnerDto.setCategories(partner.getCategories()
                .stream().map(categoryAssembler::toDto).collect((Collectors.toSet())));
        return partnerDto;
    }
    public PartnerReadDto toReadDto(Partner partner) {
        PartnerReadDto partnerReadDto = new PartnerReadDto();
        partnerReadDto.setName(partner.getName());
        partnerReadDto.setAddress(addressAssembler.toDto(partner.getAddress()));
        partnerReadDto.setCategories(partner.getCategories()
                .stream().map(categoryAssembler::toDto).collect((Collectors.toSet())));
        return partnerReadDto;
    }

    @Override
    public void toEntity(PartnerDto partnerDto, Partner partner) {
        partner.setName(partnerDto.getName());
        partner.setAccountNumber(partnerDto.getAccountNumber());
        partner.setContactNumber(partnerDto.getContactNumber());
        UpdateAddress(partnerDto, partner);
        UpdateUser(partnerDto, partner);

        partner.setCategories(partnerDto.getCategories().stream().map(categoryDto -> GetCategory(categoryDto)).collect(Collectors.toSet()));
    }
    
    private void UpdateAddress(PartnerDto partnerDto, Partner partner) {
        Address address = addressRepository.findById(partnerDto.getAddress().getId()).orElseThrow(null);
        partner.setAddress(address);
    }
    
    private void UpdateUser(PartnerDto partnerDto, Partner partner) {
        User user = userRepository.findById(partnerDto.getOwner().getId()).orElseThrow(null);
        partner.setOwner(user);
    }
    private Category GetCategory(CategoryDto categoryDto){
        Category result = categoryRepository.findById(categoryDto.getId()).orElseThrow(null);
        return result;
    }

}
