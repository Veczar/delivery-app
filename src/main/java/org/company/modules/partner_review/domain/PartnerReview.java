package org.company.modules.partner_review.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.company.modules.partner.domain.Partner;
import org.company.modules.user.domain.User;

@Getter
@Setter
@Entity
@Table(name = "p_partner_review")
public class PartnerReview {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private int grade_in_stars;
    private String description;

    @Column(name = "created_date")
    private String createdDate;

    @ManyToOne
    @JoinColumn(name = "reviewer_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "rated_id")
    private Partner partner;
}
