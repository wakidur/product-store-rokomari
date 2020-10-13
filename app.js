const express = require('express');
const bodyParser = require('body-parser');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const dotenv = require('dotenv').config({ path: '.env' });
const connectDB = require('./config/db-config');

// Instantiate Express app
const app = express();
// Connect to database
connectDB();
app.use(bodyParser.json());

app.get('/', (req, res, next) => {
  res.send('Hello World');
});

const events = [];

// GraphQL Middleware
app.use(
  '/graphql',
  graphqlHTTP({
    schema: buildSchema(`
    type Event {
        _id: ID!,
        name: String!,
        brandName: String!,
        details: String!,
        image: String!,
        price: Float!,
        category: String!,
        createdAt: String!,
        updateAt: String!
    }

    input EventInput {
        name: String!,
        brandName: String!,
        details: String!,
        image: String!,
        price: Float!,
        category: String!,
        createdAt: String!,
        updateAt: String!
    }

    type RootQuery {
        events: [Event!]!
    }
    type RootMutation{
        createEvent(eventInput: EventInput): Event
    }
    schema {
        query: RootQuery
        mutation: RootMutation
    }
    `),
    rootValue: {
      events: () => {
        return events;
      },
      createEvent: (args) => {
        const event = {
          _id: Math.random().toString(),
          name: args.eventInput.name,
          brandName: args.eventInput.brandName,
          details: args.eventInput.details,
          image: args.eventInput.image,
          price: +args.eventInput.price,
          category: args.eventInput.category,
          createdAt: args.eventInput.createdAt,
          updateAt: args.eventInput.updateAt,
        };
        events.push(event);
        return event;
      },
    },
    graphiql: true,
  })
);

const port = process.env.SERVER_PORT || 4000;
app.listen(port, () => console.log(`listening on http://localhost:${port}`));
