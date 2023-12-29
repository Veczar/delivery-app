package org.company.modules.partner.domain;

import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

public class PartnerSpecifications {

    public static Specification<Partner> hasCity(String city) {
        return (root, query, criteriaBuilder) -> {
            return criteriaBuilder.equal(root.join("address").get("city"), city);
        };
    }

    public static Specification<Partner> hasCityAndName(String city, String name) {
        return (root, query, criteriaBuilder) -> {
            Predicate cityPredicate = criteriaBuilder.equal(root.join("address").get("city"), city);
            Predicate namePredicate = criteriaBuilder.like(root.get("name"), "%" + name + "%");

            return criteriaBuilder.and(cityPredicate, namePredicate);
        };
    }
}
