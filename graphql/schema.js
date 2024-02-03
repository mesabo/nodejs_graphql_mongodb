// graphql/schema.js
const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Item {
    id: ID!
    name: String!
    description: String!
  }

  type Query {
    getAllItems: [Item]
    getItem(id: ID!): Item
  }

  type Mutation {
    createItem(name: String!, description: String!): Item
    updateItem(id: ID!, name: String, description: String): Item
    deleteItem(id: ID!): Item
  }

  type Subscription {
    newItem: Item
    updatedItem: Item
    deletedItem: Item
  }
`;

module.exports = typeDefs;
