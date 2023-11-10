package org.company.modules.seller.application.web;

import lombok.RequiredArgsConstructor;
import org.company.modules.seller.application.SellerService;
import org.company.shared.aplication.web.GenericController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/seller")
public class SellerControler extends GenericController<SellerDto, SellerService> {
    public SellerControler(SellerService sellerService) {
        super(sellerService);
    }


    /*private final SellerService sellerService;

    // to tak na testa czy dobrze zwraca z bazy
    @GetMapping("/{id}")
    public SellerDto getSeller(@PathVariable Long id){
        return sellerService.getSeller(id);
    }*/
}
