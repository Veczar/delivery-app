package org.company.modules.partner_review.application;

import lombok.AllArgsConstructor;
import org.company.modules.partner.application.PartnerAssembler;
import org.company.modules.partner.domain.Partner;
import org.company.modules.partner.domain.PartnerRepository;
import org.company.modules.partner_review.application.web.PartnerReviewDto;
import org.company.modules.partner_review.domain.PartnerReview;
import org.company.modules.user.application.UserAssembler;
import org.company.modules.user.domain.User;
import org.company.modules.user.domain.UserRepository;
import org.company.shared.aplication.IAssembler;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class PartnerReviewAssebler implements IAssembler<PartnerReview, PartnerReviewDto> {
    private final UserAssembler userAssembler;
    private final UserRepository userRepository;
    private final PartnerAssembler partnerAssembler;
    private final PartnerRepository partnerRepository;

    @Override
    public PartnerReviewDto toDto(PartnerReview partnerReview) {
        PartnerReviewDto partnerReviewDto = new PartnerReviewDto();
        partnerReviewDto.setId(partnerReview.getId());
        partnerReviewDto.setGrade_in_stars(partnerReview.getGrade_in_stars());
        partnerReviewDto.setDescription(partnerReview.getDescription());
        partnerReviewDto.setDate(partnerReview.getDate());
        partnerReviewDto.setReviewer(userAssembler.toDto(partnerReview.getUser()));
        partnerReviewDto.setPartner(partnerAssembler.toDto(partnerReview.getPartner()));
        return partnerReviewDto;
    }

    @Override
    public void toEntity(PartnerReviewDto partnerReviewDto, PartnerReview partnerReview) {
        partnerReview.setGrade_in_stars(partnerReviewDto.getGrade_in_stars());
        partnerReview.setDescription(partnerReviewDto.getDescription());
        partnerReview.setDate(partnerReviewDto.getDate());
        UpdateReviewer(partnerReviewDto,partnerReview);
        UpdatePartner(partnerReviewDto,partnerReview);
    }

    private void UpdatePartner(PartnerReviewDto partnerReviewDto, PartnerReview partnerReview) {
        Partner partner = partnerRepository.findById(partnerReviewDto.getPartner().getId()).orElseThrow(null);
        partnerReview.setPartner(partner);
    }

    private void UpdateReviewer(PartnerReviewDto partnerReviewDto, PartnerReview partnerReview) {
        User user = userRepository.findById(partnerReviewDto.getReviewer().getId()).orElseThrow(null);
        partnerReview.setUser(user);
    }
}
