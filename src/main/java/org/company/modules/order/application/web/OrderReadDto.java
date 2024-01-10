package org.company.modules.order.application.web;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.company.modules.order.domain.Status;


import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OrderReadDto {
    private Long id;
    private String addressStart;
    private String addressEnd;
    private String customerFirstName;
    private String customerLastName;
    private String customerTelephoneNumber;
    private String partner;
    private String partnerPhotoPath;
    private Long deliveryManId;
    private String deliveryManFirstName;
    private String deliveryManLastName;
    private Double totalPrice;
    private Double tip;
    private String creationDate;
    private String completionDate;
    private Status status;
    private Double distanceInKm;
    private Long rating;
}