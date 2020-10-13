/* eslint-disable no-useless-catch */
/* eslint-disable node/no-unsupported-features/es-syntax */
const express = require('express');
const bodyParser = require('body-parser');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const dotenv = require('dotenv').config({ path: '.env' });
const Joi = require('joi');

const connectDB = require('./config/db-config');
const MongooseQuery = require('./utilities/mongoose-query');
// Schema
const Product = require('./models/product/productSchema');

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
    }

    input EventInput {
        name: String!,
        brandName: String!,
        details: String!,
        image: String!,
        price: Float!,
        category: String!,
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
      events: async () => {
        try {
          const products = await MongooseQuery.find(Product, {});
          return products.map((event) => {
            return { ...event._doc, _id: event.id };
          });
        } catch (error) {
          throw error;
        }

        // return events;
      },
      createEvent: async (args) => {
        // eslint-disable-next-line no-useless-catch
        try {
          // Create JOI validate object
          const ProductSchema = Joi.object({
            name: Joi.string().min(1).max(50).required(),
            brandName: Joi.string().min(1).max(100).required(),
            details: Joi.string().min(1).max(500).required(),
            image: Joi.string().required(),
            price: Joi.number().required(),
            category: Joi.string().required(),
          });

          // Validate request body by the JOI Schema
          const value = await ProductSchema.validateAsync(args.eventInput);

          // Create perticular Product create
          const productCreate = await MongooseQuery.create(Product, value);
          console.log(productCreate);

          return {
            // eslint-disable-next-line node/no-unsupported-features/es-syntax
            ...productCreate._doc,
            _id: productCreate._doc._id.toString(),
          };
        } catch (error) {
          console.log(error);
          throw error;
        }
      },
    },
    graphiql: true,
  })
);

const port = process.env.SERVER_PORT || 4000;
app.listen(port, () => console.log(`listening on http://localhost:${port}`));
