const express = require("express");
const userRoutes = require('./routes/user.routes');
const whatappRoutes = require ("./routes/whatsapp.routes.js");
const adminRoutes= require("./routes/adminSend.routes.js");
const chatBotRoutes= require("./routes/chatBot.routes")
const bodyParser= require("body-parser");
const cors= require("cors"); 
const connect = require("./config/db")
const axios=require("axios");
require('dotenv').config();


const app= express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/users', userRoutes);
app.use("/whatsapp", whatappRoutes);
app.use("/send",adminRoutes);
app.use("/chatbot",chatBotRoutes);

app.get("/demo",(req,res)=>{
    res.send("Hii, from server!")
});

const server = app.listen(3001,async()=>{
    await connect();
      console.log("listen on port:3001")
})

io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("Connected & Socket Id is ", socket.id);
  socket.emit("Data", "first emit");


  socket.on('message', async(data) => {
    console.log('Received message:', data);

    // await axios.post('https://r7gt6nls-3001.inc1.devtunnels.ms/send', {
    //     Userfrom: data.userNumber, // Assuming userNumber is the sender's number
    //     message: data.message,
    //   });

    const response = await axios.get(`https://r7gt6nls-3001.inc1.devtunnels.ms/api/users/${data.selectedUserId}`);
    console.log(response.data);

    io.emit("send",{data:response.data})
    
  })

});