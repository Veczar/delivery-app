package org.company.modules.delivery_man.appliction.web;

import org.company.modules.delivery_man.appliction.DeliveryManService;
import org.company.shared.aplication.web.GenericController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/delivery_mans")
public class DeliveryManController extends GenericController<DeliveryManDto, DeliveryManService> {
    public DeliveryManController(DeliveryManService service) {
        super(service);
    }
}
