import * as mongoose from 'mongoose';

export const DeviceSchema = new mongoose.Schema({
    serial: {
        type: String,
        required: 'Serial Number is Missing'
    },
    state: {
        type: String,
        enum: ['on', 'restarting', 'off'],
        required: 'Device State'
    },
    attributes: {}
},{
  timestamps: true
});
