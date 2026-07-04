const jwt = require('jsonwebtoken');

const protect = (req,res,next) =>{
    const token = req.headers.authorization;

    if(!token){
        return res.status(401).json({message : "No Token"})
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        // const user = await User.findById(decoded.id)
        req.user = decoded.id;
        next()
    } catch (error) {
        res.status(401).json({
          message: "Invalid Token",
        });
    }

}

module.exports = protect;