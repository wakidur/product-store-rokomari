const mongoose = require('mongoose');

const { Schema } = mongoose;

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name can't be empty"],
    },
    brandName: {
      type: String,
      required: [true, "Brand Name can't be empty"],
    },
    details: {
      type: String,
      required: [true, "details can't be empty"],
    },
    image: {
      type: String,
      required: [true, "image can't be empty"],
    },
    price: {
      type: Number,
      required: [true, "price can't be empty"],
    },
    productCategory: [
      // One-to-Many relationships with product and cateroty
      {
        type: Schema.Types.ObjectId,
        ref: 'ProductCategory',
        require: false,
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

module.exports = mongoose.model('Product', productSchema);
