package org.company.modules.partner_review.application.web;

import lombok.Getter;
import lombok.Setter;


// for fast rating calculation (maybe)
@Getter
@Setter
public class PartnerReviewReadDto {
    private Long id;
    private int gradeInStars;
    private Long partnerId;
}
