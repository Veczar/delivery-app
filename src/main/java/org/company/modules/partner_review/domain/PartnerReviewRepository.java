package org.company.modules.partner_review.domain;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;

public interface PartnerReviewRepository extends JpaRepository<PartnerReview,Long>, JpaSpecificationExecutor<PartnerReview> {
    
    List<PartnerReview> findByPartnerId(Long partnerId);
}
