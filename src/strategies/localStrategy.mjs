import passport from "passport";
import { Strategy } from "passport-local";
import { User } from "../mongoose/Schemas/user.mjs";


passport.serializeUser((user , done )=>{
    console.log(`inside serializeUser`);
    console.log(user);
    done(null , user.id);
})

passport.deserializeUser( async (id , done )=>{
    console.log(`inside deserializeUser`);
    console.log(id);
    try {
        const findUser = await User.findOne( { id } );
        if (!findUser) throw new Error("User not found");
        done(null , findUser);
    } catch (error) {
        done(error , null);
    }
    
})

export default passport.use(
    new Strategy( async (username , password , done)=>{
        console.log(`username: ${username}`);
        console.log(`password: ${password}`);
        try {
            const findUser = await User.findOne( { username } );
            if (!findUser) throw new Error("User not found");
            if( findUser.password !== password ) throw new Error("Incorrect password");
            done(null , findUser);
        } catch (error) {
            done(error , null);
        }
    })
)