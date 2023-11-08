package org.company.shared.aplication;

public interface IReadAssembler<Entity, ReadDto>//TODO:Verify if this inteface is not necessary (if it is used no more than once) if so delete it
{
    ReadDto toDto(Entity entity);
    void toEntity(ReadDto entityReadDto, Entity entity);
}
