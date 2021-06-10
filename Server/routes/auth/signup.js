const sql = require('../../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const RSA_Private_KEY  = fs.readFileSync(path.resolve('routes/auth/keys/private'), 'utf8');
const saltRounds = 10;

module.exports = (req, res, next) => {
    console.log(req.body);
    const salt = bcrypt.genSaltSync(saltRounds);
    var shuffled = salt.split('').sort(function(){return 0.5-Math.random()}).join('');
    const { Username, Password, Email } = req.body; 
    const Customer = {
        Username: Username,
        Password: Password,
        Email: Email,
        EmailConfirmed: true,
        PublicKey: shuffled
    }
    
    Customer.Password = bcrypt.hashSync(Password, salt);

    sql.begin(async sql => {
        const [usernameExit] = await sql`
        select "Username" from "Customer" WHERE "Username" = ${Username}
      `
      if(usernameExit === undefined){
        const insertUser = await  sql`
        INSERT INTO "Customer" ("Username", "Password", "Email", "EmailConfirmed", "PublicKey")
        VALUES (${Customer.Username}, ${Customer.Password}, ${Customer.Email}, ${Customer.EmailConfirmed}, ${Customer.PublicKey} );    
        `
        console.log(insertUser);
        if(insertUser.count === 1){
            const [getId] = await  sql`
            select "CustomerId" from "Customer" WHERE "Username" = ${Username} 
            `
            return getId.CustomerId;
        }
        } else {
            return 0;
      }
      return 0;
    }).then(response => {
        console.log(response);
        if(response === 0){
            res.status(430).send({ error: 'Username already exits'});
        } else {
            const customerInfo = {
                customerId: response
              }
            const jwtBearerToken = jwt.sign({sub: 'Voli Connect', data: customerInfo}, RSA_Private_KEY, {
                algorithm: 'RS256',
                expiresIn: 1200,
              });
              res.cookie('SESSIONID', jwtBearerToken, {httpOnly:true, secure:true});
              res.status(200).json({
                token: jwtBearerToken, 
                expiresIn: 1200
              });
        }
    }).catch((error) => {
        console.log(error);
        res.status(500).send({ error: error});
    });
}