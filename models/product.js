const { Schema, model } = require('mongoose');

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
    minLength: 1
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  quantity: {
    type: Schema.Types.Int32,
    required: true,
    min: 0
  },
  description: {
    type: String
  },
  manufacturer: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Manufacturer' // назва моделя якій належить айдішнік
  }
}, {
  timestamps: true
});

const Product = model('Product', productSchema);

module.exports = Product;