var express = require('express');
var app = express();
var jwt = require('express-jwt');
var jwks = require('jwks-rsa');

var port = process.env.PORT || 8080;

const authConfig = {
    domain: 'dev-ynprrgxb.auth0.com',
    audience: 'htttps://api.authy.com'
}

var jwtCheck = jwt({
      secret: jwks.expressJwtSecret({
          cache: true,
          rateLimit: true,
          jwksRequestsPerMinute: 5,
          jwksUri: `https://${authConfig.domain}/.well-known/jwks.json`
    }),
    audience: 'htttps://api.authy.com',
    issuer: `https://${authConfig.domain}/`,
    algorithms: ['RS256']
});

app.use(jwtCheck);

app.get('/authorized', function (req, res) {
    res.send('Secured Resource');
});

app.listen(port);