package group4.edu.demo.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        // Cho phép tất cả các endpoint và phương thức HTTP
        registry.addMapping("/**")
                .allowedOrigins("https://springboot-group4.onrender.com")  // URL của frontend
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")  // Các phương thức cho phép
                .allowedHeaders("*")  // Cho phép tất cả headers
                .allowCredentials(true);  // Cho phép cookie, thông tin xác thực
    }
}

