const jwt = require("jsonwebtoken")

const authentication = (req, res, next) => {

    const token = req.cookies.token;

    if(token){
        const decoded = jwt.verify(token, 'hush')
        if(decoded){
            const userID = decoded.userID
            req.body.userID = userID;
            req.body.role=decoded.role;
            next()
        }
        else{
            res.send("Please login")
        }  
    }
    else{
        res.send("Please login")
    }
}


module.exports = authentication; 