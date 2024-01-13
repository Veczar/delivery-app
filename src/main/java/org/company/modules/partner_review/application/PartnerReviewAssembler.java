package org.company.modules.partner_review.application;

import lombok.AllArgsConstructor;
import org.company.modules.partner.application.PartnerAssembler;
import org.company.modules.partner.domain.Partner;
import org.company.modules.partner.domain.PartnerRepository;
import org.company.modules.partner_review.application.web.PartnerReviewDto;
import org.company.modules.partner_review.application.web.PartnerReviewReadDto;
import org.company.modules.partner_review.domain.PartnerReview;
import org.company.modules.user.application.UserAssembler;
import org.company.modules.user.domain.User;
import org.company.modules.user.domain.UserRepository;
import org.company.shared.aplication.IAssembler;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class PartnerReviewAssembler implements IAssembler<PartnerReview, PartnerReviewDto> {
    private final UserAssembler userAssembler;
    private final UserRepository userRepository;
    private final PartnerAssembler partnerAssembler;
    private final PartnerRepository partnerRepository;

    @Override
    public PartnerReviewDto toDto(PartnerReview partnerReview) {
        PartnerReviewDto partnerReviewDto = new PartnerReviewDto();
        partnerReviewDto.setId(partnerReview.getId());
        partnerReviewDto.setGradeInStars(partnerReview.getGrade_in_stars());
        partnerReviewDto.setDescription(partnerReview.getDescription());
        partnerReviewDto.setDate(partnerReview.getCreatedDate());
        partnerReviewDto.setReviewer(userAssembler.toDto(partnerReview.getUser()));
        partnerReviewDto.setPartner(partnerAssembler.toDto(partnerReview.getPartner()));
        return partnerReviewDto;
    }
    
    public PartnerReviewReadDto toReadDto(PartnerReview partnerReview) {
        PartnerReviewReadDto partnerReviewReadDto = new PartnerReviewReadDto();
        partnerReviewReadDto.setId(partnerReview.getId());
        partnerReviewReadDto.setGradeInStars(partnerReview.getGrade_in_stars());
        partnerReviewReadDto.setPartnerId(partnerReview.getPartner().getId());
        partnerReviewReadDto.setDescription(partnerReview.getDescription());
        partnerReviewReadDto.setDate(partnerReview.getCreatedDate());
        partnerReviewReadDto.setReviewer(userAssembler.toDto(partnerReview.getUser()));
        return partnerReviewReadDto;
    }

    @Override
    public void toEntity(PartnerReviewDto partnerReviewDto, PartnerReview partnerReview) {
        partnerReview.setGrade_in_stars(partnerReviewDto.getGradeInStars());
        partnerReview.setDescription(partnerReviewDto.getDescription());
        partnerReview.setCreatedDate(partnerReviewDto.getDate());
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
