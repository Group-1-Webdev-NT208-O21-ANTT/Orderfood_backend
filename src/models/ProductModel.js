const mongooes = require("mongoose")
const productSchema = new mongooes.Schema(
    {
        name: { type: String, require: true, unique: true },
        image: { type: String, require: true },
        type: { type: String, require: true },
        price: { type: Number, require: true },
        countInStock: { type: Number, require: true },
        rating: { type: Number, require: true },
        description: { type: String, require: true },
    },
    {
        timestamps: true
    }
);
const Product = mongooes.model('Product', productSchema);
module.exports = Product;
