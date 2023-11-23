package org.company.modules.partner.application.web;

import org.company.modules.partner.application.PartnerService;
import org.company.shared.aplication.web.GenericController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("api/partners")
public class PartnerController extends GenericController<PartnerDto, PartnerService> {
    public PartnerController(PartnerService service) {
        super(service);
    }
}
