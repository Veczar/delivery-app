package org.company.modules.partner.application.web;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.company.modules.address.application.web.AddressDto;
import org.company.modules.address.domain.Address;
import org.company.modules.category.application.web.CategoryDto;
import org.company.modules.partner.domain.PartnerType;

import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PartnerReadDto {
    private String name;
    private PartnerType partnerType;
    private AddressDto address;
    private String photoPath;
}
