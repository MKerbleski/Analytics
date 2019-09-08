
require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors')
const server = express();
const portfolio = require('./routes/portfolio')

server.use(express.json());
server.use(helmet());

server.use(cors({
    credentials: true, 
    whitelist: `http://localhost:3030`,
    // origin: `https://notes-app.xyz`,
 }));

server.get('/', (req, res) => {
    res.status(200).json({message: "analytics server is running."})
})

server.use('/portfolio', portfolio)

const PORT = process.env.PORT || 3300; 
const ENV = process.env.DB || 'Development'; 

server.listen(PORT, () => {console.log(`\n == Server running on ${PORT} in the ${ENV} enviornment==\n`)});
