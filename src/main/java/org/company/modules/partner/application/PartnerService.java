package org.company.modules.partner.application;

import org.company.modules.partner.application.web.PartnerDto;
import org.company.modules.partner.domain.Partner;
import org.company.modules.partner.domain.PartnerRepository;
import org.company.modules.user.application.UserService;
import org.company.modules.user.application.web.UserDto;
import org.company.shared.aplication.GenericService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
public class PartnerService extends GenericService<Partner, PartnerDto, Long, PartnerRepository, PartnerAssembler> {
    protected final UserService userService;
    public PartnerService(PartnerRepository repository, PartnerAssembler assembler, UserService userService) {
        super(repository, assembler);
        this.userService  =userService;
    }
    @Transactional
    public PartnerDto removeItem(Long id) {
        PartnerDto partnerDto = super.removeItem(id);
        userService.removeItem(partnerDto.getOwner().getId());
        return partnerDto;
    }
}
