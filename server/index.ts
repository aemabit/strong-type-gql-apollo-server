import "./env";
import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import cors from "cors";

import createSchema from "../schema";
import createSession from "../session";

const port = process.env.PORT || 8000;

async function createServer() {
  try {
    // CREATE MONGOOSE CONNECTION
    await createSession();
    // CREATE EXPRESS SERVER
    const app = express();
    const corsOptions = {
      origin: "http://localhost:3000",
      credentials: true,
    };
    app.use(cors(corsOptions));
    // USE JSON REQUEST
    app.use(express.json());

    const schema = await createSchema();

    // CREATE GRAPHQL SERVER
    const apolloServer = new ApolloServer({
      schema,
      context: ({ req, res }) => ({ req, res }),
      introspection: true,
      // ENABLE GRAPHQL PLAYGROUND
      playground: {
        settings: {
          "request.credentials": "include",
        },
      },
    });

    apolloServer.applyMiddleware({ app, cors: corsOptions });

    // START SERVER
    app.listen({ port }, () => {
      console.log(
        `Server is running at http://localhost:${port}${apolloServer.graphqlPath}`
      );
    });
  } catch (error) {
    console.log(error);
  }
}

createServer();
