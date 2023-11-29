package org.company.shared.config;

import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.io.IOException;


@Component
public class SimpleCorsFilter implements Filter {
    
    private final Logger log = LoggerFactory.getLogger(SimpleCorsFilter.class);
    
    public SimpleCorsFilter() {
        log.info("SimpleCorsFilter init");
    }
    
    @Override
    public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain)
            throws IOException, ServletException {
        
        HttpServletRequest request = (HttpServletRequest) req;
        HttpServletResponse response = (HttpServletResponse) res;
        
        // Allow all origins during development; adjust as needed for production
        response.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");
        
        // Allow credentials (e.g., cookies)
        response.setHeader("Access-Control-Allow-Credentials", "true");
        
        // Specify allowed methods
        response.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT, OPTIONS, DELETE");
        
        // Set the maximum age for preflight requests
        response.setHeader("Access-Control-Max-Age", "3600");
        
        // Specify allowed headers, including the ones you need for JWT and others
        response.setHeader("Access-Control-Allow-Headers", "Content-Type, Accept, X-Requested-With, remember-me, Authorization");
        
        chain.doFilter(req, res);
    }
    
    @Override
    public void init(FilterConfig filterConfig) {
        // Initialization logic if needed
    }
    
    @Override
    public void destroy() {
        // Cleanup logic if needed
    }
}


