package org.company.modules.partner.application;

import org.company.modules.address.domain.Address;
import org.company.modules.address.domain.AddressRepository;
import org.company.modules.partner.application.web.PartnerDto;
import org.company.modules.partner.domain.Partner;
import org.company.modules.partner.domain.PartnerRepository;
import org.company.shared.aplication.GenericService;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;


@Service
public class PartnerService extends GenericService<Partner, PartnerDto, Long, PartnerRepository, PartnerAssembler> {
    private final PartnerRepository partnerRepository;
    private final PartnerAssembler partnerAssembler;
    public PartnerService(PartnerRepository repository, PartnerAssembler assembler) {
        super(repository, assembler);
        this.partnerRepository = repository;
        this.partnerAssembler = assembler;
    }
    
    public List<PartnerDto> getPartnersInCity(String city) {
        Specification<Partner> citySpec = PartnerSpecifications.hasCity(city);
        return partnerRepository.findAll(citySpec).stream().map(partnerAssembler::toDto).collect(Collectors.toList());
    }
}


class PartnerSpecifications {
    
    public static Specification<Partner> hasCity(String city) {
        return (root, query, criteriaBuilder) -> {
            return criteriaBuilder.equal(root.join("address").get("city"), city);
        };
    }
}
