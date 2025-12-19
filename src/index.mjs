import express from "express";

const app = express();

const Port = process.env.Port || 3000 ;

const users =   [ { id: 1 , username : "Benzineb Mohamed" , age : 23 , insta : "mhs_dz" }
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


app.listen(Port , () => {
    console.log(`Server is running on port ${Port}`);
});