package org.company.modules.order.domain;

import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.JoinType;
import jakarta.persistence.criteria.Predicate;
import org.company.modules.delivery_man.domain.DeliveryMan;
import org.company.modules.user.domain.User;
import org.springframework.data.jpa.domain.Specification;

public class OrderSpecifications {
    public static Specification<Order> filterOrdersByUserEmailAndStatus(String userEmail) {
        return (root, query, criteriaBuilder) -> {
            // Join with p_delivery_man
            Join<Order, DeliveryMan> deliveryManJoin = root.join("deliveryMan", JoinType.LEFT);

            // Join with p_user
            Join<DeliveryMan, User> userJoin = deliveryManJoin.join("user", JoinType.LEFT);

            // Create the predicate for filtering
            Predicate emailPredicate = criteriaBuilder.equal(userJoin.get("email"), userEmail);
            Predicate statusPredicate = criteriaBuilder.notEqual(root.get("status"), Status.inPreparation);

            // Combine the predicates with AND
            Predicate finalPredicate = criteriaBuilder.and(emailPredicate, statusPredicate);

            return finalPredicate;
        };
    }

}
