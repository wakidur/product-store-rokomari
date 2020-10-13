const mongoose = require('mongoose');

/**
 * Validate MongoDB ObjectId
 * You can use .isValid() method on ObjectId, try in mongoose:
 * @param {*} mongodbID
 */

async function isMongoDBObjectID(mongodbID) {
  return mongoose.Types.ObjectId.isValid(mongodbID);
}

module.exports = {
  isMongoDBObjectID,
};
