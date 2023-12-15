package org.company.modules.address.application.web;

import org.company.modules.address.application.AddressService;
import org.company.shared.aplication.web.GenericController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("api/addresses")
public class AddressController extends GenericController<AddressDto, Long, AddressService> {
    public AddressController(AddressService service) {
        super(service);
    }
}
