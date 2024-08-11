const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

//Import routes
const AuthUser=require("./Routes/Authentication.js");
const getUsers=require('./Routes/getUser.js');
const debateTops=require('./Routes/debateTops.js');


const app = express();
const PORT = process.env.PORT || 5000;

//Auth end points

app.use('/api', AuthUser);
app.use('/api', getUsers);
app.use('/api', debateTops);

app.use(express.json());

mongoose.connect("mongodb+srv://Saransh:saransh@atlascluster.kxdnplm.mongodb.net/?retryWrites=true&w=majority&appName=AtlasCluster", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Simple get request
app.get('/', (req, res) => {
    res.send('Welcome to debate app');
});





app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
