package org.company.modules.recurring_order.application;

import lombok.AllArgsConstructor;
import org.company.modules.address.application.web.AddressDto;
import org.company.modules.order.application.OrderService;
import org.company.modules.order.application.web.OrderDto;
import org.company.modules.order.domain.Status;
import org.company.modules.partner.application.web.PartnerDto;
import org.company.modules.product.application.web.ProductDto;
import org.company.modules.product_order.application.ProductOrderService;
import org.company.modules.product_order.application.web.ProductOrderDto;
import org.company.modules.recurring_order.application.web.RecurringOrderDto;
import org.company.modules.recurring_order.domain.Frequency;
import org.company.modules.recurring_order.domain.RecurringOrder;
import org.company.modules.recurring_order.domain.RecurringOrderRepository;
import org.company.modules.user.application.web.UserDto;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentMatcher;
import org.mockito.InOrder;
import org.mockito.Mock;
import org.mockito.quality.Strictness;
import org.springframework.scheduling.concurrent.ThreadPoolTaskScheduler;
import org.springframework.scheduling.support.PeriodicTrigger;

import java.time.Duration;
import java.util.*;
import java.util.concurrent.ScheduledFuture;
import static org.mockito.Mockito.*;

class RecurringOrderServiceTest {

    @Mock
    private ProductOrderService productOrderService = mock(ProductOrderService.class);
    @Mock
    private OrderService orderService = mock(OrderService.class);
    @Mock
    private RecurringOrderRepository repository = mock(RecurringOrderRepository.class, withSettings().strictness(Strictness.WARN));
    @Mock
    private RecurringOrderAssembler assembler = mock(RecurringOrderAssembler.class);
    @Mock
    ThreadPoolTaskScheduler threadPoolTaskScheduler = mock(ThreadPoolTaskScheduler.class);
    InOrder inOrder;
    @BeforeEach
    public void initTest()
    {
        inOrder = inOrder(productOrderService, orderService, repository, assembler, threadPoolTaskScheduler);
    }
    @AfterEach
    public void tearDownTest()
    {
        inOrder.verifyNoMoreInteractions();
    }
    private ProductOrderDto prepareProductOrder()
    {
        OrderDto orderDto = new OrderDto();
        orderDto.setStatus(Status.inPreparation);
        orderDto.setId(1L);
        orderDto.setTip(0.0);
        ProductOrderDto productOrderDto = new ProductOrderDto();
        productOrderDto.setOrder(orderDto);
        ProductDto productDto = new ProductDto();
        productDto.setOwner(new PartnerDto());
        productOrderDto.setProduct(productDto);
        productOrderDto.setQuantity(1);
        productOrderDto.setSubtotal(null);
        productDto.setCategories(new HashSet<>());
        orderDto.setDeliveryMan(null);
        orderDto.setCreationDate(new Date());
        orderDto.setCustomer(new UserDto());
        orderDto.setPartner(productDto.getOwner());
        AddressDto addressDto = new AddressDto();
        orderDto.setAddressStart(addressDto);
        orderDto.setAddressEnd(addressDto);
        orderDto.setTotalPrice(null);
        orderDto.setCompletionDate(new Date());
        return productOrderDto;
    }
    private RecurringOrderDto prepareRecurringOrder(ProductOrderDto productOrderDto, Date startDate,  Frequency frequency)
    {
        RecurringOrderDto recurringOrderDto = new RecurringOrderDto();
        recurringOrderDto.setId(1L);
        recurringOrderDto.setProduct(productOrderDto.getProduct());
        recurringOrderDto.setQuantity(productOrderDto.getQuantity());
        recurringOrderDto.setStartDate(startDate);
        recurringOrderDto.setAddressStart(productOrderDto.getOrder().getAddressStart());
        recurringOrderDto.setAddressEnd(productOrderDto.getOrder().getAddressStart());
        recurringOrderDto.setCustomer(productOrderDto.getOrder().getCustomer());
        recurringOrderDto.setFrequency(frequency);
        return recurringOrderDto;
    }
    private ThreadPoolTaskScheduler prepareThreadPoolTaskScheduler()
    {
        ThreadPoolTaskScheduler taskScheduler = new ThreadPoolTaskScheduler();;
        taskScheduler.setPoolSize(50);
        taskScheduler.initialize();
        return taskScheduler;
    }
    private RecurringOrderService doAndTestRecurringOrderServiceWithOneObjectActive(Date date, Date scheduledDate, ProductOrderDto productOrderDto, RecurringOrderDto recurringOrderDto)
    {
        List<RecurringOrder> recurringOrderList = new ArrayList<>();
        recurringOrderList.add(new RecurringOrder());

        when(repository.findAll()).thenAnswer(i -> recurringOrderList);
        when(assembler.toDto(eq(recurringOrderList.get(0)))).thenAnswer(var1 -> recurringOrderDto);
        RecurringOrderService.OrderStarter orderStarter = new RecurringOrderService.OrderStarter(recurringOrderDto,null,null,null,null);
        ThreadPoolTaskScheduler taskScheduler = prepareThreadPoolTaskScheduler();;
        ScheduledFuture<?> future = taskScheduler.schedule(orderStarter, date);
        OrderStarterMatcher orderStarterMatcher = new OrderStarterMatcher(orderStarter);
        when(threadPoolTaskScheduler.schedule(argThat(orderStarterMatcher), eq(scheduledDate))).thenAnswer(I -> future);

        RecurringOrderService service = new RecurringOrderService(productOrderService, orderService, repository, assembler, threadPoolTaskScheduler);

        inOrder.verify(repository, times(1)).findAll();
        inOrder.verify(assembler, times(1)).toDto(eq(recurringOrderList.get(0)));
        inOrder.verify(threadPoolTaskScheduler, times(1)).schedule(argThat(orderStarterMatcher), eq(scheduledDate));
        ScheduledFuture<?> futureGot;
        synchronized (service.hashMap)
        {
            futureGot = service.hashMap.get(recurringOrderDto.getId());
        }
        assert(future == futureGot);
        return  service;
    }
    @Test
     void testInitWithOneObjectActive(){
        Date date = new Date();
        date.setDate(1+ date.getDate());
        ProductOrderDto productOrderDto = prepareProductOrder();
        RecurringOrderDto recurringOrderDto = prepareRecurringOrder(productOrderDto, date, Frequency.everyDay);

        doAndTestRecurringOrderServiceWithOneObjectActive(date, date, productOrderDto, recurringOrderDto);
    }

