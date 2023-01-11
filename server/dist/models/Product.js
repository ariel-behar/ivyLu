import mongoose from 'mongoose';
import commonEntitySchema from './common-schemas/commonEntitySchema.js';
import { productCategories, volumeMeasurementUnits } from '../utils/constants.js';
const productSchema = new mongoose.Schema(Object.assign(Object.assign({}, commonEntitySchema), { volume: {
        type: String,
        required: [true, 'Volume is required'],
        minLength: [1, "Product volume must be at least 1 digit"],
        maxLength: [4, "Product volume must be at most 4 digits"],
    }, volumeMeasurementUnit: {
        type: String,
        required: [true, 'Volume Measurement Unit is required'],
        enum: volumeMeasurementUnits
    }, productCode: {
        type: String,
        required: true,
        unique: true,
        minLength: [5, "Product code must be exactly 5 digits"],
        maxLength: [5, "Product code must be exactly 5 digits"],
    }, productCategory: {
        type: String,
        required: true,
        enum: productCategories
    } }), {
    timestamps: true
});
const Product = mongoose.model('Product', productSchema);
export default Product;
//# sourceMappingURL=Product.js.map