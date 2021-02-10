import { GraphQLSchema } from "graphql";
import { buildSchema } from "type-graphql";
import { ObjectId } from "mongodb";
import path from "path";

import { UserResolver } from "../resolvers/UserResolver";
import { AuthResolver } from "../resolvers/AuthResolver";
import { StreamResolver } from "../resolvers/StreamResolver";
import { ObjectIdScalar } from "./object-id.scalar";
import { typegooseMiddleware } from "../middleware/typegoose";

// BILD GRAPHQL EXECUTABLE SCHEMA

export default async function createSchema(): Promise<GraphQLSchema> {
  const schema = await buildSchema({
    // ADD ALL TS RESOLVERS
    resolvers: [UserResolver, AuthResolver, StreamResolver],
    emitSchemaFile: path.resolve(__dirname, "schema.gql"),
    // USE DOCUMENT CONVERTING MIDDLEWARE
    globalMiddlewares: [typegooseMiddleware],
    // USE OBJECT ID SCALAR MAPPING
    scalarsMap: [{ type: ObjectId, scalar: ObjectIdScalar }],
  });

  return schema;
}
