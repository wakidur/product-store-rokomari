/* eslint-disable node/no-unsupported-features/es-syntax */
/* eslint-disable no-useless-catch */
const Joi = require('joi');

const Product = require('../models/product/productSchema');
const ProductCategory = require('../models/product-category/productCategorySchema');
const MongooseQuery = require('../utilities/mongoose-query');

// merge
const productMergeForProductCategory = async (productCategoryID) => {
  try {
    const productCategories = await MongooseQuery.find(ProductCategory, {
      _id: { $in: productCategoryID },
    });
    productCategories.map((productCategory) => {
      return {
        ...productCategory._doc,
        _id: productCategory.id,
        name: productCategory.name,
      };
    });
    return productCategories;
  } catch (err) {
    throw err;
  }
};
module.exports = {
  // Using mongoose Populate
  products: async () => {
    try {
      const products = await MongooseQuery.findWithSinglePopulate(
        Product,
        {},
        'productCategory'
      );
      return products.map((product) => {
        return {
          ...product._doc,
          _id: product.id,
          productCategory: product.productCategory.map((category) => {
            return {
              ...category._doc,
              _id: category.id,
            };
          }),
        };
      });
    } catch (error) {
      throw error;
    }
  },
  productsMerge: async () => {
    try {
      const products = await MongooseQuery.find(Product, {});
      return products.map((product) => {
        return {
          ...product._doc,
          _id: product.id,
          productCategory: productMergeForProductCategory.bind(
            this,
            product._doc.productCategory
          ),
        };
      });
    } catch (error) {
      throw error;
    }
  },
  // Using mongoose Populate
  productCategories: async () => {
    try {
      const products = await MongooseQuery.find(ProductCategory, {});
      return products.map((productcategory) => {
        return { ...productcategory._doc, _id: productcategory.id };
      });
    } catch (error) {
      throw error;
    }
  },
  createProduct: async (args) => {
    // eslint-disable-next-line no-useless-catch
    try {
      // Create JOI validate object
      const ProductSchema = Joi.object({
        name: Joi.string().min(1).max(50).required(),
        brandName: Joi.string().min(1).max(100).required(),
        details: Joi.string().min(1).max(500).required(),
        image: Joi.string().required(),
        price: Joi.number().required(),
        productCategory: Joi.array().items(Joi.string().valid()),
      });

      // Validate request body by the JOI Schema
      const value = await ProductSchema.validateAsync(args.productInput);
      console.log(value);
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
  createProductCategory: async (args) => {
    // eslint-disable-next-line no-useless-catch
    try {
      // Create JOI validate object
      const ProductCategorySchema = Joi.object({
        name: Joi.string().min(1).max(50).required(),
      });

      // Validate request body by the JOI Schema
      const value = await ProductCategorySchema.validateAsync(
        args.productCategoryInput
      );
      // Find the Product Category Name by name.
      const productCategoryName = await MongooseQuery.find(ProductCategory, {
        name: value.name,
      });
      // check  Product Category is  already exist or not
      if (productCategoryName.length !== 0) {
        throw new Error('Product Category exists already.');
      }

      // Create perticular Product create
      const productCategoryCreate = await MongooseQuery.create(
        ProductCategory,
        value
      );
      console.log(productCategoryCreate);

      return {
        // eslint-disable-next-line node/no-unsupported-features/es-syntax
        ...productCategoryCreate._doc,
        _id: productCategoryCreate._doc._id.toString(),
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  updateProductCategory: async (args) => {
    try {
      const productCategoryUpdate = await MongooseQuery.findByIdAndUpdate(
        ProductCategory,
        args._id,
        { $set: { ...args } },
        { new: true }
      );
      return {
        // eslint-disable-next-line node/no-unsupported-features/es-syntax
        ...productCategoryUpdate._doc,
        _id: productCategoryUpdate._doc._id.toString(),
        name: productCategoryUpdate._doc.name,
      };
    } catch (error) {
      throw error;
    }
  },
  deleteProductCategory: async (args) => {
    const productCategoryDelete = await MongooseQuery.findByIdAndDelete(
      ProductCategory,
      args._id
    );
    return {
      ...productCategoryDelete._doc,
    };
  },
};
