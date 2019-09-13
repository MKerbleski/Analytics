require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors')
const server = express();
const portfolio = require('./routes/portfolio')
const brightfield = require('./routes/brightfield')

server.use(express.json());
server.use(helmet());

server.use(cors({
    credentials: true, 
    whitelist: `http://localhost:3030, http://kerble.ski`,
    // origin: `https://notes-app.xyz`,
 }));

server.get('/', (req, res) => {
    res.status(200).json({message: "analytics server is running."})
})

server.use('/portfolio', portfolio)

server.use('/brightfield', brightfield)

const PORT = process.env.PORT || 3300; 
const ENV = process.env.DB || 'Development'; 

server.listen(PORT, () => {console.log(`\n == Server running on ${PORT} in the ${ENV} enviornment==\n`)});
