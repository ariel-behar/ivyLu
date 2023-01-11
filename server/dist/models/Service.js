import mongoose from 'mongoose';
import commonEntitySchema from './common-schemas/commonEntitySchema.js';
import { serviceDuration } from '../utils/constants.js';
const serviceSchema = new mongoose.Schema(Object.assign(Object.assign({}, commonEntitySchema), { duration: {
        type: String,
        required: [true, 'Duration is required'],
        enum: serviceDuration
    } }), {
    timestamps: true
});
const Service = mongoose.model('Service', serviceSchema);
export default Service;
//# sourceMappingURL=Service.js.map