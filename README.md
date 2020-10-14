# Product Store Rokomari

Create a simple project of product store using Nodejs, Express.js and GraphQL with MVC pattern.

### Query and Mutation

## Product Category

```bash
# productCategories
query {
  productCategories {
    _id
    name
  }
}

# createProductCategory
mutation {
  createProductCategory(productCategoryInput: {name: "Caterory 10"}) {
    _id
    name
  }
}

# updateProductCategory
mutation {
  updateProductCategory(_id: "5f85b8dfcf8901215d74f019", name: "Category 2") {
    name
  }
}

# deleteProductCategory
mutation {
  deleteProductCategory(_id: "5f869bcc9559380913a25692") {
    _id
    name
  }
}
```
