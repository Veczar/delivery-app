package org.company.modules.partner_review.application.web;

import org.company.modules.partner_review.application.PartnerReviewService;
import org.company.shared.aplication.web.GenericController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/partners/reviews")
public class PartnerReviewController extends GenericController<PartnerReviewDto, Long, PartnerReviewService> {
    public PartnerReviewController(PartnerReviewService service) {
        super(service);
    }
}
