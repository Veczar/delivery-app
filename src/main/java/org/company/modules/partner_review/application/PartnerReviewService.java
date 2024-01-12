package org.company.modules.partner_review.application;

import org.company.modules.partner_review.application.web.PartnerReviewDto;
import org.company.modules.partner_review.application.web.PartnerReviewReadDto;
import org.company.modules.partner_review.domain.PartnerReview;
import org.company.modules.partner_review.domain.PartnerReviewRepository;
import org.company.shared.aplication.GenericService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;


@Service
public class PartnerReviewService extends GenericService<PartnerReview, PartnerReviewDto, Long, PartnerReviewRepository, PartnerReviewAssembler> {
    public PartnerReviewService(PartnerReviewRepository repository, PartnerReviewAssembler assembler) {
        super(repository, assembler);
    }
    
    public List<PartnerReviewReadDto> getReadReviewsForPartner(Long partnerId) {
        return repository.findByPartnerId(partnerId)
                .stream().map(assembler::toReadDto).collect(Collectors.toList());
    }
}
