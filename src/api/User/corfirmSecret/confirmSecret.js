import {prisma} from "../../../../generated/prisma-client";
import { generateToken } from "../../../utils";
export default {
    Mutation: {
        confirmSecret: async(_, args) => {
            const {email, secret} = args;
            const user = await prisma.user({email});

            // try {
                if(user.loginSecret === secret){
                    // secret 썼으면 삭제
                    await prisma.updateUser({
                        where:{
                            id: user.id
                        },
                        data: {
                            loginSecret: ""
                        }
                    });
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