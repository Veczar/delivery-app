package org.company.modules.seller.application;

import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import org.company.modules.seller.application.web.SellerDto;
import org.company.modules.seller.domain.Seller;
import org.company.modules.seller.domain.SellerRepository;
import org.company.shared.aplication.GenericService;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class SellerService extends GenericService<Seller,SellerDto,SellerRepository,SellerAssembler> {
    public SellerService(SellerRepository repository, SellerAssembler assembler) {
        super(repository, assembler);
    }



   /* private final SellerRepository sellerRepository;
    private final SellerAssembler sellerAssembler;
    public SellerDto getSeller(Long id) {
        Seller seler = sellerRepository.findById(id).orElse(null);

        if (seler == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
        return sellerAssembler.toDto(seler);
    }*/
}
