import {prisma} from "../../../../generated/prisma-client";
import {generateSecret} from "../../../utils";

export default {
    Mutation: {
        requestSecret: async (_, args) => {
            const {email} = args;
            const secret = generateSecret();
            try{
                await prisma.updateUser({
                    data:{
                        loginSecret: secret
                    },
                    where:{
                        email
                    }
                });
                return true;
            }  catch(error){
                console.log(error);
                return false;
            }
            
        }
    }
}