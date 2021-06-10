# VoliConnect

A component library that connects Voli Services to Voli's Customers Maconomy systems.


# Getting Started

The applications is dependent on a running a postgres server with a database called voli_connect. Database diagram and SQL script is located in folder "Setup"
 - So make sure that the database is running, and make sure to start the server before the frontend.

To start the server run:

```bash
cd Server 
node server.js || nodemon server.js
```

To start the Angular project run:

```bash
cd Frontend 
ng serve -o
```
