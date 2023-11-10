package org.company.modules.seller.application.web;

import org.company.modules.seller.application.SellerService;
import org.company.shared.aplication.web.GenericController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("api/sellers")
public class SellerControler extends GenericController<SellerDto, SellerService> {
    public SellerControler(SellerService sellerService) {
        super(sellerService);
    }

}
