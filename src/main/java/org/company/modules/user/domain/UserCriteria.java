package org.company.modules.user.domain;

import lombok.Getter;
import lombok.Setter;
import org.company.shared.criteria.BaseCriteria;

@Getter
@Setter
public class UserCriteria extends BaseCriteria {
    private String firstName;
    private String lastName;
}
