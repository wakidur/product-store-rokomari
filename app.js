const express = require('express');
const bodyParser = require('body-parser');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const dotenv = require('dotenv').config({ path: '.env' });

/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */

const app = express();
app.use(bodyParser.json());

app.get('/', (req, res, next) => {
  res.send('Hello World');
});

// GraphQL Middleware
app.use(
  '/graphql',
  graphqlHTTP({
    schema: buildSchema(`
    type RootQuery {
        events: [String!]!
    }
    type RootMutation{
        createEvent(name: String): String
    }
    schema {
        query: RootQuery
        mutation: RootMutation
    }
    `),
    rootValue: {
      events: () => {
        return ['Romantic Cooking', 'Sailing', 'All-Night Coding'];
      },
      createEvent: (args) => {
        const eventName = args.name;
        return eventName;
      },
    },
    graphiql: true,
  })
);

const port = process.env.SERVER_PORT || 4000;
app.listen(port, () => console.log(`listening on http://localhost:${port}`));
