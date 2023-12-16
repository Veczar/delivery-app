# delivery_app
 jesli port 8080 jest zajety to ta komenda: <br>
 ```netstat -ano | findstr :8080``` <br>
 ```taskkill /F /PID <pid>``` <br>

albo szybciej: <br>
```Get-NetTCPConnection -LocalPort 8080 | ForEach-Object { Stop-Process -Id $_.OwningProcess -Force }```

 i usuwacie proces ktory go uzywa <br>

## co zainstalować: 
- DBeaver <br>
https://dbeaver.io/download/

- postgreSQL <br>
[https://www.postgresql.org/download/](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads)

- postman <br>
https://www.postman.com/downloads/

- Java JDK 19


front:
- node.js 18.17
- angular 16.0.0
- npm 10.2.3
- bootstrap 5.2.3 

commands i used to create webapp:
- ```npm install -g @angular/cli@16.0.0```
- ```ng new webapp --no-standalone --routing```
- ```cd webapp```
- ```ng add @ng-bootstrap/ng-bootstrap```
- ```npm install bootstrap-icons```
  
angular part: <br>
- https://kinsta.com/knowledgebase/install-angular/#how-to-install-angular-on-windows

<br>

bootstrap:
- [www.freecodecamp.org](https://www.freecodecamp.org/news/how-to-add-bootstrap-css-framework-to-an-angular-application/)
- https://www.techiediaries.com/angular-bootstrap/
- https://www.npmjs.com/package/@ng-bootstrap/ng-bootstrap

for using bootstrap your go-to website is: <br>
https://getbootstrap.com/docs/5.2/getting-started/introduction/

icons: https://fonts.google.com/icons

nice backgrounds: https://app.haikei.app/

security docs:
https://docs.spring.io/spring-security/site/docs/current/api/org/springframework/security/config/annotation/web/builders/HttpSecurity.html#httpBasic(org.springframework.security.config.Customizer)

spring security: <br>
https://www.youtube.com/watch?v=KxqlJblhzfI <br>
https://github.com/ali-bouali/spring-boot-3-jwt-security/tree/main

frontend auth: 
https://www.youtube.com/watch?v=PhzxED19FVA

angular material docs:
https://v16.material.angular.io/components/categories

