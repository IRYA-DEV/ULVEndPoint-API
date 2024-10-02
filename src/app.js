require("dotenv").config()
const express = require("express");
const cors = require("cors");
const {getConnection} = require("./database/connection");
const DatosRuote = require("./routes/datos");


const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//settings
const PORT = process.env.PORT || 3002;

//routes
app.use("/api", DatosRuote);

//server listen
app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT} en address http://localhost:${PORT}`);
})
