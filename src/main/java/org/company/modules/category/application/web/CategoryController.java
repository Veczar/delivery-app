package org.company.modules.category.application.web;

import org.company.modules.category.application.CategoryService;
import org.company.shared.aplication.web.GenericController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/categories")
public class CategoryController extends GenericController<CategoryDto, Long, CategoryService> {
    public CategoryController(CategoryService service) {
        super(service);
    }
}
