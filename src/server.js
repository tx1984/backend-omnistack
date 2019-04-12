const express = require("express");
const mongoose = require("mongoose");
const path = require("path")
const app = express();
const cors = require('cors')

app.use(cors());
const server = require('http').Server(app);
const io = require("socket.io")(server)

io.on('connection', socket => {
    socket.on('connectRoom', box=>{
        socket.join(box);
    })
})

mongoose.connect('mongodb://admin:admin@localhost:27017/omnistack2',{ useNewUrlParser: true })
.then(res => console.log("Connected to DB"))
.catch(err => console.log(err))

app.use((req,res , next)=>{
    req.io = io;
    return next();
})

app.use(express.urlencoded({extended:true}));
app.use(require('./routes'));
app.use('/files', express.static(path.resolve(__dirname, '..', 'temp')));

server.listen(process.env.PORT || 3334);