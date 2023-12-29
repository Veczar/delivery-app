package org.company.shared.config;

import java.util.concurrent.TimeUnit;

import org.company.modules.recurring_order.application.RecurringOrderService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.concurrent.ThreadPoolTaskScheduler;
@Configuration
public class ThreadPoolTaskSchedulerConfig {

    ThreadPoolTaskScheduler threadPoolTaskScheduler;
    public ThreadPoolTaskSchedulerConfig()
    {
        threadPoolTaskScheduler = new ThreadPoolTaskScheduler();
        threadPoolTaskScheduler.setPoolSize(50);
        threadPoolTaskScheduler.setThreadNamePrefix("ThreadPoolTaskScheduler");
    }

    @Bean
    public ThreadPoolTaskScheduler threadPoolTaskScheduler() {
        return threadPoolTaskScheduler;
    }


}
