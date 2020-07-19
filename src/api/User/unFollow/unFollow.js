import { isAuthenticated } from "../../../middleware"
import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation: {
        unFollow: async(_, args, {request}) => {
            isAuthenticated(request);
            const {id} = args;
            const {user} = request;
            try {
                await prisma.updateUser({
                    where:{
                        id: user.id
                    },
                    data: {
                        followings: {
                            disconnect: {
                                id
                            }
                        }
                    }
                });
                return true;
            } catch (error) {
                console.log(error);
                return false;
            }
        }
    }
}