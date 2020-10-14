const { buildSchema } = require('graphql');

module.exports = buildSchema(`
type Product {
    _id: ID!,
    name: String!,
    brandName: String!,
    details: String!,
    image: String!,
    price: Float!,
    productCategory: [ProductCategory!]
}

type ProductCategory {
    _id: ID!
    name: String!
}

input ProductInput {
    name: String!,
    brandName: String!,
    details: String!,
    image: String!,
    price: Float!,
    productCategory: [String!]!,
}

input ProductCategoryInput {
    name: String!
}

type Query {
    products: [Product!]!,
    productsMerge: [Product!]!,
    productCategories: [ProductCategory!]!
}

type Mutation {
    createProduct(productInput: ProductInput): Product!,
    createProductCategory(productCategoryInput: ProductCategoryInput): ProductCategory!,
    updateProductCategory(_id: String!, name: String!): ProductCategory!
    deleteProductCategory(_id: String!): ProductCategory!
}

schema {
    query: Query
    mutation: Mutation
}
`);
