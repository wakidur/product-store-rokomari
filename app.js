const express = require('express');
const bodyParser = require('body-parser');
const { graphqlHTTP } = require('express-graphql');
require('dotenv').config({ path: '.env' });

const connectDB = require('./config/db-config');
const graphQlSchema = require('./graphql/schema');
const controllers = require('./controllers/controllers');
// Instantiate Express app
const app = express();
// Connect to database
connectDB();
app.use(bodyParser.json());

app.get('/', (req, res, next) => {
  res.send('Hello World');
});

// GraphQL Middleware
app.use(
  '/graphql',
  graphqlHTTP({
    schema: graphQlSchema,
    rootValue: controllers,
    graphiql: true,
  })
);

const port = process.env.SERVER_PORT || 4000;
app.listen(port, () => console.log(`listening on http://localhost:${port}`));
