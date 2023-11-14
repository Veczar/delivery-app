package org.company.modules.user.domain;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.jpa.domain.Specification;


public class UserSpecification {
    public static Specification<User> build(UserCriteria userCriteria) {
        
        return (Root<User> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) -> {
            Predicate predicate = criteriaBuilder.conjunction();
            
            if (StringUtils.isNotBlank(userCriteria.getFirstName())) {
                predicate = criteriaBuilder.and(predicate,
                        criteriaBuilder.equal(root.get("firstName"), userCriteria.getFirstName()));
            }
            
            if (StringUtils.isNotBlank(userCriteria.getLastName())) {
                predicate = criteriaBuilder.and(predicate,
                        criteriaBuilder.equal(root.get("lastName"), userCriteria.getLastName()));
            }
            
            
            return predicate;
        };
    }
}
