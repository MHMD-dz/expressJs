import express from "express";

const app = express();

const Port = process.env.Port || 3000 ;

const users =   [ { id: 1 , name : "Benzineb Mohamed" , age : 23 , insta : "mhs_dz" }
                , { id: 2 , name : "laila" , age : 22 , insta : "Unknown" }
                , { id: 3 , name : "meriem" , age : 22 , insta : "Unknown" }
                , { id: 4 , name : "futureMe" , age : 25 , insta : "Startup" }
            ];

app.get( "/" , ( req , res ) => {
    res.status(201).send( { msg : "Hello, World!"} );
})

app.get( "/api/users" , ( req , res ) => {
    res.status(201).send( { users } );
})

app.get( "/api/users/:id" , ( req , res ) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).send( { msg : "Invalid Request"} );
    const user = users.find( user => user.id === id );
    if( !user ) return res.status(404).send( { msg : "User not found"} );
    res.status(201).send( `The user id is : ${user.name}
                            /// his name is : ${user.name}
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