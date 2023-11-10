package org.company.modules.seller.application;


import lombok.AllArgsConstructor;
import org.company.modules.seller.application.web.SellerDto;
import org.company.modules.seller.domain.Seller;
import org.company.modules.user.application.UserAssembler;
import org.company.modules.user.domain.User;
import org.company.shared.aplication.IAssembler;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class SellerAssembler implements IAssembler<Seller, SellerDto> {
    
    private final UserAssembler userAssembler;

    @Override
    public SellerDto toDto(Seller seller) {
        SellerDto sellerDto = new SellerDto();
        sellerDto.setId(seller.getId());
        sellerDto.setAccount_number(seller.getAccount_number());
        sellerDto.setContact_number(seller.getContact_number());
        sellerDto.setUser(userAssembler.toDto(seller.getUser()));

        return sellerDto;
    }

    @Override
    public void toEntity(SellerDto sellerDto, Seller seller) {
        seller.setAccount_number(sellerDto.getAccount_number());
        seller.setContact_number(sellerDto.getContact_number());
        UpdateUser(sellerDto, seller);
    }

    private void UpdateUser(SellerDto sellerDto, Seller seller) {
        User user = new User();
        userAssembler.toEntity(sellerDto.getUser(), user);
        seller.setUser(user);
    }
}
