package org.company.shared.aplication;

import java.util.List;

public interface IService<Dto>{
    List<Dto> getAllItems();
    Dto getItem(Long id);
    Dto removeItem(Long id);
    Dto saveItem(Dto dto);
    Dto updateItem(Long id, Dto dto);
}
