package org.company.modules.partner.domain;

import jakarta.persistence.*;
import jdk.jfr.Name;
import lombok.*;
import org.company.modules.category.domain.Category;
import org.company.modules.user.domain.User;

import java.util.Set;

@Getter
@Setter
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "p_partner")
public class Partner {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String description;
    private String accountNumber;
    private String contactNumber;
    private String openHour;  // HH:mm
    private String closeHour; // HH:mm
    private String websiteLink; // url
    private Integer expectedWaitingTime; //in minutes

    @OneToOne
    @JoinColumn(name = "owner_id")
    private User owner;
    @Name("photo_path")
    private String photoPath;
    @Enumerated(EnumType.STRING)
    private PartnerType type;
}
