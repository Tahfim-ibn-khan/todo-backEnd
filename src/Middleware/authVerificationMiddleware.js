const jwt = require('jsonwebtoken');
const fs = require("fs");

module.exports = (req, res, next) => {
    let token = req.headers['key'];


    //var publicKey = fs.readFileSync('../src/jwtSignature/public.key');
    jwt.verify(token, "key1234", function (err, decoded) {
        if (decoded) {
            // Adding the userName to the header decoded
            let userName = decoded['data'][0]['userName'];
            req.headers.userName = userName;
            //console.log((userName));
            //res.json({data:decoded});
            next();
        } else {
            res.status(401).json({ Status: "Action failed", Data: err });
        }
    });
};
