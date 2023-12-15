package org.company.modules.category.application;

import org.company.modules.category.application.web.CategoryDto;
import org.company.modules.category.domain.Category;
import org.company.modules.category.domain.CategoryRepository;
import org.company.shared.aplication.GenericService;
import org.springframework.stereotype.Service;

@Service
public class CategoryService extends GenericService<Category, CategoryDto, Long, CategoryRepository,CategoryAssembler> {
    public CategoryService(CategoryRepository repository, CategoryAssembler assembler) {
        super(repository,assembler);
    }

}
