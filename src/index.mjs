import express from "express";
import cookieParser from "cookie-parser";
import indexRouter from "./routes/index.mjs";
import session from "express-session";

const app = express();


// app.use( loggingMiddleware );

const Port = process.env.Port || 3000 ;

app.use( express.json() );
app.use( cookieParser(" hassnaa ") );
app.use( session(
    {
        secret : "hassnaa" ,
        saveUninitialized : false , 
        resave : false , 
        cookie : { maxAge : 60000 * 60 } ,
    }
) );
app.use(indexRouter);


app.get( "/" , ( req , res , next ) => {
    console.log(req.session);
    console.log(req.session.id);
    req.session.visited = true ;
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