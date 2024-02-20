const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { createServer } = require('http');
const { useServer } = require('graphql-ws/lib/use/ws');
const WebSocket = require('ws');
const mongoose = require('mongoose');
const fs = require('fs');
const { makeExecutableSchema } = require('@graphql-tools/schema'); // Corrected import
const typeDefs = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/sampledb', {
  // Removed deprecated connection options
});

const app = express();
const httpServer = createServer(app);

// Create an executable schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

// Initialize ApolloServer with the executable schema
const server = new ApolloServer({
  schema,
  introspection: true,
  playground: true,
});

// Apply GraphQL middleware
server.start().then(() => {
  server.applyMiddleware({ app });

  // Set up WebSocket server for GraphQL subscriptions with graphql-ws
  const wsServer = new WebSocket.Server({
    server: httpServer,
    path: '/graphql',
  });

  useServer({ schema }, wsServer);

  // Serve static files or index.html
  app.get('/', (req, res) => {
    fs.readFile('index.html', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
        return;
      }
      res.send(data);
    });
  });

  // Listen on httpServer
  httpServer.listen(4000, () => {
    console.log(`Server running at http://localhost:4000${server.graphqlPath}`);
  });
});
