package org.company.modules.recurring_order.application;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.company.modules.order.application.OrderService;
import org.company.modules.order.application.web.OrderDto;
import org.company.modules.order.domain.Status;
import org.company.modules.product_order.application.ProductOrderService;
import org.company.modules.product_order.application.web.ProductOrderDto;
import org.company.modules.recurring_order.application.web.RecurringOrderDto;
import org.company.modules.recurring_order.domain.RecurringOrder;
import org.company.modules.recurring_order.domain.RecurringOrderRepository;
import org.company.shared.aplication.GenericService;
import org.springframework.scheduling.concurrent.ThreadPoolTaskScheduler;
import org.springframework.scheduling.support.PeriodicTrigger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;

import java.time.Duration;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.concurrent.ScheduledFuture;
import java.util.stream.Collectors;

@Service
public class RecurringOrderService extends GenericService<RecurringOrder, RecurringOrderDto, Long, RecurringOrderRepository, RecurringOrderAssembler > {
    private final ProductOrderService productOrderService;
    private final OrderService orderService;
    final HashMap<Long, ScheduledFuture<?>> hashMap;
    private final ThreadPoolTaskScheduler taskScheduler;

    public RecurringOrderService(ProductOrderService productOrderService, OrderService orderService,
                                 RecurringOrderRepository repository, RecurringOrderAssembler assembler,
                                 ThreadPoolTaskScheduler taskScheduler) {
        super(repository, assembler);
        this.productOrderService = productOrderService;
        this.orderService = orderService;
        this.taskScheduler = taskScheduler;
        hashMap = new HashMap<>();
        init();
    }
    void init()
    {
        synchronized (hashMap)
        {
            List<RecurringOrderDto> recurringOrderDtoList = getAllItems();
            Date curDate = new Date();
            for(RecurringOrderDto recurringOrderDto : recurringOrderDtoList)
            {
                if(!recurringOrderDto.getStartDate().after(curDate))
                {
                    Calendar calendar = Calendar.getInstance();
                    Date tmpDate = recurringOrderDto.getStartDate();
                    calendar.setTime(tmpDate);
                    int amount = switch (recurringOrderDto.getFrequency())
                    {
                        case everyDay -> 1;
                        case every2Days -> 2;
                        case every3Days -> 3;
                        case every4Days -> 4;
                        case every5Days -> 5;
                        case every6Days -> 6;
                        case everyWeek -> 7;
                        case every2Weeks -> 14;
                        case every3Weeks -> 21;
                        case every4Weeks -> 28;
                    };
                    long difference = curDate.getTime() - recurringOrderDto.getStartDate().getTime();
                    long days = (difference/86400000) + (difference%86400000  == 0 ? 0 : 1);
                    long multiplier = days / amount;
                    int  remainder = days % amount != 0 ? 1 : 0;
                    int  daysToAdd = (int)(multiplier*amount + remainder*amount);
                    calendar.add(Calendar.DATE, daysToAdd);
                    Date tmpDate2 = calendar.getTime();
                    tmpDate.setYear(tmpDate2.getYear());
                    tmpDate.setMonth(tmpDate2.getMonth());
                    tmpDate.setDate(tmpDate2.getDate());
                }
                ScheduledFuture<?> scheduledFuture = taskScheduler.schedule(new OrderStarter(recurringOrderDto, productOrderService,orderService, hashMap, taskScheduler), recurringOrderDto.getStartDate());
                hashMap.put(recurringOrderDto.getId(), scheduledFuture);
            }
        }

    }

    public PeriodicTrigger periodicFixedDelayTrigger(Duration duration, Duration delay) {
        PeriodicTrigger periodicTrigger = new PeriodicTrigger(duration);
        periodicTrigger.setFixedRate(true);
        periodicTrigger.setInitialDelay(delay);
        return periodicTrigger;
    }
    @Override
    @Transactional
    public RecurringOrderDto removeItem(Long id) {

        RecurringOrderDto recurringOrderDto = null;
        recurringOrderDto = super.removeItem(id);
        synchronized (hashMap) {
            hashMap.get(recurringOrderDto.getId()).cancel(false);
            hashMap.remove(recurringOrderDto.getId());
        }
        return recurringOrderDto;
    }

