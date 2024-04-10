import express from  'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.routes.js';
// import { MongoClient } from 'mongodb';
// const uri = "mongodb+srv://ashi:9qLyeXSi!QrUAKV@cluster0.4wzb8fr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
// dotenv.config();

mongoose
.connect("mongodb+srv://ashi:9qLyeXSi!QrUAKV@cluster0.4wzb8fr.mongodb.net/mern-blog?retryWrites=true&w=majority&appName=Cluster0")
.then(() => {
     console.log('MongoDb is connected')
})
.catch(err => {
    console.log(err);
});
// const client = new MongoClient(uri);
//   async function run() {
//     try {
//       await client.connect();
//       await client.db("admin").command({ ping: 1 });
//       console.log("Pinged your deployment. You successfully connected to MongoDB!");
//     } finally {
//       await client.close();
//     }
//   }
//   run().catch(console.dir);
const app = express();

app.use(express.json());

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);