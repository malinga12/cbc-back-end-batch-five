import express from "express";
import bodyParser from 'body-parser';
import mongoose from "mongoose";
import productRouter from "./routers/productRouts.js";
import userRouter from "./routers/userRouts.js";
import jwt from "jsonwebtoken";



let app = express();
// function successfullyStarted(){
//     console.log("hi");
// }

// app.listen(3000 , successfullyStarted);


// app.get("/",
//     ()=>{
//         console.log("hellow")
//     }
// )


//mongodb+srv://admin:123@cluster0.hwfej.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
app.use(bodyParser.json())

app.use((req,res,next)=>{
    const tokenString = req.header("Authorization");
    if(tokenString != null){
        const token = tokenString.replace("Bearer ","")

        // console.log(token)

        jwt.verify(token,"batck-05-backend-2025",(err, decoded)=>{
            if(decoded != null){
                console.log(decoded)
                req.user = decoded
                next();
            }else{
                console.log("invalide token")
                res.status(403).json(
                    {message : "invalide token"}
                )
            }
        });

        
    }else{
        next();
    }
    

})

mongoose.connect("mongodb+srv://admin:123@cluster0.hwfej.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(() => {
    console.log("connected to the database")

}

).catch(() => {
    console.log("connection failed")
})


app.delete("/", (req, res) => {

    res.json(
        { message: "hoi  hio delete" }
    )

})



app.put("/", (req, res) => {

    res.json(
        { message: "hoi  hio put" }
    )

})



app.use("/products", productRouter);
app.use("/users", userRouter);

app.listen(3000, () => {
    console.log("hi")
});

//nodemon index.js

