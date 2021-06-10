const fs = require('fs');
const path = require('path');
const sql = require('../../db');
const RSA_PRIVATE_KEY  = fs.readFileSync(path.resolve(__dirname, 'keys/private'), 'utf8');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');

// TODO:
// Implement middleware that check if the incomming request forfills the requirements. 
// Requirements:
// JSON body with fields: Username and Password.

module.exports = (req, res, next) => {
  const { Username, Password } = req.body;
  
  sql.begin(async sql => {
      const [usernameExit] = await sql`
      select "Username", "Password", "CustomerId" from "Customer" WHERE "Username" = ${Username}
    `
    if(usernameExit === undefined){
        return 0 
      } else {
       let checkPassword  = bcrypt.compareSync(Password, usernameExit.Password);
       if(checkPassword){
          return usernameExit.CustomerId;
      }
          return 0;
    }
  }).then(response => {
    console.log(response);
    if(response === 0){
      res.status(401).send({ error: "Unauthorized" });
    } else {
      const customerInfo = {
        customerId: response
      }
      const jwtBearerToken = jwt.sign({sub: 'Voli Connect', data: customerInfo}, RSA_PRIVATE_KEY, {
        algorithm: 'RS256',
        expiresIn: 1200,
      });
      //console.log(jwtBearerToken);
      // set it in an HTTP Only + Secure Cookie
      res.cookie('SESSIONID', jwtBearerToken, {httpOnly:true, secure:true});
      res.status(200).json({
        token: jwtBearerToken, 
        expiresIn: 1200
      });
    }
  }).catch(error => {
    console.log(error);
      res.status(500).send({ error: error });
  });
}
