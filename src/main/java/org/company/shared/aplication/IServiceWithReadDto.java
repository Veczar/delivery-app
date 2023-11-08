package org.company.shared.aplication;

import java.util.List;

public interface IServiceWithReadDto<Dto, ReadDto> extends IService<Dto>//TODO:Verify if this inteface is not necessary (if it is used no more than once) if so delete it
{
    List<ReadDto> getAllItemsRead();
}
