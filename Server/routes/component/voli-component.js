const sql = require('../../db');
module.exports = async (req, res, next) => {
    let payload = [];
    await sql`
    select * from "Component"
    ORDER BY "Active" DESC
`.stream(row => {
    payload.push(row);
}).then(() => {
        res.status(200).send({ data: payload});
}).catch((error) => {
    console.log(error)
    res.status(500).send({ error: "Check server logs."});
});
}
