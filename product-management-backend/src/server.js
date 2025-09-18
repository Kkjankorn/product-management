require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/product_management';

connectDB(MONGODB_URI);

app.use('/api', productRoutes);
app.use('/api', categoryRoutes);

app.get('/', (req,res)=> res.json({ok:true, message: 'Product management API'}));

app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`));
