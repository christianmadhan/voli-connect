const sql = require('../../db');

module.exports = async (req, res, next) => { 
    const { CustomerId, VoliServiceId, ErrorMessage } = req.body;
    const ErrorCode = "Unset";

   if(req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({ "Error": "Invalid Request Body"});
    } else if(CustomerId !== undefined && VoliServiceId !== undefined && ErrorMessage !== undefined) {
        const ErrorDate = new Date().toISOString().slice(0,10);

        sql.begin(async sql => {
            const [usernameExit] = await sql`
            INSERT INTO "ErrorSheet" ("VoliServiceId", "CustomerId", "ErrorDescription", "ErrorCode", "ErrorDate")
            VALUES (${VoliServiceId}, ${CustomerId}, ${ErrorMessage}, ${ErrorCode}, ${ErrorDate});`
            console.log(usernameExit);
        return 0;
        }).then(response => {
            console.log(response);
            console.log('new customer id?');

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
            res.status(500).send({ error: error});
        });
    } else {
        res.status(400).send({ "Error": "Invalid Request Body"});
    }
}