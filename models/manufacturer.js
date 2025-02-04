const { Schema, model } = require('mongoose');
const yup = require('yup');

const EMAIL_VALIDATION_SCHEMA = yup.string().email().required();

const manufacturerSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Manufacturer name is required.'],
    unique: true,
    match: [
      /[A-Za-z]\w+/,
      'Manufacturer name must start from letter and can only contain letters and numbers. No space allowed',
    ],
  },
  estimatedValue: {
    type: Number,
    min: 0,
    max: 900000000,
    default: 1000000
  },
  isPrivate: {
    type: Boolean,
    default: false
  },
  foundingDate: {
    type: Date,
    min: [new Date(1900, 0, 1), 'We only accept manufacturer founding date starting from 1900 year.'],
  },
  address: {
    country: {
      type: String,
      // enum: ['Ukraine', 'United Kingdom', 'Norway', 'Sweden', 'Denmark'],
      enum: {
        values: ['Ukraine', 'United Kingdom', 'Norway', 'Sweden', 'Denmark'],
        message: '{VALUE} is not valid country' // {VALUE} заміняється на якусь конкретну країну яку валідували
      }
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
          validate: {
            validator: async (emailStr) =>
              EMAIL_VALIDATION_SCHEMA.isValid(emailStr),
            message: (props) => `${props.value} is not valid email`,
          },
        },
      },
    ],
  },
  products: [{type: Schema.Types.ObjectId, ref: 'Product'}]
}, {
  timestamps: true
});

const Manufacturer = model('Manufacturer', manufacturerSchema);

module.exports = Manufacturer;
