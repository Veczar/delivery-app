package org.company.modules.partner.application;

import org.company.modules.partner.application.web.PartnerDto;
import org.company.modules.partner.domain.Partner;
import org.company.modules.partner.domain.PartnerRepository;
import org.company.shared.aplication.GenericService;
import org.springframework.stereotype.Service;


@Service
public class PartnerService extends GenericService<Partner, PartnerDto, Long, PartnerRepository, PartnerAssembler> {
    public PartnerService(PartnerRepository repository, PartnerAssembler assembler) {
        super(repository, assembler);
    }
}
