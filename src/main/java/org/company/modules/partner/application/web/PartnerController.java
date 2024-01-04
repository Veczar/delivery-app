package org.company.modules.partner.application.web;

import org.company.modules.partner.application.PartnerService;
import org.company.shared.aplication.web.GenericController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
@RequestMapping("api/partners")
public class PartnerController extends GenericController<PartnerDto, Long, PartnerService> {
    public PartnerController(PartnerService service) {
        super(service);
    }
    
    @GetMapping("/city/{city}")
    public List<PartnerDto> getPartnersFromCity(@PathVariable String city) {
        return service.getPartnersFromCity(city);
    }
    
    @GetMapping("/name/{name}")
    public PartnerDto getPartnerByName(@PathVariable String name) {
        return service.getPartnerByName(name);
    }
}
