package org.company.shared.aplication;

import java.util.List;

public interface IServiceWithReadDto<Dto, ReadDto> extends IService<Dto> {
    List<ReadDto> getAllItemsRead();
}
