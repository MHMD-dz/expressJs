import express from "express";

const app = express();

const Port = process.env.Port || 3000 ;

app.get( "/" , ( req , res ) => {
    res.status(201).send( { msg : "Hello, World!"} );
})

app.get( "/api/users" , ( req , res ) => {
    res.status(201).send( { users : [ { id: 1 , name : "Benzineb Mohamed" , age : 23 , insta : "mhs_dz" }
                                    , { id: 2 , name : "laila" , age : 22 , insta : "Unknown" }
    ] } );
})

app.get( "/api/product" , ( req , res ) => {
    res.status(201).send( { product : [ { id: 1 , name : "Laptop" , price : 80000 , brand : "Dell" }
                                    , { id: 2 , name : "Phone" , price : 50000 , brand : "Samsung" }
    ] } );
})


app.listen(Port , () => {
    console.log(`Server is running on port ${Port}`);
});