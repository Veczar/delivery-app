package org.company.modules.seller.application;

import lombok.AllArgsConstructor;
import org.company.modules.address.application.AddressAssembler;
import org.company.modules.address.domain.Address;
import org.company.modules.address.domain.AddressRepository;
import org.company.modules.seller.application.web.SellerDto;
import org.company.modules.seller.domain.Seller;
import org.company.modules.user.application.UserAssembler;
import org.company.modules.user.domain.User;
import org.company.modules.user.domain.UserRepository;
import org.company.shared.aplication.IAssembler;
import org.springframework.stereotype.Component;


@Component
@AllArgsConstructor
public class SellerAssembler implements IAssembler<Seller, SellerDto> {
    
    private final UserAssembler userAssembler;
    private final UserRepository userRepository;
    private final AddressAssembler addressAssembler;
    private final AddressRepository addressRepository;

    @Override
    public SellerDto toDto(Seller seller) {
        SellerDto sellerDto = new SellerDto();
        sellerDto.setId(seller.getId());
        sellerDto.setName(seller.getName());
        sellerDto.setAccount_number(seller.getAccount_number());
        sellerDto.setContact_number(seller.getContact_number());
        sellerDto.setAddress(addressAssembler.toDto(seller.getAddress()));
        sellerDto.setOwner(userAssembler.toDto(seller.getOwner()));

        return sellerDto;
    }

    @Override
    public void toEntity(SellerDto sellerDto, Seller seller) {
        seller.setName(sellerDto.getName());
        seller.setAccount_number(sellerDto.getAccount_number());
        seller.setContact_number(sellerDto.getContact_number());
        UpdateAddress(sellerDto, seller);
        UpdateUser(sellerDto, seller);
    }
    
    private void UpdateAddress(SellerDto sellerDto, Seller seller) {
        Address address = addressRepository.findById(sellerDto.getOwner().getId()).orElseThrow(null);
        seller.setAddress(address);
    }
    
    private void UpdateUser(SellerDto sellerDto, Seller seller) {
        User user = userRepository.findById(sellerDto.getOwner().getId()).orElseThrow(null);
        seller.setOwner(user);
    }
}
