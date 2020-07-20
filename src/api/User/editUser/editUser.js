import { isAuthenticated } from "../../../middleware"
import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation : {
        editUser: (_, args, {request}) => {
            isAuthenticated(request);

            const {username,
                email,
                firstName,
                lastName,
                bio} = args;

            const {user} = request;
            return prisma.updateUser({
                where:{
                    id: user.id
                },
                data: {
                    username,
                    email,
                    firstName,
                    lastName,
                    bio
                }
            });

        }
    }
}