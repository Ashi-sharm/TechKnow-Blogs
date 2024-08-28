import express from  'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import commentRoutes from './routes/comment.route.js';
import authRoutes from './routes/auth.routes.js';
import cookieParser from 'cookie-parser';
import postRoutes from './routes/post.route.js'
import path from 'path'
// import { MongoClient } from 'mongodb';
// const uri = "mongodb+srv://ashi:9qLyeXSi!QrUAKV@cluster0.4wzb8fr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
// dotenv.config();
// const cors = require('cors');
import cors from 'cors';


mongoose
.connect("mongodb+srv://ashi:9qLyeXSi!QrUAKV@cluster0.4wzb8fr.mongodb.net/mern-blog?retryWrites=true&w=majority&appName=Cluster0")
.then(() => {
     console.log('MongoDb is connected')
})
.catch(err => {
    console.log(err);
});

const __dirname = path.resolve();
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/post', postRoutes);
app.use('/api/comment', commentRoutes);

app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req,res) => {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'))
});


app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internet Server Error';
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    });

});





