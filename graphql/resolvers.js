/* 
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
 */

// graphql/resolvers.js
const { PubSub } = require('graphql-subscriptions');
const pubsub = new PubSub();
const Item = require('../models/item');
const axios = require('axios');

const resolvers = {
  Query: {
    getAllItems: async () => {
      try {
        const response = await axios.get('http://127.0.0.1:9999/users/');
        const users = response.data;
        const items = users.map(user => ({
          id: user._id, 
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          phone_number: user.phone_number,
          role_id: user.role_id,
          is_blacklisted: user.is_blacklisted,
          created_at: user.created_at,
          updated_at: user.updated_at,
          deleted_at: user.deleted_at,
        }));
        return items;
      } catch (error) {
        console.error('Error fetching users:', error);
        throw new Error('Failed to fetch users');
      }
    },
  /*   getAllItems: async () => {
      return await Item.find();
    }, */
    getItem: async (_, { id }) => {
      return await Item.findById(id);
    },
  },
  Mutation: {
  /*   createItem: async (_, { input }) => {
      const newItem = await Item.create(input);
      pubsub.publish('newItem', { newItem });
      return newItem;
    }, */
    createItem: async (_, { input }) => {
      try {
        const response = await axios.post('http://127.0.0.1:9999/users/', input);
        const user = response.data;
        const newItem = {
          id: user._id, 
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          phone_number: user.phone_number,
          role_id: user.role_id,
          is_blacklisted: user.is_blacklisted,
          created_at: user.created_at,
          updated_at: user.updated_at,
          deleted_at: user.deleted_at,
        };
        pubsub.publish('newItem', { newItem });
        return newItem;
      } catch (error) {
        console.error('Error creating item:', error);
        throw new Error('Failed to create item');
      }
    },
    updateItem: async (_, { id,first_name, last_name, email, phone_number, role_id, is_blacklisted, created_at, updated_at, deleted_at }) => {
      const updatedItem = await Item.findByIdAndUpdate(
        id,
        {first_name, last_name, email, phone_number, role_id, is_blacklisted, created_at, updated_at, deleted_at },
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
