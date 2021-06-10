const sql = require('../../db');
const fs = require('fs');
const path = require('path');
const RSA_PUBLIC_KEY  = fs.readFileSync(path.resolve('routes/auth/keys/public.pub'), 'utf8');
var jwt = require('jsonwebtoken');
var axios = require('axios');


module.exports = (req, res, next) => {
    const { token, RootUrl, Username, Password } = req.body;
    console.log(req.body);
    if(token !== undefined){
        jwt.verify(token, RSA_PUBLIC_KEY, { algorithms: ['RS256'] }, function (err, payload) {
            if (err) {
                res.status(401).send({ error: err.message });
            } else {
                var credentials =  Buffer.from(`${Username}:${Password}`).toString('base64');
                var basicAuth = 'Basic ' + credentials;
                var config = {
                    method: 'get',
                    url: RootUrl,
                    headers: { 
                      'Authorization': basicAuth
                    },
                  };
                axios(config).then((response) => {
                    if(response.status === 200){
                        res.status(200).send({ data: 'authenticated' });
                    } else {
                        res.status(403).send({ data: 'unauthenticated' });
                    }
                    console.log(response);
                }).catch((err) => {
                    console.log(err);
                    res.status(403).send({ data: 'unauthenticated' });
                })
            }
        });
    } else {
        res.status(400).send({ error: 'Invalid Request Body' });
    }


}
