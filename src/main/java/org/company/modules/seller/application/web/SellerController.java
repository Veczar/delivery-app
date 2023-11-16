package org.company.modules.seller.application.web;

import org.company.modules.seller.application.SellerService;
import org.company.shared.aplication.web.GenericController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("api/sellers")
public class SellerController extends GenericController<SellerDto, SellerService> {
    public SellerController(SellerService service) {
        super(service);
    }
}
