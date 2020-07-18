require("dotenv").config({path:__dirname+'/.env'})

import {GraphQLServer} from "graphql-yoga";
import logger from "morgan";
import schema from "./schema";
import "./passport";
import {authenticateJwt} from "./passport";
import {prisma} from "../generated/prisma-client";

const PORT = process.env.PORT;

const server = new GraphQLServer({schema, context: ({request})=>({request}) });

server.express.use(logger("dev"));
server.express.use(authenticateJwt);
server.start({port:PORT},
    () => {
        console.log(`Server start port: ${PORT}`);
    });