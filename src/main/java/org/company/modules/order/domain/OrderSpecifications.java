package org.company.modules.order.domain;

import jakarta.persistence.criteria.*;
import org.company.modules.delivery_man.domain.DeliveryMan;
import org.company.modules.user.domain.User;
import org.springframework.data.jpa.domain.Specification;

public class OrderSpecifications {
    public static Specification<Order> filterOrdersByUserEmailAndStatus(String userEmail) {
        return (root, query, criteriaBuilder) -> {
            // Subquery to get courier ID based on user email
            Subquery<Long> courierIdSubquery = query.subquery(Long.class);
            Root<DeliveryMan> courierSubqueryRoot = courierIdSubquery.from(DeliveryMan.class);
            courierIdSubquery.select(courierSubqueryRoot.get("id"));
            courierIdSubquery.where(criteriaBuilder.equal(courierSubqueryRoot.get("user").get("email"), userEmail));

            // Main query conditions
            query.distinct(true);
            Predicate condition1 = criteriaBuilder.equal(root.get("deliveryMan").get("id"), courierIdSubquery);
            Predicate condition2 = criteriaBuilder.and(
                    criteriaBuilder.isNull(root.get("deliveryMan")),
                    criteriaBuilder.notEqual(root.get("status"), Status.inPreparation)
            );

            return criteriaBuilder.or(condition1, condition2);
        };
    }

}
