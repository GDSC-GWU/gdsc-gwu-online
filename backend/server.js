import express from "express";
import cors from 'cors';
import bodyParser from 'body-parser';
import memberRoute from './routes/memberRoutes.js'
import eventRoute from './routes/eventRoutes.js'
import multer from 'multer';


const app = express()
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const upload = multer({ storage: multer.memoryStorage() }); // Default storage in memory
app.use(upload.any()); // Middleware to parse `multipart/form-data`

app.use('/api', memberRoute);
app.use('/api', eventRoute);

app.get('/', (req, res)=>{
    res.send('<h1>Hello this is GDSC GWU Online</h1>');
});

const port = 3000;
app.listen(port, ()=>{
    console.log(`App is running on port ${port}`)
})