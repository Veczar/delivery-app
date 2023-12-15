package org.company.modules.partner_review.application;

import org.company.modules.partner_review.application.web.PartnerReviewDto;
import org.company.modules.partner_review.domain.PartnerReview;
import org.company.modules.partner_review.domain.PartnerReviewRepository;
import org.company.shared.aplication.GenericService;
import org.springframework.stereotype.Service;

@Service
public class PartnerReviewService extends GenericService<PartnerReview, PartnerReviewDto, Long, PartnerReviewRepository,PartnerReviewAssebler> {
    public PartnerReviewService(PartnerReviewRepository repository, PartnerReviewAssebler assembler) {
        super(repository, assembler);
    }
}
