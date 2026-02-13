export const UserValidationSchemas = {
    id : {
        isInt : {
            options : { min : 1 },
            errorMessage : "ID must be a positive integer",
        }
    },
    username : {
        isString : {
            errorMessage : "Username must be a string",
        },
        notEmpty : {
            errorMessage : "Username must be a non empty string",
        },
        isLength : {
            options : { min : 4 , max : 20 },
            errorMessage : "Username must be at least 4 chars and max 20 chars",
        }
    },
    age : {
        isInt : {
            options : { min : 18 , max : 30 },
            errorMessage : "Age must between 18 & 30",
        }
    },
    insta : {
        isString : {
            errorMessage : "Insta must be a string",
        },
        notEmpty : {
            errorMessage : "Insta must be a non empty string",
        }
    },
    password : {
        isString : {
            errorMessage : "Password must be a string",
        },
        notEmpty : {
            errorMessage : "Password must be a non empty string",
        }
    }
}

export const ProductValidationSchemas = {
    name : {
        isString : {
            errorMessage : "Product name must be a string",
        },
        notEmpty : {
            errorMessage : "Product name must be a non empty string",
        }
    },
    price : {
        isFloat : {
            options : { min : 0 },
            errorMessage : "Price must be a positive number",
        }
    },
    brand : {
        isString : {
            errorMessage : "Brand must be a string",
        },
        notEmpty : {
            errorMessage : "Brand must be a non empty string",
        }
    }
}