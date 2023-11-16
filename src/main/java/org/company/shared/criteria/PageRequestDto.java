package org.company.shared.criteria;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;


@Getter
@Setter
public class PageRequestDto {
    private Integer page = 0;
    private Integer size = 10;
    private Sort.Direction sortDirection = Sort.Direction.ASC; // ascending
    private String sortBy = "id";
    
    public Pageable getPageRequest() {
        return PageRequest.of(page, size, sortDirection, sortBy);
    }
}
