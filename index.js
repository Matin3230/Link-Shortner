const express = require('express');
const connectDB = require('./config/conn');
const app = express(); 
connectDB();
app.use(express.json());

// Routes
app.use('/', require('./routes/index'));
app.use('/api/url', require('./routes/urls'));

const PORT = 8000;

app.listen(PORT, () => console.log(`SERVER IS RUNNING ON PORT NO ${PORT}`));
