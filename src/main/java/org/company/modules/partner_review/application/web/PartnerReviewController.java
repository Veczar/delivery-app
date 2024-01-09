package org.company.modules.partner_review.application.web;

import org.company.modules.partner_review.application.PartnerReviewService;
import org.company.shared.aplication.web.GenericController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/partners/reviews")
public class PartnerReviewController extends GenericController<PartnerReviewDto, Long, PartnerReviewService> {
    public PartnerReviewController(PartnerReviewService service) {
        super(service);
    }
    
    @GetMapping("/partner/{partnerId}")
    public List<PartnerReviewReadDto> getReadReviewsForPartner(@PathVariable Long partnerId) {
        return service.getReadReviewsForPartner(partnerId);
    }
}
