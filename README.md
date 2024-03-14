# Volg Delivery

This is a project for Programming Engineering college course, which was implemented by a three-person team consisting of
[@Rafa13io](https://github.com/Rafa13io), [@JakubDralus](https://github.com/JakubDralus) and [@Veczar](https://github.com/Veczar).
The aim of the project is to deepen the knowledge of software development, understand business requirements, planning resources and 
acquire more technological skills in web applications development especially Spring Boot and Angular. 

## Table of Contents

1. [About](#about)
2. [Website](#website)
3. [Main Product Features](#main-product-freatures)
4. [Technologies](#technologies)
5. [Tools](#tools)
6. [References](#references)

## About

Volg Delivery is an online delivery application that allows users to order various transportation products and services in a convenient way.
(like Uber Eats or Glovo) The main goal of our application is to provide the ability to order and register products for sale and transport services 
to a wider audience. Issued transport orders will be delivered by couriers whose are working for the Volg Delivery. 
The transport itself will take place within an area no larger than one city. On this platform everyone who has a business 
that is selling products can be registered and be a partner (e.g. grocery stores, restaurants, pharmacies).

## Website
Couple of screenshots of the website.

### Home page
![image](https://github.com/JakubDralus/delivery-app/assets/129612952/4e1e38b8-e917-4e81-abe2-c51c20fbd167)

### Sign in page
![image](https://github.com/JakubDralus/delivery-app/assets/129612952/e58279db-139e-46f9-81e5-fe1621ca22d6)

### Settings
![image](https://github.com/JakubDralus/delivery-app/assets/129612952/a9f0af80-8133-423e-b640-e8e2f114bca8)

### Reporting a complaint
![image](https://github.com/JakubDralus/delivery-app/assets/129612952/93c03b39-2398-4f23-a397-8eb7bc9f6142)

### Partners view
![image](https://github.com/JakubDralus/delivery-app/assets/129612952/6a79b0c6-6ffd-4927-b820-37fcb629e6a9)

### Example offers and partner details
![image](https://github.com/JakubDralus/delivery-app/assets/129612952/28f35b45-26a5-4ff7-b46e-a010baf23fc6)

### Checkout form
![image](https://github.com/JakubDralus/delivery-app/assets/129612952/62aa3046-db81-49fe-9294-9ef383985b38)

### Admin panel 
![image](https://github.com/JakubDralus/delivery-app/assets/129612952/288fdc18-d1a7-4b0c-9b94-4b1446e5698f)


## Main Product Freatures

- **User Account**
  - Allows new users to register and manage their account.
  - Browse content by city, name or category of products.
  - Make orders from home.
  - Set up periodic orders.

- **Partner Account**
  - It allows companies to add an account through which they can sell their products with delivery option.
  - Manage their product on the site (adding, deleting).
  - Manage the delivery process by informing couriers which orders are ready to be picked up.

- **Courier Account**
  - Enables users to collaborate with the application owner by delivering products to the given address.
  - Earn money from every delivery he makes.
  - Manage the delivery status flow.

- **Orders and Deliveries**
  - Allows users to place orders for products.
  - Integration with couriers who deliver orders to the user address.
  - Giving users access to the delivery status information.

- **Ratings and Reviews**
  - It gives users the ability to rate and review vendors and products using star rating system.
  - Give users an option to report a bug or bad order.

[//]: # (```bash)
[//]: # (Get-NetTCPConnection -LocalPort 8080 | ForEach-Object { Stop-Process -Id $_.OwningProcess -Force })
[//]: # (```)

## Technologies
frontend
- Angular 16.0.0
- Bootstrap 5.2.3
- Angular Material
- TypeScript
- node 18.17

backend
- Java 19
- Spring Boot 3.4
- Spring Security 6
- PostgreSQL

## Tools
- DBeaver https://dbeaver.io/download/
- PostgreSQL [https://www.postgresql.org/download/](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads)
- Postman https://www.postman.com/downloads/
- IntelliJ IDEA
- VS Code

## References

angular
- https://angular.io/docs
- https://kinsta.com/knowledgebase/install-angular/#how-to-install-angular-on-windows

bootstrap:
- docs: https://getbootstrap.com/docs/5.2/getting-started/introduction/
- [www.freecodecamp.org](https://www.freecodecamp.org/news/how-to-add-bootstrap-css-framework-to-an-angular-application/)
- https://www.techiediaries.com/angular-bootstrap/
- https://www.npmjs.com/package/@ng-bootstrap/ng-bootstrap

nice backgrounds: https://app.haikei.app/

Spring Security:
- https://docs.spring.io/spring-security/site/docs/current/api/org/springframework/security/config/annotation/web/builders/HttpSecurity.html
- https://www.youtube.com/watch?v=KxqlJblhzfI
- https://github.com/ali-bouali/spring-boot-3-jwt-security/tree/main

frontend auth: 
https://www.youtube.com/watch?v=PhzxED19FVA

angular material docs:
https://v16.material.angular.io/components/categories

