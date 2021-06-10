const sql = require('../../db');
const fs = require('fs');
const path = require('path');
const RSA_PUBLIC_KEY  = fs.readFileSync(path.resolve('routes/auth/keys/public.pub'), 'utf8');
var jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const { token, Name, Description, RootUrl, Username, Password } = req.body;
    if(token !== undefined){

        jwt.verify(token, RSA_PUBLIC_KEY, { algorithms: ['RS256'] }, function (err, payload) {
            if (err) {
                res.status(401).send({ error: err.message });
            } else {
                let maconomysystems = [];
                sql.begin(async (sql) => {
                    await sql`
                     SELECT "Name", "Description", "RootUrl", "Username"
                     FROM public."CustomerMaconomy"
                     WHERE "CustomerId" = ${payload.data.customerId}
                  `.stream(row => {
                    maconomysystems.push(row);
                  });
                }).then(() => {
                    res.status(200).send({ data: maconomysystems });
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
