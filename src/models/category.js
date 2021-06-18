import mongoose from 'mongoose';
let Schema = mongoose.Schema;

let CategorySchema = new Schema(
    {
        name: {
            type: String,
        },
    },
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    }
);

module.exports = mongoose.model('Category', CategorySchema);