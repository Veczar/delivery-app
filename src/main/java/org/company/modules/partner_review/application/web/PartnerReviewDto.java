package org.company.modules.partner_review.application.web;

import lombok.Getter;
import lombok.Setter;
import org.company.modules.partner.application.web.PartnerDto;
import org.company.modules.user.application.web.UserDto;

import java.util.Date;

@Getter
@Setter
public class PartnerReviewDto {
    private long id;
    private int grade_in_stars;
    private String description;
    private Date date;
    private UserDto reviewer;
    private PartnerDto partner;
}
