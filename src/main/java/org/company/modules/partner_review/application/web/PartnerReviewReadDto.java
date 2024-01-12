package org.company.modules.partner_review.application.web;

import lombok.Getter;
import lombok.Setter;
import org.company.modules.user.application.web.UserDto;

import java.util.Date;


// for fast rating calculation (maybe)
@Getter
@Setter
public class PartnerReviewReadDto {
    private Long id;
    private int gradeInStars;
    private Long partnerId;
    private String description;
    private String date;
    private UserDto reviewer;
}
