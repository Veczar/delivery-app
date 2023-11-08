package org.company.shared.aplication;

public interface IReadAssembler<Entity, ReadDto> {
    ReadDto toDto(Entity entity);
    void toEntity(ReadDto entityReadDto, Entity entity);
}
