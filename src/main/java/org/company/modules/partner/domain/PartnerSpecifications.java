package org.company.modules.partner.domain;

import org.springframework.data.jpa.domain.Specification;

public class PartnerSpecifications {

    public static Specification<Partner> hasCity(String city) {
        return (root, query, criteriaBuilder) -> {
            return criteriaBuilder.equal(root.join("address").get("city"), city);
        };
    }
}
