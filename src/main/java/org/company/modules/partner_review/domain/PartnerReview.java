package org.company.modules.partner_review.domain;

import jakarta.persistence.*;
import jdk.jfr.Timestamp;
import lombok.Getter;
import lombok.Setter;
import org.company.modules.partner.domain.Partner;
import org.company.modules.user.domain.User;
import java.util.Date;

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

    @Temporal(TemporalType.TIMESTAMP)
    private Date date;

    @ManyToOne
    @JoinColumn(name = "reviewer_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "rated_id")
    private Partner partner;
}
