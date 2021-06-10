const sql = require('../../db');
var jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const RSA_PUBLIC_KEY  = fs.readFileSync(path.resolve('routes/auth/keys/public.pub'), 'utf8');
var jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
    const { token } = req.body;
    if(token !== undefined){
        await jwt.verify(token, RSA_PUBLIC_KEY, { algorithms: ['RS256'] } ,function(err, payload) {
            if(err){
                console.log(err);
              res.status(401).send({ error: err.message });
            } else {
              //  console.log(payload);
                sql.begin(async sql => {
                    const [userinfo] = await sql`
                    SELECT 
                    "Customer"."Username",
                    "Customer"."Email",
                    "CustomerInfo"."CompanyName",
                    "CustomerInfo"."CompanyDescription"

                    FROM "Customer"

                    LEFT JOIN "CustomerInfo"
                    ON "Customer"."CustomerId" = "CustomerInfo"."CustomerId"
                    WHERE "Customer"."CustomerId" = ${payload.data.customerId}
                  `
                        return userinfo;
                }).then((response) => {
                    res.status(200).send({ data: response });    
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
