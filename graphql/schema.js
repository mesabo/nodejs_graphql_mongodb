const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Item {
    id: ID!
    first_name: String!
    last_name: String!
    email: String!
    phone_number: String!
    role_id: String!
    is_blacklisted: Boolean!
    created_at: String
    updated_at: String
    deleted_at: String
  }

  input CreateItemInput {
    first_name: String!
    last_name: String!
    email: String!
    phone_number: String!
    role_id: String!
    is_blacklisted: Boolean!
    created_at: String
    updated_at: String
    deleted_at: String
  }

  input UpdateItemInput {
    first_name: String!
    last_name: String!
    email: String!
    phone_number: String!
    role_id: String!
    is_blacklisted: Boolean!
    created_at: String
    updated_at: String
    deleted_at: String
  }

  type Query {
    getAllItems: [Item]
    getItem(id: ID!): Item
  }

  type Mutation {
    createItem(input: CreateItemInput!): Item
    updateItem(id: ID!, input: UpdateItemInput!): Item
    deleteItem(id: ID!): Item
  }

  type Subscription {
    newItem: Item
    updatedItem: Item
    deletedItem: Item
  }
`;

module.exports = typeDefs;


/* 

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

*/