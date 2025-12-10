package com.smartcity.smartcityserver;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@Slf4j
public class SmartCityServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(SmartCityServerApplication.class, args);
		log.info("Smart City Application is Running !");
	}

}
