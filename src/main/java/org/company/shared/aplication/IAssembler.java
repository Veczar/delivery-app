package org.company.shared.aplication;

public interface IAssembler<Entity, Dto>{
    Dto toDto(Entity entity);
    void toEntity(Dto entityDto, Entity entity);
}
