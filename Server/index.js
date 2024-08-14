const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const express = require('express')
const app = express()
const port = 5000

const cors = require("cors");


app.use(express.json());


app.use(cors())


const router = express.Router()
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


mongoose.connect('mongodb://localhost:27017', {
    useNewUrlParser: true,
    useUnifiedTopology: true,

}).then(() => {
    console.log("connected to backend server...");
}).catch((err) => {
    console.log('error found', err);
})



app.use(bodyParser.json());
const Message = require('./models/Message')

app.post("/messagestoserver", async (req, res) => {
    const { email, text, name, Mobile, Subject } = req.body
    try {
  

        const userInfo_message = new Message({ email, text, name, Mobile, Subject });


        await userInfo_message.save();



        res.status(201).send(userInfo_message);


    } catch (error) {
        console.log("Error Message of user", error);
        res.status(500).json({ message: "Message  failed" });
    }
})
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
