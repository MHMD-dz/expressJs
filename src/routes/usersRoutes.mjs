import { Router } from "express";
import { query , validationResult , body , matchedData , checkSchema } from "express-validator";
import { UserValidationSchemas } from "../utils/validationSchemas.mjs";
import { users } from "../utils/constantDb.mjs";
import { handleFindUserByID } from "../utils/MiddleWares.mjs";

const usersRouter = Router();


usersRouter.get( "/api/users" , 
    ( req , res ) => {
        console.log(req.session);
        console.log(req.session.id);
        
        return res.status(201).send( { users } );
})

usersRouter.get( "/api/usersm" , checkSchema( {
    filter : {
        isString : {
            errorMessage : "Filter must be a string",
        },
        notEmpty : {
            errorMessage : "Filter must be a non empty string",
        }
    } ,
    value : {
        isString : {
            errorMessage : "Value must be a string",
        },
        notEmpty : {
            errorMessage : "Value must be a non empty string",
        }
    }
    } ) ,  
    ( req , res ) => {
        const { query : { filter , value } } = req;

        const result = validationResult(req);
        console.log(result);
        if( !result.isEmpty() ) {
            return res.status(400).send( { errors : result.array().map( (error) => error.msg ) } );
        }
        
        if( filter && value ) {
            return res.status(201).send(users.filter( (user) => user[filter].includes(value )) );
        }
        return res.status(201).send( { users } );
})

usersRouter.post( "/api/users" ,
    checkSchema(UserValidationSchemas) , 
    ( req , res ) => {
        const result = validationResult(req);
        console.log(result);
        if( !result.isEmpty() ) {
            return res.status(400).send( { errors : result.array().map( (error) => error.msg ) } );
        }
        const data = matchedData(req);
        console.log(data);
        const newUser = { id : users[users.length - 1].id + 1 , ...data } ;
        users.push( newUser );
        return res.status(201).send( { users });
})

usersRouter.get( "/api/users/:id" , query("userIndex").isString() ,  handleFindUserByID , ( req , res ) => {
    const result = validationResult(req);
    console.log(result);
    const { userIndex } = req ;
    const user = users[userIndex] ;
    res.status(201).send( `The user id is : ${user.id}
                            /// his name is : ${user.username}
                            /// his age is : ${user.age} 
                            /// his  insta is : ${user.insta}`);
});


usersRouter.put( "/api/users/:id" ,  handleFindUserByID , ( req , res ) => {
    const { body , userIndex } = req ;
    
    users[userIndex] = { id : users[userIndex].id , ...body } ;
    return res.status(201).send( { users } );
})

usersRouter.patch( "/api/users/:id" , handleFindUserByID , ( req , res ) => {
    const { body , userIndex } = req ;
    users[userIndex] = { ...users[userIndex] , ...body } ;
    return res.status(201).send( { users } );
})

usersRouter.delete( "/api/users/:id" , handleFindUserByID , ( req , res ) => {
    const { userIndex } = req ;
    users.splice( userIndex , 1 );
    return res.status(201).send( { users } );
})

export default usersRouter;