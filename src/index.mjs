import express from "express";
import { users } from "./utils/constantDb.mjs";
import usersRouter from "./routes/usersRoutes.mjs";
import productRouter from "./routes/productRouter.mjs";


const app = express();


// app.use( loggingMiddleware );

const Port = process.env.Port || 3000 ;

app.use( express.json() );

app.use( usersRouter );
app.use( productRouter );


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