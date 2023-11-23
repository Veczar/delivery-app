package org.company.modules.partner_review.application.web;

import org.company.modules.partner_review.application.PartnerReviewService;
import org.company.shared.aplication.web.GenericController;

public class PartnerReviewController extends GenericController<PartnerReviewDto, PartnerReviewService> {
    public PartnerReviewController(PartnerReviewService service) {
        super(service);
    }
}
