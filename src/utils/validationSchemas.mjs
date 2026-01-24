export const UserValidationSchemas = {
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
    }
}