package org.company.modules.partner.application;

import org.company.modules.address.domain.Address;
import org.company.modules.address.domain.AddressRepository;
import org.company.modules.partner.application.web.PartnerDto;
import org.company.modules.partner.domain.Partner;
import org.company.modules.partner.domain.PartnerRepository;
import org.company.shared.aplication.GenericService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;


@Service
public class PartnerService extends GenericService<Partner, PartnerDto, Long, PartnerRepository, PartnerAssembler> {
    PartnerRepository partnerRepository;
    AddressRepository addressRepository;
    PartnerAssembler partnerAssembler;
    public PartnerService(PartnerRepository repository, PartnerAssembler assembler, AddressRepository addressRepo) {
        super(repository, assembler);
        this.partnerRepository = repository;
        this.addressRepository = addressRepo;
        this.partnerAssembler = assembler;
    }

    public List<PartnerDto> getAllPartnersFromCity(String city) {
        return partnerRepository.findByAddress(new Address(0L,"",city,""))
                .stream().map(partnerAssembler::toDto).collect(Collectors.toList());
    }
}
