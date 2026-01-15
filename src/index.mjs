import express from "express";

const app = express();

const loggingMiddleware = ( req , res , next ) => {
    console.log( `${ req.method } ${ req.url }` );
    next();
}

const handleFindUserByID = ( req , res , next ) => {
    const {  params : { id } } = req ;
    const idParsed = parseInt(id);
    if( isNaN(idParsed)) return res.status(400).send( { msg : "Invalid Request"} );
    const userIndex = users.findIndex( (user) => user.id === idParsed );
    if ( userIndex === -1 ) return res.status(404).send( { msg : "User not found"} );
    req.userIndex = userIndex ;
    next();
}


// app.use( loggingMiddleware );

const Port = process.env.Port || 3000 ;

app.use( express.json() );

const users =   [ { id: 1 , username : "Benzineb Mohamed" , age : 24 , insta : "mhs_dz"  }
                , { id: 2 , username : "laila"            , age : 22 , insta : "Unknown" }
                , { id: 3 , username : "meriem"           , age : 22 , insta : "Unknown" }
                , { id: 4 , username : "futureMe"         , age : 25 , insta : "Startup" }
                , { id: 5 , username : "ahmed"            , age : 24 , insta : "Unknown" }
                , { id: 6 , username : "alaa"             , age : 20 , insta : "Unknown" }
                , { id: 7 , username : "younaaaaas"       , age : 20 , insta : "Unknown" }
                , { id: 8 , username : "hassaan"          , age : 20 , insta : "Unknown" }
            ];

app.get( "/" , ( req , res , next ) => {
    console.log("This is the home page");
    next();
} , ( req , res , next ) => {
    console.log("This is the home page 2");
    next();
}  , ( req , res ) => {
    res.status(201).send( { msg : "Hello, World!"} );
})

app.get( "/api/users" , ( req , res ) => {
    res.status(201).send( { users } );
})

app.get( "/api/usersm" , ( req , res ) => {
    console.log(req.query);
    const { query : { filter , value } } = req;
    
    if( filter && value ) {
        return res.status(201).send(users.filter( (user) => user[filter].includes(value )) );
    }
    return res.status(201).send( { users } );
})


app.get( "/api/users/:id" , handleFindUserByID , ( req , res ) => {
    const { userIndex } = req ;
    const user = users[userIndex] ;
    res.status(201).send( `The user id is : ${user.id}
                            /// his name is : ${user.username}
                            /// his age is : ${user.age} 
                            /// his  insta is : ${user.insta}`);
});

app.get( "/api/product" , ( req , res ) => {
    res.status(201).send( { product : [ { id: 1 , name : "Laptop" , price : 80000 , brand : "Dell" }
                                    , { id: 2 , name : "Phone" , price : 50000 , brand : "Samsung" }
    ] } );
})

app.post( "/api/users" , ( req , res ) => {
    console.log(req.body);
    const { body } = req ;
    const newUser = { id : users[users.length - 1].id + 1 , ...body } ;
    users.push( newUser );
    return res.status(201).send( { users });
})

app.put( "/api/users/:id" , handleFindUserByID , ( req , res ) => {
    const { body , userIndex } = req ;
    
    users[userIndex] = { id : users[userIndex].id , ...body } ;
    return res.status(201).send( { users } );
})

app.patch( "/api/users/:id" , handleFindUserByID , ( req , res ) => {
    const { body , userIndex } = req ;
    users[userIndex] = { ...users[userIndex] , ...body } ;
    return res.status(201).send( { users } );
})

app.delete( "/api/users/:id" , handleFindUserByID , ( req , res ) => {
    const { userIndex } = req ;
    users.splice( userIndex , 1 );
    return res.status(201).send( { users } );
})


app.listen(Port , () => {
    console.log(`Server is running on port ${Port}`);
});