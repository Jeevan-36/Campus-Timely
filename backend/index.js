import express from 'express';
import cors from 'cors';
import connectDB from './db/connectDB.js';
import timeTableRoutes from './routes/timeTable.routes.js'
const app =express();
app.use(express.json());
app.use(cors(
    {
        origin: ["http://localhost:5173"],
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    }
))
app.use(express.urlencoded({
    extended: true
}));
app.use('/timetable',timeTableRoutes);
connectDB()
.then(()=>{
    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    })
}
)
.catch((err)=>{
    console.log(err.message);
});