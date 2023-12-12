package org.company.modules.product_delivery.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.io.Serializable;

@Embeddable
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class
product_orderPk implements Serializable {
    @Column(name = "productId")
    private Long productId;
    @Column(name = "orderId")
    private Long orderId;
}
