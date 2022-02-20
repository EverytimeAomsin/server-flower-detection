const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const mongoose = require("mongoose")
const TeachableMachine = require("@sashido/teachablemachine-node");
const bodyParser = require("body-parser");
require("dotenv").config()
const blogRoute = require('./routes/blog')
const authRoute = require('./routes/auth')


const app = express()

//connect cloud database
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser:true,
    useUnifiedTopology:false
})
.then(()=>console.log("เชื่อมต่อเรียบร้อย"))
.catch((err)=>console.log(err))

//middleware
app.use(express.json())
app.use(bodyParser.json());
app.use(cors())
app.use(morgan("dev"))

//route
app.use('/api',blogRoute)
app.use('/api',authRoute)

//โค้ดตรวจสอบภาพ
const model = new TeachableMachine({
    modelUrl: "https://teachablemachine.withgoogle.com/models/fsSOSeeB9/",
  });

app.get("/api", (req, res) => {
    res.send(`
    <form action="/api/image/classify" method="POST">
    <p>
    Enter Image Url</p>
    <input name='ImageUrl' autocomplete=off>
    <button>Predict Image</button>
    </form>  
      `);
  });
  
  app.post("/api/image/classify", async (req, res) => {
    // console.log(req);
    const url = req.body.ImageUrl;
  
    return model
      .classify({
        imageUrl: url,
      })
      .then((predictions) => {
        // console.log("Hello");
        // console.log(predictions);
        res.json(predictions);
      })
      .catch((e) => {
        // console.error(e);
        res.status(500).send("Something went wrong!");
      });
  });


const port = process.env.PORT || 8080
app.listen(port,()=>console.log(`start server in port ${port}`))