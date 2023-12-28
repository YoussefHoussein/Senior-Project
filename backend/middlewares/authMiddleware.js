const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(' ')[1];
        const decode = jwt.verify(token, "AsQ132PI")

        req.user = decode
        next()
    }
    catch(err){
        res.json({
            message : 'UnAuthorized',
            error : err
        })
    }
}
module.exports = authenticate