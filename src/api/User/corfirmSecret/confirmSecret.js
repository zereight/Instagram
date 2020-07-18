import {prisma} from "../../../../generated/prisma-client";
import { generateToken } from "../../../utils";
export default {
    Mutation: {
        confirmSecret: async(_, args, {request}) => {
            const {email, secret} = args;
            const user = await prisma.user({email});

            // try {
                if(user.loginSecret === secret){
                    //JWT
                    const token = generateToken(user.id);
                    return token;
                }else{
                    throw Error("Wrong email authentication.");
                }
            // } catch (error) {
            //     console.log(error);
            // }
            
        }
    }
}