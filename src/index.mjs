import express from "express";

const app = express();

const Port = process.env.Port || 3000 ;

app.use( express.json() );

const users =   [ { id: 1 , username : "Benzineb Mohamed" , age : 24 , insta : "mhs_dz" }
                , { id: 2 , username : "laila" , age : 22 , insta : "Unknown" }
                , { id: 3 , username : "meriem" , age : 22 , insta : "Unknown" }
                , { id: 4 , username : "futureMe" , age : 25 , insta : "Startup" }
                , { id : 5 , username : "ahmed" , age : 24 , insta : "Unknown" }
                , { id : 6 , username : "alaa" , age : 20 , insta : "Unknown" }
                , { id : 7 , username : "mohamed" , age : 23 , insta : "Unknown" }
            ];

app.get( "/" , ( req , res ) => {
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


app.get( "/api/users/:id" , ( req , res ) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).send( { msg : "Invalid Request"} );
    const user = users.find( user => user.id === id );
    if( !user ) return res.status(404).send( { msg : "User not found"} );
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

app.put( "/api/users/:id" , ( req , res ) => {
    const { body , params : { id } } = req ;
    const idParsed = parseInt(id);
    if( isNaN(idParsed)) return res.status(400).send( { msg : "Invalid Request"} );
    const userIndex = users.findIndex( (user) => user.id === idParsed );
    if ( userIndex === -1 ) return res.status(404).send( { msg : "User not found"} );
    users[userIndex] = { id : idParsed , ...body } ;
    return res.status(201).send( { users } );
})

app.patch( "/api/users/:id" , ( req , res ) => {
    const { body , params : { id } } = req ;
    const idParsed = parseInt(id);
    if( isNaN(idParsed)) return res.status(400).send( { msg : "Invalid Request"} );
    const userIndex = users.findIndex( (user) => user.id === idParsed );
    if ( userIndex === -1 ) return res.status(404).send( { msg : "User not found"} );
    users[userIndex] = { ...users[userIndex] , ...body } ;
    return res.status(201).send( { users } );
})

app.delete( "/api/users/:id" , ( req , res ) => {
    const { params : { id } } = req ;
    const idParsed = parseInt(id);
    if( isNaN(idParsed)) return res.status(400).send( { msg : "Invalid Request"} );
    const findUserIndex = users.findIndex( (user) => user.id === idParsed );
    if( findUserIndex === -1 ) return res.status(404).send( { msg : "User not found"} );
    users.splice( findUserIndex , 1 );
    return res.status(201).send( { users } );
})


app.listen(Port , () => {
    console.log(`Server is running on port ${Port}`);
});