import express from "express";
import cookieParser from "cookie-parser";
import indexRouter from "./routes/index.mjs";


const app = express();


// app.use( loggingMiddleware );

const Port = process.env.Port || 3000 ;

app.use( express.json() );
app.use( cookieParser("hassnaa") );
app.use(indexRouter);


app.get( "/" , ( req , res , next ) => {
    res.cookie( "hello" , "world" , { maxAge: 100000 , signed : true } ); // "lol" to get unauthorized error 
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