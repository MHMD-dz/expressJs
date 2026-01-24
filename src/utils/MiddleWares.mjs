import { users , products } from "./constantDb.mjs" ;


export const handleFindUserByID = ( req , res , next ) => {
    const {  params : { id } } = req ;
    const idParsed = parseInt(id);
    if( isNaN(idParsed)) return res.status(400).send( { msg : "Invalid Request"} );
    const userIndex = users.findIndex( (user) => user.id === idParsed );
    if ( userIndex === -1 ) return res.status(404).send( { msg : "User not found"} );
    req.userIndex = userIndex ;
    next();
}

export const handleFindProductByID = ( req , res , next ) => {
    const {  params : { id } } = req ;
    const idParsed = parseInt(id);
    if( isNaN(idParsed)) return res.status(400).send( { msg : "Invalid Request"} );
    const productIndex = products.findIndex( (product) => product.id === idParsed );
    if ( productIndex === -1 ) return res.status(404).send( { msg : "Product not found"} );
    req.productIndex = productIndex ;
    next();
}