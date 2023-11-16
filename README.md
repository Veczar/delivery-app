# delivery_app
 jesli port 8080 jest zajety to ta komenda: <br>
 ```netstat -ano | findstr :8080``` <br>
 ```taskkill /F /PID <pid>``` <br>

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

commands i used to create webapp:
- ```npm install -g @angular/cli@16.0.0```
- ```ng new webapp --no-standalone --routing```
- ```cd webapp```
- ```ng add @ng-bootstrap/ng-bootstrap```
- ```npm install bootstrap-icons```
  
using this tutorial: [www.freecodecamp.org](https://www.freecodecamp.org/news/how-to-add-bootstrap-css-framework-to-an-angular-application/)

for using bootstrap your go to website is: <br>
https://getbootstrap.com/docs/4.0/getting-started/introduction/

