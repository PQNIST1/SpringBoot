# Sử dụng image Java làm nền tảng
FROM openjdk:21-jdk-slim

# Đặt thư mục làm việc trong container
WORKDIR /app

# Sao chép file jar của ứng dụng vào container
COPY target/demo-0.0.1-SNAPSHOT.jar app.jar

# Mở cổng cho ứng dụng
EXPOSE 8080

# Chạy ứng dụng Spring Boot
ENTRYPOINT ["java", "-jar", "app.jar"]

