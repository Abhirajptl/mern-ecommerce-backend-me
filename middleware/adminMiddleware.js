const User = require('../models/User')

const adminOnly = async(req,res,next) =>{
    try{
        const user = await User.findById(req.user);

        if(!user || user.role !== "admin"){
            return res.status(403).json({message : "Admin Access Only"})
        }
        next();
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = adminOnly;