    @Test
    void testInitWithOneObjectActiveThatShouldBeAlreadyStarted(){
        Date tmpDate = new Date();
        tmpDate.setDate(tmpDate.getDate() -5);
        Date scehduledDate = new Date(tmpDate.getTime());
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(tmpDate);
        calendar.add(Calendar.DATE, 28);
        Date tmpDate2 = calendar.getTime();
        scehduledDate.setYear(tmpDate2.getYear());
        scehduledDate.setMonth(tmpDate2.getMonth());
        scehduledDate.setDate(tmpDate2.getDate());
        ProductOrderDto productOrderDto = prepareProductOrder();
        RecurringOrderDto recurringOrderDto = prepareRecurringOrder(productOrderDto, tmpDate, Frequency.every4Weeks);

        doAndTestRecurringOrderServiceWithOneObjectActive(tmpDate, scehduledDate, productOrderDto, recurringOrderDto);
    }

    @Test
    public void testTaskExecution(){
        Date date = new Date();
        ProductOrderDto productOrderDto = prepareProductOrder();
        RecurringOrderDto recurringOrderDto = prepareRecurringOrder(productOrderDto, date, Frequency.everyDay);
        final HashMap<Long, ScheduledFuture<?>> hashMap = new HashMap<>();
        ThreadPoolTaskScheduler taskScheduler = prepareThreadPoolTaskScheduler();
        RecurringOrderService.OrderStarter orderStarter = new RecurringOrderService.OrderStarter(recurringOrderDto,productOrderService,orderService,hashMap,threadPoolTaskScheduler);
        RecurringOrderService.OrderCreator orderCreator = new RecurringOrderService.OrderCreator(recurringOrderDto,productOrderService,orderService);
        OrderCreatorMatcher orderCreatorMatcher = new OrderCreatorMatcher(orderCreator);
        Duration duration = Duration.ofDays(1);
        PeriodicTrigger periodicTrigger = new PeriodicTrigger(duration);
        periodicTrigger.setFixedRate(true);
        TriggerMatcher triggerMatcher = new TriggerMatcher(periodicTrigger);
        OrderMatcher orderMatcher = new OrderMatcher(productOrderDto.getOrder());
        ProductOrderDtoMatcher productOrderMatcher = new ProductOrderDtoMatcher(productOrderDto);
        ScheduledFuture<?> future = taskScheduler.schedule(new Runnable() {@Override public void run() {}}, date);

        when(threadPoolTaskScheduler.schedule(argThat(orderCreatorMatcher), argThat(triggerMatcher))).thenAnswer(I -> future);
        when(orderService.saveItem(argThat(orderMatcher))).thenAnswer(I -> productOrderDto.getOrder());
        when(productOrderService.saveItem(argThat(productOrderMatcher))).thenAnswer(I -> productOrderDto);

        orderStarter.run();

        inOrder.verify(threadPoolTaskScheduler, times(1)).schedule(argThat(orderCreatorMatcher), argThat(triggerMatcher));

        orderCreator.run();

        inOrder.verify(orderService, times(1)).saveItem(argThat(orderMatcher));
        inOrder.verify(productOrderService, times(1)).saveItem(argThat(productOrderMatcher));
        ScheduledFuture<?> futureGot;
        synchronized (hashMap)
        {
            futureGot = hashMap.get(recurringOrderDto.getId());
        }
        assert(future == futureGot);
    }

