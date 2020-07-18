import {prisma} from "../../../../generated/prisma-client";
import {generateSecret, sendSecretMail} from "../../../utils";

export default {
    Mutation: {
        requestSecret: async (_, args) => {
            const {email} = args;
            const secret = generateSecret();
            try{
                await sendSecretMail(email, secret);
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