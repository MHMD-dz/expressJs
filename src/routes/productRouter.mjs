import { Router } from "express";
import { validationResult , matchedData , checkSchema } from "express-validator";
import { ProductValidationSchemas } from "../utils/validationSchemas.mjs";
import { products } from "../utils/constantDb.mjs";
import { handleFindProductByID } from "../utils/MiddleWares.mjs";

const productRouter = Router();


productRouter.get( "/api/products" ,
    ( req , res ) => {
        const { query : { filter , value } } = req;

        if( filter && value ) {
            return res.status(201).send(products.filter( (product) => product[filter].toString().includes(value )) );
        }
        return res.status(201).send( { products } );
})

productRouter.get( "/api/products/:id" , handleFindProductByID , ( req , res ) => {
    const { productIndex } = req ;
    return res.status(201).send( { product : products[productIndex] } );
})

productRouter.post( "/api/products" , checkSchema(ProductValidationSchemas) , ( req , res )  => {
    const result = validationResult(req);
    if( !result.isEmpty() ) {
        return res.status(400).send( { errors : result.array().map( (error) => error.msg ) } );
    }
    const data = matchedData(req);
    const newProduct = { id : products[products.length - 1].id + 1 , ...data } ;
    products.push( newProduct );
    return res.status(201).send( { products } );
});

productRouter.put( "/api/products/:id" ,  handleFindProductByID , ( req , res ) => {
    const { body , productIndex } = req ;
    products[productIndex] = { ...products[productIndex] , ...body } ;
    return res.status(201).send( { products } );
})

productRouter.delete( "/api/products/:id" ,  handleFindProductByID , ( req , res ) => {
    const { productIndex } = req ;
    products.splice( productIndex , 1 );
    return res.status(201).send( { products } );
});

export default productRouter ;