    @Test
    public void testDeletionOfRecurringOrder() throws InterruptedException {
        Date date = new Date();
        date.setDate(1+ date.getDate());
        ProductOrderDto productOrderDto = prepareProductOrder();
        RecurringOrderDto recurringOrderDto = prepareRecurringOrder(productOrderDto, date, Frequency.everyDay);
        RecurringOrder recurringOrder = new RecurringOrder();

        RecurringOrderService recurringOrderService = doAndTestRecurringOrderServiceWithOneObjectActive(date, date, prepareProductOrder(), prepareRecurringOrder(productOrderDto, date, Frequency.everyDay));

        ScheduledFuture<?> futureGot;
        synchronized (recurringOrderService.hashMap)
        {
            futureGot = recurringOrderService.hashMap.get(recurringOrderDto.getId());
        }

        when(repository.findById(eq(recurringOrderDto.getId()))).thenAnswer(I -> Optional.of(recurringOrder));
        when(assembler.toDto(eq(recurringOrder))).thenAnswer(I -> recurringOrderDto);

        recurringOrderService.removeItem(recurringOrderDto.getId());

        inOrder.verify(repository, times(1)).findById(eq(recurringOrderDto.getId()));
        inOrder.verify(repository, times(1)).deleteById(eq(recurringOrderDto.getId()));
        inOrder.verify(assembler, times(1)).toDto(eq(recurringOrder));
        synchronized (futureGot)
        {
            futureGot.wait(1000);
        }
        assert(futureGot.isCancelled());
        synchronized (recurringOrderService.hashMap)
        {
            futureGot = recurringOrderService.hashMap.get(recurringOrderDto.getId());
            assert(recurringOrderService.hashMap.size() == 0);
        }
        assert(futureGot == null);
    }

