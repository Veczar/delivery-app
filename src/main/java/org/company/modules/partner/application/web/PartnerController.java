package org.company.modules.partner.application.web;

import org.company.modules.partner.application.PartnerService;
import org.company.modules.partner.domain.Partner;
import org.company.shared.aplication.web.GenericController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
@RequestMapping("api/partners")
public class PartnerController extends GenericController<PartnerDto, Long, PartnerService> {
    PartnerService partnerService;
    public PartnerController(PartnerService service) {
        super(service);
        this.partnerService = service;
    }

    @GetMapping("{city}")
    public List<PartnerDto> getPartnersCity(@PathVariable String city){
        return partnerService.getAllPartnersFromCity(city);
    }
}
