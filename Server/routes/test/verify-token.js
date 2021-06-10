var jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const RSA_PUBLIC_KEY  = fs.readFileSync(path.resolve('routes/auth/keys/public.pub'), 'utf8');
module.exports = async(req, res, next) =>  {
    const { token  } = req.body;
    console.log('hello')
      const ip = req.headers['x-real-ip'] || req.ip;
      console.log(ip);
  
      await jwt.verify(token, RSA_PUBLIC_KEY, { algorithms: ['RS256'] } ,function(err, payload) {
        if(err){
          res.status(500).send({ error: err.message });
        } else {
          res.status(200).send({ payload: payload });
        }
      });
  
}
