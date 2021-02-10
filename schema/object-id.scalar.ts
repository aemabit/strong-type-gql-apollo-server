import { GraphQLScalarType, Kind } from "graphql";
import { ObjectId } from "mongodb";

export const ObjectIdScalar = new GraphQLScalarType({
  name: "ObjectId",
  description: "Mongo id scalart type",
  parseValue(value: string) {
    return new ObjectId(value); // CLIENT FROM INPUT VARIABLE
  },
  serialize(value: ObjectId) {
    return value.toHexString(); // VALUE SENT TO THE CLIENT
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      return new ObjectId(ast.value); // VALUE FROM THE CLIENT QUERY
    }
    return null;
  },
});
