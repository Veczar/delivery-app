package org.company.modules.partner.application;

import org.company.modules.partner.application.web.PartnerDto;
import org.company.modules.partner.domain.Partner;
import org.company.modules.partner.domain.PartnerRepository;
import org.company.modules.partner.domain.PartnerSpecification;
import org.company.modules.user.application.UserService;
import org.company.shared.aplication.GenericService;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;


@Service
public class PartnerService extends GenericService<Partner, PartnerDto, Long, PartnerRepository, PartnerAssembler> {
    
    private final PartnerRepository partnerRepository;
    private final PartnerAssembler partnerAssembler;
    protected final UserService userService;
    
    public PartnerService(PartnerRepository repository, PartnerAssembler assembler, UserService userService) {
        super(repository, assembler);
        this.partnerRepository = repository;
        this.partnerAssembler = assembler;
        this.userService = userService;
    }
    
    public List<PartnerDto> getPartnersFromCity(String city) {
        Specification<Partner> partnerSpecification = PartnerSpecification.partnersFromCity(city);
        return partnerRepository.findAll(partnerSpecification)
                .stream().map(partnerAssembler::toDto).collect(Collectors.toList());
    }
    
    public PartnerDto getPartnerByName(String name) {
        Partner partner = partnerRepository.findByName(name).orElse(null);
        return partnerAssembler.toDto(partner);
    }
    @Transactional
    public PartnerDto removeItem(Long id) {
        PartnerDto partnerDto = super.removeItem(id);
        userService.removeItem(partnerDto.getOwner().getId());
        return partnerDto;
    }
}
