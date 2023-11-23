package org.company.modules.partner.application;

import lombok.AllArgsConstructor;
import org.company.modules.address.application.AddressAssembler;
import org.company.modules.address.domain.Address;
import org.company.modules.address.domain.AddressRepository;
import org.company.modules.partner.application.web.PartnerDto;
import org.company.modules.partner.domain.Partner;
import org.company.modules.user.application.UserAssembler;
import org.company.modules.user.domain.User;
import org.company.modules.user.domain.UserRepository;
import org.company.shared.aplication.IAssembler;
import org.springframework.stereotype.Component;


@Component
@AllArgsConstructor
public class PartnerAssembler implements IAssembler<Partner, PartnerDto> {
    
    private final UserAssembler userAssembler;
    private final UserRepository userRepository;
    private final AddressAssembler addressAssembler;
    private final AddressRepository addressRepository;

    @Override
    public PartnerDto toDto(Partner partner) {
        PartnerDto partnerDto = new PartnerDto();
        partnerDto.setId(partner.getId());
        partnerDto.setName(partner.getName());
        partnerDto.setAccount_number(partner.getAccount_number());
        partnerDto.setContact_number(partner.getContact_number());
        partnerDto.setAddress(addressAssembler.toDto(partner.getAddress()));
        partnerDto.setOwner(userAssembler.toDto(partner.getOwner()));

        return partnerDto;
    }

    @Override
    public void toEntity(PartnerDto partnerDto, Partner partner) {
        partner.setName(partnerDto.getName());
        partner.setAccount_number(partnerDto.getAccount_number());
        partner.setContact_number(partnerDto.getContact_number());
        UpdateAddress(partnerDto, partner);
        UpdateUser(partnerDto, partner);
    }
    
    private void UpdateAddress(PartnerDto partnerDto, Partner partner) {
        Address address = addressRepository.findById(partnerDto.getAddress().getId()).orElseThrow(null);
        partner.setAddress(address);
    }
    
    private void UpdateUser(PartnerDto partnerDto, Partner partner) {
        User user = userRepository.findById(partnerDto.getOwner().getId()).orElseThrow(null);
        partner.setOwner(user);
    }
}