    @Test
    public void testUpdateRecurringOrder() throws InterruptedException {
        Date date = new Date();
        date.setDate(1+ date.getDate());
        ProductOrderDto productOrderDto = prepareProductOrder();
        RecurringOrderDto recurringOrderDtoArgument = prepareRecurringOrder(productOrderDto, date, Frequency.everyDay);
        RecurringOrderDto recurringOrderDtoFromAssembler = prepareRecurringOrder(productOrderDto, date, Frequency.everyDay);
        RecurringOrder recurringOrderFind = new RecurringOrder();
        RecurringOrder recurringOrderSaved = new RecurringOrder();

        RecurringOrderService recurringOrderService = doAndTestRecurringOrderServiceWithOneObjectActive(date, date, prepareProductOrder(), prepareRecurringOrder(productOrderDto, date, Frequency.everyDay));

        ScheduledFuture<?> futureGot1;
        synchronized (recurringOrderService.hashMap)
        {
            futureGot1 = recurringOrderService.hashMap.get(recurringOrderDtoArgument.getId());
        }

        when(repository.findById(eq(recurringOrderDtoArgument.getId()))).thenAnswer(I -> Optional.of(recurringOrderFind));
        when(repository.save(eq(recurringOrderFind))).thenAnswer(I -> recurringOrderSaved);
        when(assembler.toDto(eq(recurringOrderSaved))).thenAnswer(I -> recurringOrderDtoFromAssembler);
        RecurringOrderService.OrderStarter orderStarter = new RecurringOrderService.OrderStarter(recurringOrderDtoFromAssembler,null,null,null,null);
        ThreadPoolTaskScheduler taskScheduler = prepareThreadPoolTaskScheduler();;
        ScheduledFuture<?> future = taskScheduler.schedule(orderStarter, date);
        OrderStarterMatcher orderStarterMatcher = new OrderStarterMatcher(orderStarter);
        when(threadPoolTaskScheduler.schedule(argThat(orderStarterMatcher), eq(date))).thenAnswer(I -> future);

        recurringOrderService.updateItem(recurringOrderDtoArgument.getId(), recurringOrderDtoArgument);

        inOrder.verify(repository, times(1)).findById(eq(recurringOrderDtoArgument.getId()));
        inOrder.verify(assembler, times(1)).toEntity(eq(recurringOrderDtoArgument), eq(recurringOrderFind));
        inOrder.verify(repository, times(1)).save(eq(recurringOrderFind));
        inOrder.verify(assembler, times(1)).toDto(eq(recurringOrderSaved));
        inOrder.verify(threadPoolTaskScheduler, times(1)).schedule(argThat(orderStarterMatcher), eq(date));

        synchronized (futureGot1)
        {
            futureGot1.wait(1000);
        }
        assert(futureGot1.isCancelled());
        ScheduledFuture<?> futureGot2;
        synchronized (recurringOrderService.hashMap)
        {
            futureGot2 = recurringOrderService.hashMap.get(recurringOrderDtoFromAssembler.getId());
            assert(recurringOrderService.hashMap.size() == 1);
        }
        assert(futureGot2 == future);

    }

    @Test
    public void testAddRecurringOrder(){
        Date date = new Date();
        date.setDate(1+ date.getDate());
        ProductOrderDto productOrderDto = prepareProductOrder();
        RecurringOrderDto recurringOrderDtoArgument = prepareRecurringOrder(productOrderDto, date, Frequency.everyDay);
        RecurringOrderDto recurringOrderDtoFromAssembler = prepareRecurringOrder(productOrderDto, date, Frequency.everyDay);
        recurringOrderDtoArgument.setId(2L);
        recurringOrderDtoFromAssembler.setId(2L);
        RecurringOrder recurringOrder = new RecurringOrder();

        RecurringOrderService recurringOrderService = doAndTestRecurringOrderServiceWithOneObjectActive(date, date, prepareProductOrder(), prepareRecurringOrder(productOrderDto, date, Frequency.everyDay));

        when(repository.save(any(RecurringOrder.class))).thenAnswer(I -> recurringOrder);
        when(assembler.toDto(eq(recurringOrder))).thenAnswer(I -> recurringOrderDtoFromAssembler);
        RecurringOrderService.OrderStarter orderStarter = new RecurringOrderService.OrderStarter(recurringOrderDtoFromAssembler,null,null,null,null);
        ThreadPoolTaskScheduler taskScheduler = prepareThreadPoolTaskScheduler();;
        ScheduledFuture<?> future = taskScheduler.schedule(orderStarter, date);
        OrderStarterMatcher orderStarterMatcher = new OrderStarterMatcher(orderStarter);
        when(threadPoolTaskScheduler.schedule(argThat(orderStarterMatcher), eq(date))).thenAnswer(I -> future);

        recurringOrderService.saveItem(recurringOrderDtoArgument);

        inOrder.verify(assembler, times(1)).toEntity(eq(recurringOrderDtoArgument), any(RecurringOrder.class));
        inOrder.verify(repository, times(1)).save(any(RecurringOrder.class));
        inOrder.verify(assembler, times(1)).toDto(eq(recurringOrder));
        inOrder.verify(threadPoolTaskScheduler, times(1)).schedule(argThat(orderStarterMatcher), eq(date));

        ScheduledFuture<?> futureGot;
        synchronized (recurringOrderService.hashMap)
        {
            futureGot = recurringOrderService.hashMap.get(recurringOrderDtoFromAssembler.getId());
            assert(recurringOrderService.hashMap.size() == 2);
        }
        assert(futureGot == future);
    }

