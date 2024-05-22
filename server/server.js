import express from 'express';
import dotenv from 'dotenv';
import connectDatabase from './config/MongoDb.js';
import ImportData from './DataImport.js';
import productRoute from './Routes/ProductRoutes.js';
import { errorHandler, notFound } from './Middleware/Errors.js';
import userRouter from './Routes/UserRoutes.js';
import orderRouter from './Routes/orderRoutes.js';
import negotiationRouter from './Routes/NegotiationRoutes.js';
import cors from 'cors';
import fetch from 'node-fetch'; // Ensure node-fetch is imported if not already
import bodyParser from 'body-parser';

dotenv.config();
connectDatabase();
const app = express();
//app.use(express.json());

const corsOptions = {
  origin: [
    'https://customer-thriftn-web-71c2184ac1b2.herokuapp.com',
    'https://admin-thriftn-store-012d8a094b2c.herokuapp.com',
    'http://localhost:3000',
    'http://localhost:4000'
  ],
  optionsSuccessStatus: 200
};

//app.use(bodyParser.json({ limit: '10000mb' }));
app.use(cors(corsOptions));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json());

// API
app.use('/api/import', ImportData);
app.use('/api/products', productRoute);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);
app.use('/api/negotiations', negotiationRouter); 
app.use('/uploads', express.static('uploads'));
app.get('/api/config/paypal', (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID);
});


// Chatbot API endpoint
app.post('/api/chat', async (req, res) => {
  const userMessage = req.body.message;
  try {
    const response = await fetch('https://chatgpt.com/g/g-pewhJ9uBp-thrifty/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: userMessage })
    });
    const data = await response.json();
    res.send({ reply: data.choices[0].message });
  } catch (error) {
    res.status(500).send('Error communicating with chatbot API');
  }
});

// ERROR HANDLER
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 1000;

app.listen(PORT, console.log(`Server running on port ${PORT}`));
