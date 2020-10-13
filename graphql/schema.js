const { buildSchema } = require('graphql');

module.exports = buildSchema(`
type Product {
    _id: ID!,
    name: String!,
    brandName: String!,
    details: String!,
    image: String!,
    price: Float!,
    productCategory: [Object!],
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

type RootQuery {
    products: [Product!]!,
    productCategories: [ProductCategory!]!
}
type RootMutation {
    createProduct(productInput: ProductInput): Product,
    createProductCategory(productCategoryInput: ProductCategoryInput): ProductCategory
}

schema {
    query: RootQuery
    mutation: RootMutation
}
`);