    public RecurringOrderDto saveItem(RecurringOrderDto dto) {

        RecurringOrderDto recurringOrderDto = null;
        recurringOrderDto = super.saveItem(dto);
        synchronized (hashMap)
        {
            ScheduledFuture<?> scheduledFuture = taskScheduler.schedule(new OrderStarter(recurringOrderDto, productOrderService,orderService, hashMap,  taskScheduler), dto.getStartDate());
            hashMap.put(recurringOrderDto.getId(), scheduledFuture);
        }
        return recurringOrderDto;
    }

    @Override
    @Transactional
    public RecurringOrderDto updateItem(Long id, RecurringOrderDto dto) {

        RecurringOrderDto recurringOrderDto = null;
        recurringOrderDto = super.updateItem(id, dto);
        synchronized (hashMap)
        {
            hashMap.get(id).cancel(false);
            hashMap.remove(id);
            ScheduledFuture<?> scheduledFuture = taskScheduler.schedule(new OrderStarter(recurringOrderDto, productOrderService,orderService, hashMap,  taskScheduler), dto.getStartDate());
            hashMap.put(id, scheduledFuture);
        }
        return recurringOrderDto;
    }
    public List<RecurringOrderDto> getRecurringOrderAssignedToUser(@PathVariable Long id)
    {
        List<RecurringOrderDto> recurringOrderDtoList = repository.findByCustomer_Id(id)
                .stream()
                .map(assembler::toDto)
                .collect(Collectors.toList());
        return recurringOrderDtoList;
    }
    @AllArgsConstructor
    static class OrderStarter implements Runnable
    {
        @Getter
        private RecurringOrderDto recurringOrderDto;
        private final ProductOrderService productOrderService;
        private final OrderService orderService;
        private HashMap<Long, ScheduledFuture<?>> hashMap;
        private ThreadPoolTaskScheduler taskScheduler;
        @Override
        public void run() {
            PeriodicTrigger trigger =
            switch (recurringOrderDto.getFrequency())
            {
                case everyDay -> createPeriodicTrigger(1);
                case every2Days -> createPeriodicTrigger(2);
                case every3Days -> createPeriodicTrigger(3);
                case every4Days -> createPeriodicTrigger(4);
                case every5Days -> createPeriodicTrigger(5);
                case every6Days -> createPeriodicTrigger(6);
                case everyWeek -> createPeriodicTrigger(7);
                case every2Weeks -> createPeriodicTrigger(14);
                case every3Weeks -> createPeriodicTrigger(21);
                case every4Weeks -> createPeriodicTrigger(28);
            };
            synchronized (hashMap)
            {
                hashMap.remove(recurringOrderDto.getId());
                ScheduledFuture<?> scheduledFuture = taskScheduler.schedule(new OrderCreator(recurringOrderDto, productOrderService, orderService), trigger);
                hashMap.put(recurringOrderDto.getId(), scheduledFuture);
            }

        }
        private PeriodicTrigger createPeriodicTrigger(long days)
        {
            Duration duration = Duration.ofDays(days);
            PeriodicTrigger periodicTrigger = new PeriodicTrigger(duration);
            periodicTrigger.setFixedRate(true);
            return periodicTrigger;
        }
    }

    @AllArgsConstructor
    static class OrderCreator implements Runnable {
        @Getter
        private RecurringOrderDto recurringOrderDto;
        private final ProductOrderService productOrderService;
        private final OrderService orderService;
        @Override
        public void run() {
            makeOrder(recurringOrderDto, productOrderService, orderService);
        }
    }
    private static synchronized void makeOrder(RecurringOrderDto recurringOrderDto, ProductOrderService productOrderService, OrderService orderService)
    {
        OrderDto orderDto = new OrderDto();
        orderDto.setAddressStart(recurringOrderDto.getAddressStart());
        orderDto.setAddressEnd(recurringOrderDto.getAddressEnd());
        orderDto.setCustomer(recurringOrderDto.getCustomer());
        orderDto.setPartner(recurringOrderDto.getProduct().getOwner());
        orderDto.setTip(0.0);
        orderDto.setCreationDate(new Date());
        orderDto.setStatus(Status.inPreparation);
        orderDto = orderService.saveItem(orderDto);
        ProductOrderDto productOrderDto = new ProductOrderDto();
        productOrderDto.setOrder(orderDto);
        productOrderDto.setProduct(recurringOrderDto.getProduct());
        productOrderDto.setQuantity(recurringOrderDto.getQuantity());
        productOrderService.saveItem(productOrderDto);
    }
}
