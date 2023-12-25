package org.company.modules.partner.application;

import org.company.modules.partner.application.web.PartnerDto;
import org.company.modules.partner.domain.Partner;
import org.company.modules.partner.domain.PartnerRepository;
import org.company.modules.partner.domain.PartnerSpecification;
import org.company.shared.aplication.GenericService;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;


@Service
public class PartnerService extends GenericService<Partner, PartnerDto, Long, PartnerRepository, PartnerAssembler> {
    
    private final PartnerRepository partnerRepository;
    private final PartnerAssembler partnerAssembler;
    
    public PartnerService(PartnerRepository repository, PartnerAssembler assembler,
                          PartnerRepository partnerRepository, PartnerAssembler partnerAssembler) {
        super(repository, assembler);
        this.partnerRepository = partnerRepository;
        this.partnerAssembler = partnerAssembler;
    }
    
    public List<PartnerDto> getPartnersFromCity(String city) {
        Specification<Partner> partnerSpecification = PartnerSpecification.partnersFromCity(city);
        return partnerRepository.findAll(partnerSpecification)
                .stream().map(partnerAssembler::toDto).collect(Collectors.toList());
    }
    
}
