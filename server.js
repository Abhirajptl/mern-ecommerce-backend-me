const orderRoutes = require("./routes/orderRoutes");
const paymentRoutes = require("./routes/paymentRoutes");

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db')

dotenv.config();

const app = express();

app.use(cors({
        origin: [
            "http://localhost:5173",
            "https://mern-ecommerce-backend-me.onrender.com/api"
        ],
        credentials: true,
    }));
app.use(express.json());


app.get("/", (req,res)=>{
    res.send("Hello World")
})

app.use('/api/auth', require('./routes/authRoutes'));

app.use('/api/users', require('./routes/userRoutes'));

app.use('/api/products', require('./routes/productRoutes'));

app.use('/api/cart', require('./routes/cartRoutes'));

app.use('/api/orders', orderRoutes);

app.use("/api/payment", paymentRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>{
    connectDB();
    console.log(`Server is running on port ${PORT}`);
})