const mongoose = require('mongoose');

const { Schema } = mongoose;

const ProductCategorySchema = new Schema({
  name: {
    type: String,
    required: true,
    index: true,
    unique: true,
    dropDups: true,
  },
});

// Export function to create "SomeModel" model class
module.exports = mongoose.model('ProductCategory', ProductCategorySchema);
