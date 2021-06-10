const sql = require('../../db');
const fs = require('fs');
const path = require('path');
const RSA_PUBLIC_KEY  = fs.readFileSync(path.resolve('routes/auth/keys/public.pub'), 'utf8');
const bcrypt = require('bcrypt');
const saltRounds = 10;
var jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const { token, Name, Description, RootUrl, Username, Password } = req.body;

    if(token !== undefined){
        jwt.verify(token, RSA_PUBLIC_KEY, { algorithms: ['RS256'] }, function (err, payload) {
            if (err) {
                res.status(401).send({ error: err.message });
            } else {
                const salt = bcrypt.genSaltSync(saltRounds);
                const CustomerMaconomy = {
                    customerid: payload.data.customerId,
                    name: Name,
                    description: Description,
                    rooturl: RootUrl,
                    username: Username,
                    password: bcrypt.hashSync(Password, salt)
                };
                sql.begin(async (sql) => {
                    await sql`
                INSERT INTO "CustomerMaconomy" ("CustomerId", "Name", "Description", "RootUrl", "Username" , "Password")
                    VALUES (${CustomerMaconomy.customerid}, ${CustomerMaconomy.name}, 
                        ${CustomerMaconomy.description}, ${CustomerMaconomy.rooturl}, 
                        ${CustomerMaconomy.username}, ${CustomerMaconomy.password});
                  `;
                }).then(() => {
                    res.status(200).send({ success: "Maconomy Information Added to user" });
                }).catch(error => {
                    console.log(error);
                    res.status(500).send({ error: "Check Server Logs" });
                });
            }
        });
    } else {
        res.status(400).send({ error: 'Invalid Request Body' });
    }


}
