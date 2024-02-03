// graphql/resolvers.js
const { PubSub } = require('graphql-subscriptions');
const pubsub = new PubSub();
const Item = require('../models/item');

const resolvers = {
  Query: {
    getAllItems: async () => {
      return await Item.find();
    },
    getItem: async (_, { id }) => {
      return await Item.findById(id);
    },
  },
  Mutation: {
    createItem: async (_, { name, description }) => {
      const newItem = await Item.create({ name, description });
      pubsub.publish('newItem', { newItem });
      return newItem;
    },
    updateItem: async (_, { id, name, description }) => {
      const updatedItem = await Item.findByIdAndUpdate(
        id,
        { name, description },
        { new: true }
      );
      pubsub.publish('updatedItem', { updatedItem });
      return updatedItem;
    },
    deleteItem: async (_, { id }) => {
      const deletedItem = await Item.findByIdAndDelete(id);
      pubsub.publish('deletedItem', { deletedItem });
      return deletedItem;
    },
  },
  Subscription: {
    newItem: {
      subscribe: () => pubsub.asyncIterator('newItem'),
    },
    updatedItem: {
      subscribe: () => pubsub.asyncIterator('updatedItem'),
    },
    deletedItem: {
      subscribe: () => pubsub.asyncIterator('deletedItem'),
    },
  },
};

module.exports = resolvers;
