package org.company.modules.seller.application;

import org.company.modules.seller.application.web.SellerDto;
import org.company.modules.seller.domain.Seller;
import org.company.modules.seller.domain.SellerRepository;
import org.company.shared.aplication.GenericService;
import org.springframework.stereotype.Service;


@Service
public class SellerService extends GenericService<Seller,SellerDto,SellerRepository,SellerAssembler> {
    public SellerService(SellerRepository repository, SellerAssembler assembler) {
        super(repository, assembler);
    }

}
