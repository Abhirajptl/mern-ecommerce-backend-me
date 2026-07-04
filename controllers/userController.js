const User = require('../models/User')

const getUsers = async (req,res) =>{
    const users = await User.find();
    res.json(users)
}

// const getUser = async (req,res) =>{
//     try {
//         const { search, minAge, maxAge } = req.query;

//     let query = {};

//     if(search){
//         query.$or = [
//             {
//                 name: {$regex: search, $options: 'i'}
//             },
//             {
//                 email: {$regex: search, $options: 'i'}
//             }
//         ]
//     }

//     if(minAge || maxAge){
//         query.age = {};

//         if(minAge){
//             query.age.$lte = Number(minAge)
//         }
//         if(maxAge){
//             query.age.$gte = Number(maxAge)
//         }
//     }

//     const user = await User.find(query);
//     res.json(user)
//     } catch (error) {
//         res.status(500).json({ message: error.message })
//     }
// }

module.exports = { getUsers }


