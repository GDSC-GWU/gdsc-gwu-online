import express from "express";
import cors from 'cors';
import bodyParser from 'body-parser';
import memberRoute from './routes/memberRoutes.js'
import eventRoute from './routes/eventRoutes.js'
import FAQRoute from './routes/faqRoutes.js'
import authRoute from './routes/authRoutes.js'
import multer from 'multer';
import cookieParser from 'cookie-parser';

const app = express()
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const upload = multer({ storage: multer.memoryStorage() }); // Default storage in memory
app.use(upload.any()); // Middleware to parse `multipart/form-data`
app.use(cookieParser());

app.use('/api', memberRoute);
app.use('/api', eventRoute);
app.use('/api', FAQRoute);
app.use('/api',authRoute);

app.get('/', (req, res)=>{
    res.send('<h1>Hello this is GDSC GWU Online</h1>');
});

const port = 3000;
app.listen(port, ()=>{
    console.log(`App is running on port ${port}`)
})