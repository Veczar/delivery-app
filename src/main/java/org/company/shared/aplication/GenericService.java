package org.company.shared.aplication;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.http.HttpStatus;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.util.List;
import java.util.stream.Collectors;


/**
 *
 * @param <Entity>
 *     This class has to have non-argument constructor, otherwise after saveItem is called, exception will be thrown
 * @param <Dto>
 * @param <Repository>
 * @param <Assembler>
 */
public class GenericService<
        Entity,
        Dto,
        EntityKey,
        Repository extends JpaRepository<Entity, EntityKey>,
        Assembler extends IAssembler<Entity,Dto>>
        implements IService<Dto, EntityKey>
{
        protected final Repository repository;
        protected final Assembler assembler;

        public GenericService(Repository repository, Assembler assembler) {
                Type t = getClass().getGenericSuperclass();
                ParameterizedType pt = (ParameterizedType) t;
                entityType = (Class) pt.getActualTypeArguments()[0];
                this.repository = repository;
                this.assembler = assembler;
        }

        private final Class<Entity> entityType;
        public List<Dto> getAllItems() {
                List<Dto> list = repository.findAll()
                        .stream()
                        .map(assembler::toDto)
                        .collect(Collectors.toList());
                return list;
        }

        public Dto getItem(EntityKey id) {
                Entity item = repository.findById(id).orElse(null);

                if (item == null) {
                        throw new ResponseStatusException(HttpStatus.NOT_FOUND);
                }
                return assembler.toDto(item);
        }

        // statements printed twice is the result of p6spy logging error
        // hibernate displays it correctly
        @Transactional
        public Dto removeItem(EntityKey id) {
                Entity item = repository.findById(id).orElse(null);

                if (item == null) {
                        throw new ResponseStatusException(HttpStatus.NOT_FOUND);
                }
                repository.deleteById(id);
                return assembler.toDto(item);
        }

        public Dto saveItem(Dto dto) {
                try
                {
                        Entity item = entityType.newInstance();
                        assembler.toEntity(dto, item);
                        item = repository.save(item);
                        return assembler.toDto(item);
                }
                catch (InstantiationException | IllegalAccessException e)
                {
                        throw new ResponseStatusException(HttpStatus.NOT_ACCEPTABLE);//TODO: think it over if this HttpStatus is appropriate
                }
        }

        @Transactional
        public Dto updateItem(EntityKey id, Dto dto) {
                Entity itemToUpdate = repository.findById(id).orElse(null);

                if (itemToUpdate == null) {
                        throw new ResponseStatusException(HttpStatus.NOT_FOUND);
                }

                assembler.toEntity(dto, itemToUpdate);
                itemToUpdate = repository.save(itemToUpdate); // nie trzeba przy transakcjach ale widac id od razu
                return assembler.toDto(itemToUpdate);
        }
}