    @AllArgsConstructor
    public static class OrderMatcher implements ArgumentMatcher<OrderDto> {

        private OrderDto left;
        @Override
        public boolean matches(OrderDto right) {
            return left.getCustomer().equals(right.getCustomer())
                    && left.getDeliveryMan() == right.getDeliveryMan()
                    && left.getPartner().equals(right.getPartner())
                    && left.getTip().equals(right.getTip())
                    && left.getStatus().equals(right.getStatus())
                    && left.getAddressStart().equals(right.getAddressStart())
                    && left.getAddressEnd().equals(right.getAddressEnd())
                    && left.getTotalPrice() == right.getTotalPrice();
        }
    }
    @AllArgsConstructor
    public static class RecurringOrderMatcher implements ArgumentMatcher<RecurringOrder> {

        private RecurringOrderDto left;
        @Override
        public boolean matches(RecurringOrder right) {
            return left.getStartDate().equals(right.getStartDate())
                    && left.getAddressEnd().getId().equals(right.getAddressEnd().getId())
                    && left.getAddressStart().getId().equals(right.getAddressStart().getId())
                    && left.getFrequency().equals(right.getFrequency())
                    && left.getQuantity() == right.getQuantity()
                    && left.getProduct().getId().equals(right.getProduct().getId())
                    && left.getCustomer().getId().equals(right.getCustomer().getId());
        }
    }

    @AllArgsConstructor
    public static class ProductOrderDtoMatcher implements ArgumentMatcher<ProductOrderDto> {

        private ProductOrderDto left;
        @Override
        public boolean matches(ProductOrderDto right) {
            return  left.getProduct().equals(right.getProduct())
                    && left.getQuantity() == right.getQuantity()
                    && left.getSubtotal() == right.getSubtotal();
        }
    }
    @AllArgsConstructor
    public static class OrderStarterMatcher implements ArgumentMatcher<RecurringOrderService.OrderStarter> {

        private RecurringOrderService.OrderStarter left;
        @Override
        public boolean matches(RecurringOrderService.OrderStarter right) {
            if((right == null || left == null) && left != right)return false;
            return left.getRecurringOrderDto().equals(right.getRecurringOrderDto());
        }
    }
    @AllArgsConstructor
    public static class OrderCreatorMatcher implements ArgumentMatcher<RecurringOrderService.OrderCreator> {

        private RecurringOrderService.OrderCreator left;
        @Override
        public boolean matches(RecurringOrderService.OrderCreator right) {
            if((right == null || left == null) && left != right)return false;
            return left.getRecurringOrderDto().equals(right.getRecurringOrderDto());
        }
    }
    @AllArgsConstructor
    public static class TriggerMatcher implements ArgumentMatcher<PeriodicTrigger> {

        private PeriodicTrigger left;
        @Override
        public boolean matches(PeriodicTrigger right) {
            return left.getPeriodDuration().equals(right.getPeriodDuration());
        }
    }
}


