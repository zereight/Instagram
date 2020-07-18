require("dotenv").config({path:__dirname+'/.env'})

import {prisma} from "../generated/prisma-client";
import passport from "passport";
import {Strategy, ExtractJwt} from "passport-jwt";

const jwtOptions = {
    // Authorization header에서 jwt를 찾는 역할
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken() ,
    secretOrKey: process.env.JWT_SECRET
}

passport.use(new Strategy(jwtOptions, async (payload, done)=>{
    try{
        const user = await prisma.user({id: payload.id});
        if(user){
            return done(null, true);
        }else{
            return done(null, false);
        }
    }catch(error){
        return done(error, false);
    }
}));

passport.initialize();

export const authenticationJwt = (req, res, next) => {
    return passport.authenticate("jwt", {session: false}, 
        (error, user) => {
            if(user){
                req.user = user;
            }
            next();
    } )(req,res,next);
}