const { verify } = require('jsonwebtoken');
require('dotenv').config();


module.exports = {
    checkTokenAdmin: (req, res, next) => {
        let token = req.get("authorization");

        if (token) {
            token = token.slice(7);
            console.log(token);
            verify(token, process.env.SECRET_KEY, (err, decoded) => {
                if (err) {
                    return res.status(401).json({
                        message: 'Invalid token'
                    });
                }
                if(decoded.role === 0){
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
                if (decoded.role === 1) {
                    if (decoded.email == req.body.email) {
                        next();
                    }else{
                        return res.status(401).json({
                            message: 'You are not authorized to access this resource/ wrong email'
                        });
                    }
                } else {
                    return res.status(401).json({
                        message: 'You are not authorized to access this resource/ wrong role'
                    });
                }
            });
        } else {
            return res.status(401).json({
                message: 'No token provided'
            });
        }
    },
    checkToken: (req, res, next) => {
        let token = req.get("authorization");
        if (token) {
            token = token.slice(7);
            verify(token, process.env.SECRET_KEY, (err, decoded) => {
                if (err) {
                    return res.status(401).json({
                        message: 'Invalid token'
                    });
                }

                if (decoded.role === 1){
                    if (decoded.email == req.body.email){
                        next();
                    }else{
                        return res.status(401).json({
                            message: 'You are not authorized to access this resource/ wrong email'
                        });
                    }
                }else{
                    if(decoded.role === 0){
                        next();
                    }else{
                        return res.status(401).json({
                            message: 'You are not authorized to access as Admin'
                        });
                    }
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
    }

    
}