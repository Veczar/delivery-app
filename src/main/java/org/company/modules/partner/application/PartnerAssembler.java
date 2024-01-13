package org.company.modules.partner.application;

import lombok.AllArgsConstructor;
import org.company.modules.address.application.AddressAssembler;
import org.company.modules.partner.application.web.PartnerDto;
import org.company.modules.partner.application.web.PartnerReadDto;
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

    @Override
    public PartnerDto toDto(Partner partner) {
        PartnerDto partnerDto = new PartnerDto();
        partnerDto.setId(partner.getId());
        partnerDto.setName(partner.getName());
        partnerDto.setDescription(partner.getDescription());
        partnerDto.setAccountNumber(partner.getAccountNumber());
        partnerDto.setContactNumber(partner.getContactNumber());
        partnerDto.setOpenHour(partner.getOpenHour());
        partnerDto.setCloseHour(partner.getCloseHour());
        partnerDto.setWebsiteLink(partner.getWebsiteLink());
        partnerDto.setExpectedWaitingTime(partner.getExpectedWaitingTime());

        partnerDto.setOwner(userAssembler.toDto(partner.getOwner()));
        partnerDto.setPhotoPath(partner.getPhotoPath());
        partnerDto.setType(partner.getType());
        return partnerDto;
    }
    public PartnerReadDto toReadDto(Partner partner) {
        PartnerReadDto partnerReadDto = new PartnerReadDto();
        partnerReadDto.setName(partner.getName());
        partnerReadDto.setPartnerType(partner.getType());
        partnerReadDto.setAddress(addressAssembler.toDto(partner.getOwner().getAddresses().get(0)));
        partnerReadDto.setPhotoPath(partner.getPhotoPath());
        partnerReadDto.setExpectedWaitingTime(partner.getExpectedWaitingTime());
        return partnerReadDto;
    }

    @Override
    public void toEntity(PartnerDto partnerDto, Partner partner) {
        partner.setName(partnerDto.getName());
        partner.setAccountNumber(partnerDto.getAccountNumber());
        partner.setContactNumber(partnerDto.getContactNumber());
        partner.setDescription(partnerDto.getDescription());
        partner.setOpenHour(partnerDto.getOpenHour());
        partner.setCloseHour(partnerDto.getCloseHour());
        partner.setWebsiteLink(partnerDto.getWebsiteLink());
        partner.setExpectedWaitingTime(partnerDto.getExpectedWaitingTime());
        UpdateUser(partnerDto, partner);

        partner.setPhotoPath(partnerDto.getPhotoPath());
        partner.setType(partnerDto.getType());
    }

    private void UpdateUser(PartnerDto partnerDto, Partner partner) {
        User user = userRepository.findById(partnerDto.getOwner().getId()).orElseThrow(null);
        partner.setOwner(user);
    }
}
