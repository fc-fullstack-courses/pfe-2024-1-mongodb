const { Schema } = require('mongoose');

const manufacturerSchema = new Schema({
  name: {
    type: String
  },
  estimatedValue: {
    type: Number
  },
  isPrivate: {
    type: Boolean
  },
  foundingDate: {
    type: Date,
  },
  address: {
    country: {
      type: String
    },
    city: {
      type: String
    },
    postalCode: {
      type: Number
    },
    offices: [{
      phone: {
        type: String
      },
      email: {
        type: String
      }
    }]
  },
});