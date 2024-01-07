package org.company.modules.partner.domain;

import jakarta.persistence.criteria.*;
import org.company.modules.address.domain.Address;
import org.company.modules.user.domain.User;
import org.springframework.data.jpa.domain.Specification;

public class PartnerSpecification {
    
    /**
     * the sql: <br>
     * select * from p_partner pp left join p_user pu on pp.owner_id = pu.id join p_address pa on pa.user_id = pu.id where pa.city = 'Wroclaw';
     *
     * @param city
     * @return
     */
    public static Specification<Partner> partnersFromCity(String city) {
        
        return (Root<Partner> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) -> {
            Predicate predicate = criteriaBuilder.conjunction();
            
            Join<Partner, User> userJoin = root.join("owner", JoinType.LEFT);
            Join<User, Address> addressJoin = userJoin.join("addresses", JoinType.INNER);
            
            predicate = criteriaBuilder.and(predicate, criteriaBuilder.equal(addressJoin.get("city"), city));
            
            query.multiselect(
                    root.get("id"),
                    root.get("name"),
                    // Add other necessary fields
                    userJoin.get("id"),
                    addressJoin.get("id")
            );
            return predicate;
        };
    }
}
