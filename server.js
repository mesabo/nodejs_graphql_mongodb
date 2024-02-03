const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const http = require('http');
const WebSocket = require('ws');
const mongoose = require('mongoose');
const fs = require('fs'); // Import the 'fs' module for reading files
const typeDefs = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');

// Connect to MongoDB (replace 'your-database-uri' with your MongoDB URI)
mongoose.connect('mongodb://localhost:27017', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();
const httpServer = http.createServer(app); // Create an HTTP server

// Initialize ApolloServer with GraphQL schema and resolvers
const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true,
});

// Start Apollo Server asynchronously
server.start().then(() => {
  // Apply GraphQL middleware to the Express app
  server.applyMiddleware({ app });

  // WebSocket server for real-time updates
  const wss = new WebSocket.Server({ server: httpServer });

  wss.on('connection', (ws) => {
    console.log('WebSocket client connected');
    ws.on('message', (message) => {
      console.log(`Received: ${message}`);
    });
  });

  // Serve the 'index.html' file when a request is made to '/'
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

  httpServer.listen(4000, () => {
    console.log(`Server running at http://localhost:4000${server.graphqlPath}`);
  });
});
