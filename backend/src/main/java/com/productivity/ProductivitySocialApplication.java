package com.productivity;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.config.EnableMongoAuditing;

@SpringBootApplication
@EnableMongoAuditing
public class ProductivitySocialApplication {
    public static void main(String[] args) {
        SpringApplication.run(ProductivitySocialApplication.class, args);
    }
}
