const { Schema } = require('mongoose');

const manufacturerSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    match: /[A-Za-z]\w+/,
  },
  estimatedValue: {
    type: Number,
    min: 0,
    max: 900000000,
  },
  isPrivate: {
    type: Boolean,
  },
  foundingDate: {
    type: Date,
    min: new Date(1900, 0, 1),
  },
  address: {
    country: {
      type: String,
      enum: ['Ukraine', 'United Kingdom', 'Norway', 'Sweden', 'Denmark'],
    },
    city: {
      type: String,
      minLength: 3,
      maxLength: 100,
    },
    postalCode: {
      type: Number,
    },
    offices: [
      {
        phone: {
          type: String,
        },
        email: {
          type: String,
          unique: true,
        },
      },
    ],
  },
});
