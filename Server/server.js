//--------------------
/*   Welcome to Northenlight */
//--------------------
const express = require('express');
var cors = require('cors')

const app = express()

app.use(express.json({
  verify : (req, res, buf, encoding) => {
    try {
      JSON.parse(buf);
    } catch(e) {
      res.status(400).send('Bad request. Invalid JSON');
    }
  }
}));
app.use(cors())


app.set('trust proxy', true);
const port = process.env.PORT || 3000

app.get('/', (req, res) => {
  res.send('Welcome to Northenlight!')
});


//------------------------------------------------------
// AUTH
const rLogin = require(__dirname + '/routes/auth/login.js');
app.post('/login', rLogin);

const rSignup = require(__dirname + '/routes/auth/signup.js');
app.post('/signup', rSignup);
//------------------------------------------------------

//------------------------------------------------------
// CUSTOMER
const rCustomerInfo = require(__dirname + '/routes/customer/customer-info.js');
app.post('/customer/customerinfo', rCustomerInfo);

const rCustomerMaconomy = require(__dirname + '/routes/customer/customer-maconomy.js');
app.post('/register/customer-maconomy', rCustomerMaconomy);

const rGetCustomerMaconomySystems = require(__dirname + '/routes/customer/get-customer-maconomy.js');
app.post('/customer/customer-maconomy', rGetCustomerMaconomySystems);

const rValidateCustomerMaconomy = require(__dirname + '/routes/customer/validate-customer-maconomy.js');
app.post('/validate/customer-maconomy', rValidateCustomerMaconomy);
//------------------------------------------------------
// VOLI COMPONENT
const rComponent = require(__dirname + '/routes/component/voli-component.js');
app.get('/components', rComponent);

//------------------------------------------------------
// ERROR
const rErrorSheet = require(__dirname + '/routes/error/error-component.js');
app.post('/error/error-component', rErrorSheet);

//---------------------------------------------------------------------------
// TESTS
const rTEST_VERIFY = require(__dirname + '/routes/test/verify-token.js');
app.post('/verify', rTEST_VERIFY);

const rTEST = require(__dirname + '/routes/test/test.js');
app.post('/test', rTEST);
//---------------------------------------------------------------------------
app.listen(port, () => {
  console.log(`Northenlight started and is listening at http://localhost:${port}`)
});