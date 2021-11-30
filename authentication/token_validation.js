const { verify } = require('jsonwebtoken');

module.exports = {
    checkTokenAdmin: (req, res, next) => {
        let token = req.get("authorization");
        if (token) {
            token = token.slice(7);
            verify(token, process.env.SECRET_KEY, (err, decoded) => {
                if (err) {
                    return res.status(401).json({
                        message: 'Invalid token'
                    });
                }
                req.decoded = decoded;
                if(decoded.result.role === 0){
                    next();
                }
                else{
                    return res.status(401).json({
                        message: 'You are not authorized to access this resource'
                    });
                }
            });
        } else {
            return res.status(401).json({
                message: 'No token provided'
            });
        }
    },
    checkTokenUser: (req, res, next) => {
        let token = req.get("authorization");
        if (token) {
            token = token.slice(7);
            verify(token, process.env.SECRET_KEY, (err, decoded) => {
                if (err) {
                    return res.status(401).json({
                        message: 'Invalid token'
                    });
                }
                req.decoded = decoded;
                if (req.decoded.result.role === 1) {
                    next();
                } else {
                    return res.status(401).json({
                        message: 'You are not authorized to access this resource'
                    });
                }
            });
        } else {
            return res.status(401).json({
                message: 'No token provided'
            });
        }
    },
  
    
}