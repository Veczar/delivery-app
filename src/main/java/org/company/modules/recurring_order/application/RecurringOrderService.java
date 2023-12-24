package org.company.modules.recurring_order.application;

import jakarta.annotation.PostConstruct;
import lombok.AllArgsConstructor;
import org.company.modules.order.application.OrderService;
import org.company.modules.order.application.web.OrderDto;
import org.company.modules.order.domain.Status;
import org.company.modules.product_order.application.ProductOrderService;
import org.company.modules.product_order.application.web.ProductOrderDto;
import org.company.modules.recurring_order.application.web.RecurringOrderDto;
import org.company.modules.recurring_order.domain.Frequency;
import org.company.modules.recurring_order.domain.RecurringOrderRepository;
import org.company.modules.recurring_order.domain.RecurringOrder;
import org.company.shared.aplication.GenericService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.Trigger;
import org.springframework.scheduling.concurrent.ThreadPoolTaskScheduler;
import org.springframework.scheduling.support.CronTrigger;
import org.springframework.scheduling.support.PeriodicTrigger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Duration;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.concurrent.ScheduledFuture;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

@Service
public class RecurringOrderService extends GenericService<RecurringOrder, RecurringOrderDto, Long, RecurringOrderRepository, RecurringOrderAssembler > {
    private final Lock lock = new ReentrantLock();
    private final OrderService orderService;
    private final ProductOrderService productOrderService;
    private final HashMap<Long, ScheduledFuture<?>> hashMap = new HashMap<>();
    private final ThreadPoolTaskScheduler taskScheduler;
    public RecurringOrderService(ProductOrderService productOrderService, OrderService orderService, RecurringOrderRepository repository, RecurringOrderAssembler assembler) {
        super(repository, assembler);
        this.productOrderService = productOrderService;
        this.orderService = orderService;
        taskScheduler = new ThreadPoolTaskScheduler();
        taskScheduler.setPoolSize(50);
        taskScheduler.setThreadNamePrefix("ThreadPoolTaskScheduler");
        taskScheduler.initialize();
    }
    @PostConstruct
    private void init()
    {
        lock.lock();
        List<RecurringOrderDto> recurringOrderDtoList = getAllItems();
        Date curDate = new Date();
        int secondsInDay = 86400;
        for(RecurringOrderDto recurringOrderDto : recurringOrderDtoList)
        {
            while(!recurringOrderDto.getStartDate().after(curDate))
            {
                Calendar calendar = Calendar.getInstance();
                calendar.setTime(recurringOrderDto.getStartDate());
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
                    case everyMonth -> 1;
                };
                if (recurringOrderDto.getFrequency() == Frequency.everyMonth)
                {
                    calendar.add(Calendar.MONTH, 1);
                }
                else
                {
                    calendar.add(Calendar.DATE, 1);
                }
                recurringOrderDto.setStartDate(calendar.getTime());
            }
            ScheduledFuture<?> scheduledFuture = taskScheduler.schedule(new OrderStarter(recurringOrderDto, productOrderService,orderService, hashMap, lock, taskScheduler), recurringOrderDto.getStartDate().toInstant());
            hashMap.put(recurringOrderDto.getId(), scheduledFuture);
        }
        lock.unlock();
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
        lock.lock();
        hashMap.get(id).cancel(false);
        hashMap.remove(id);
        lock.unlock();
        RecurringOrderDto recurringOrderDto = null;
        recurringOrderDto = super.removeItem(id);
        return recurringOrderDto;
    }

    public RecurringOrderDto saveItem(RecurringOrderDto dto) {

        RecurringOrderDto recurringOrderDto = null;
        recurringOrderDto = super.saveItem(dto);
        lock.lock();
        ScheduledFuture<?> scheduledFuture = taskScheduler.schedule(new OrderStarter(recurringOrderDto, productOrderService,orderService, hashMap, lock, taskScheduler), dto.getStartDate().toInstant());
        hashMap.put(recurringOrderDto.getId(), scheduledFuture);
        lock.unlock();
        return recurringOrderDto;
    }

    @Override
    @Transactional
    public RecurringOrderDto updateItem(Long id, RecurringOrderDto dto) {
        lock.lock();
        RecurringOrderDto recurringOrderDto = null;
        recurringOrderDto = super.updateItem(id, dto);
        hashMap.get(id).cancel(false);
        hashMap.remove(id);
        ScheduledFuture<?> scheduledFuture = taskScheduler.schedule(new OrderStarter(recurringOrderDto, productOrderService,orderService, hashMap, lock, taskScheduler), dto.getStartDate().toInstant());
        hashMap.put(id, scheduledFuture);
        lock.unlock();
        return recurringOrderDto;
    }
    @AllArgsConstructor
    static class OrderStarter implements Runnable
    {
        private RecurringOrderDto recurringOrderDto;
        private final ProductOrderService productOrderService;
        private final OrderService orderService;
        private HashMap<Long, ScheduledFuture<?>> hashMap;
        private Lock lock;
        private ThreadPoolTaskScheduler taskScheduler;
        @Override
        public void run() {
            Trigger cronTrigger =
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
                case everyMonth -> new CronTrigger(recurringOrderDto.getStartDate().getMinutes()+" "+recurringOrderDto.getStartDate().getHours()+" "+ recurringOrderDto.getStartDate().getDay()+" * ?");
            };
            lock.lock();
            ScheduledFuture<?> scheduledFuture = taskScheduler.schedule(new OrderCreator(recurringOrderDto, productOrderService, orderService, hashMap, lock), cronTrigger);
            hashMap.put(recurringOrderDto.getId(), scheduledFuture);
            lock.unlock();

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
        private RecurringOrderDto recurringOrderDto;
        private final ProductOrderService productOrderService;
        private final OrderService orderService;
        private HashMap<Long, ScheduledFuture<?>> hashMap;
        private Lock lock;
        @Override
        public void run() {
            makeOrder(recurringOrderDto, productOrderService, orderService, hashMap, lock);
        }
    }
    private static synchronized void makeOrder(RecurringOrderDto recurringOrderDto, ProductOrderService productOrderService, OrderService orderService, HashMap<Long, ScheduledFuture<?>> hashMap, Lock lock)
    {
        OrderDto orderDto = new OrderDto();
        orderDto.setAddressStart(recurringOrderDto.getAddressStart());
        orderDto.setAddressEnd(recurringOrderDto.getAddressEnd());
        orderDto.setCustomer(recurringOrderDto.getCustomer());
        orderDto.setPartner(recurringOrderDto.getProduct().getPartner());
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
