import express from "express";
import indexRouter from "./routes/index.mjs";


const app = express();


// app.use( loggingMiddleware );

const Port = process.env.Port || 3000 ;

app.use( express.json() );

app.use(indexRouter);


app.get( "/" , ( req , res , next ) => {
    console.log("This is the home page");
    next();
} , ( req , res , next ) => {
    console.log("This is the home page 2");
    next();
}  , ( req , res ) => {
    res.status(201).send( { msg : "Hello, World!"} );
})








app.listen(Port , () => {
    console.log(`Server is running on port ${Port}`);
});