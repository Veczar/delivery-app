package org.company.shared.aplication;

import java.util.List;

public interface IService<Dto, EntityKey>{
    List<Dto> getAllItems();
    Dto getItem(EntityKey id);
    Dto removeItem(EntityKey id);
    Dto saveItem(Dto dto);
    Dto updateItem(EntityKey id, Dto dto);
}
