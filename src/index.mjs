import express from "express";
import cookieParser from "cookie-parser";
import indexRouter from "./routes/index.mjs";
import session from "express-session";
import { matchedData, checkSchema, validationResult } from "express-validator";
import { UserValidationSchemas } from "./utils/validationSchemas.mjs";
import { users } from "./utils/constantDb.mjs";

const app = express();


// app.use( loggingMiddleware );

const Port = process.env.Port || 3000 ;

app.use( express.json() );
app.use( cookieParser(" hassnaa ") );
app.use( session(
    {
        secret : "mohamed" ,
        saveUninitialized : false , 
        resave : false , 
        cookie : { maxAge : 60000 * 60 } ,
        store : new session.MemoryStore() ,
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


app.post('/api/auth' , checkSchema({ username: UserValidationSchemas.username, password: UserValidationSchemas.password })
                     , (req , res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    const data = matchedData(req) ;
    const { username , password } = data ;
    const userIndex = users.findIndex( (user) => user.username === username );
    if ( userIndex === -1 ) return  res.status(401).json({ message: 'Auth failed' });
    console.log(username, password, userIndex);
    if( users[userIndex].password !== password ) return res.status(401).json({ message: 'Auth failed' });
    req.session.user = users[userIndex] ; 
    res.status(200).json({ message: 'Auth successful' });
})

app.get('/api/user/status' , ( req , res ) => {
    req.sessionStore.get( req.sessionID , ( err , session ) => {
        console.log(session);
    } );
    if( req.session.user ) {
        return res.status(200).json( { loggedIn : true , user : req.session.user } );
    }
    return res.status(200).json( { loggedIn : false } );
    })

app.post('/api/cart' , ( req , res ) => {
    if( !req.session.user ) {
        return res.status(401).json( { message : "Unauthorized" } );
    }
    const { body : item } = req ; 
    const { cart  } = req.session ;
    if( !cart ) {
        req.session.cart = [ item ];
    } else {
        req.session.cart.push( item );
    }
    res.status(200).json( { message : "Item added to cart" } );
})


app.get('/api/cart' , ( req , res ) => {
    if( !req.session.user ) {
        return res.status(401).json( { message : "Unauthorized" } );
    }
    res.status(200).json(  req.session.cart ?? []  );
})



app.listen(Port , () => {
    console.log(`Server is running on port ${Port}`);
});