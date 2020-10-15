# Product Store Rokomari

Create a simple project of product store using Nodejs, Express.js and GraphQL with MVC pattern.

## Usage

Rename ".env.example" to ".env" and update the values/settings to your own

## Install Dependencies

```
npm install

or

npm i
```

## Run App

```
# Run in dev mode
npm run dev

# Run in prod mode
npm start

# Run in nodemon
nodemon
```

## Query and Mutation

All Product and product category query and Mutation add

#### Product Category

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

#### Product

```bash
# products (Using mongoose Populate to get One-to-Many relationships data)
query {
  products {
    name,
    brandName
    details,
    image,
    productCategory {
      _id
      name
    }
    _id
  }
}
# products (Using GraphQL Merge )
query {
  productsMerge {
    name,
    brandName
    details,
    image,
    productCategory {
      _id
      name
    }
    _id
  }
}

# createProduct
mutation {
  createProduct(productInput: {
    name: "Test-9",
    brandName: "addde",
    details: "dfdf sdfess",
    image: "dfdfeee",
    price: 12.33,
    productCategory: ["5f85b8d8cf8901215d74f018", "5f85b8dfcf8901215d74f019", "5f85b8e4cf8901215d74f01a"]}) {
    name
    details
  }
}

# updateProduct
mutation {
  updateProduct(_id: "5f85dc1e0ae3f52834310016", updateProductInput: {
    name: "Text 10000",
    brandName : "aaa",
    details: "dfee",
    image: "https://openthread.google.cn/images/ot-contrib-google.png",
    price: 1233
  }) {
    name,
    brandName,
    details,
    image,
    price
  }
}


# deleteProduct
mutation {
  deleteProduct(_id: "5f85dbea0ae3f52834310015") {
    name
  }
}
```
