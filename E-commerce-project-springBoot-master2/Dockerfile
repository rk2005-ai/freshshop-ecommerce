# Stage 1: Build the Application with Maven
FROM maven:3.8.5-openjdk-11-slim AS build
WORKDIR /app

# Copy pom.xml and source files
COPY JtProject/pom.xml .
COPY JtProject/src ./src

# Build production JAR
RUN mvn clean package -DskipTests

# Stage 2: Production Runtime Container
FROM openjdk:11-jre-slim
WORKDIR /app

# Copy the built JAR from the builder stage
COPY --from=build /app/target/JtSpringProject-0.0.1-SNAPSHOT.jar app.jar

# Expose application port
EXPOSE 8081

# Set production Spring profile
ENV SPRING_PROFILES_ACTIVE=prod

# Run the application
ENTRYPOINT ["java", "-Djava.security.egd=file:/dev/./urandom", "-jar", "app.jar"]
