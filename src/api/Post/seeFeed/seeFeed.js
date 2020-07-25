import { isAuthenticated } from "../../../middleware"
import { prisma } from "../../../../generated/prisma-client";

export default {
    Query: {
        seedFeed: async (_, __, {request}) => {
            isAuthenticated(request);

            const {user} = request;
            const following = await prisma.user({id:user.id}).followings();
            return prisma.posts({
                where: {
                    user: {
                        id_in: [...following.map(user => user.id), user.id]
                    }
                },
                orderBy: "createAt_DESC"
            });
        }
    }
}