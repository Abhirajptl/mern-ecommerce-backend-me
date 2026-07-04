const User = require('../models/User');
const bcrypt = require('bcryptjs');
const generateToken = require('../utils/generateToken');

const register = async (req, res) => {
    try {
        const { name, email, password, age, role } = req.body;


        const userExists = await User.findOne({
            email: email,
        });


        if (userExists) {
            return res.status(400).json({
                message: "User already exists",
            });
        }

        const hashedPassword = await bcrypt.hash(
            password,
            10
        );


        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            age,
            role,
        })

        res.status(201).json({ message: "User registered successfully", user })

    } catch (error) {
        res.status(500).json({ message: "Internal server error" })
    }
}


const login = async (req,res) =>{
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email })

        if(!user){
            return res.status(400).json({message : "User Not Found"})
        }

        const match = await bcrypt.compare(password, user.password)

        if(!match){
            return res.status(400).json({message : "Invalid Password"})
        }

        const token = generateToken(user._id)
        res.json({ token, user })
    } catch (error) {
        res.status(500).json({ message: "Internal server error" })
    }
}

module.exports = { register, login }
